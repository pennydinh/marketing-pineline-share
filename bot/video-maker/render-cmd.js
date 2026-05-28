const fs = require('fs');
const { execSync } = require('child_process');

// ===== TTS (giữ nguyên — OpenAI Nova) =====
async function generateTTS(textToRead) {
  console.log('🎙 Đang gọi ChatGPT TTS (Voice Nova)...');
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ Thiếu OPENAI_API_KEY để gọi Voice!");
    return false;
  }
  
  try {
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: textToRead,
        voice: 'nova',
        response_format: 'pcm',
        speed: 1.25
      })
    });

    if (!res.ok) {
        throw new Error(`OpenAI TTS Error: ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const pcmBuffer = Buffer.from(arrayBuffer);
    
    // OpenAI trả về RAW PCM 24000Hz 16-bit Mono (khi dùng response_format: 'pcm')
    // Chromium trong Remotion hay crash với 24000Hz Mono
    // => Upsample lên 48000Hz Stereo cho tương thích
    const srcRate = 24000;
    const dstRate = 48000;
    const ratio = dstRate / srcRate; // 2x
    const srcSamples = pcmBuffer.length / 2; // 16-bit = 2 bytes/sample
    const dstSamples = Math.floor(srcSamples * ratio);
    
    // Linear interpolation upsample + mono to stereo
    const dstBuffer = Buffer.alloc(dstSamples * 4); // stereo 16-bit = 4 bytes/sample
    for (let i = 0; i < dstSamples; i++) {
      const srcPos = i / ratio;
      const srcIdx = Math.floor(srcPos);
      const frac = srcPos - srcIdx;
      const s0 = srcIdx < srcSamples ? pcmBuffer.readInt16LE(srcIdx * 2) : 0;
      const s1 = (srcIdx + 1) < srcSamples ? pcmBuffer.readInt16LE((srcIdx + 1) * 2) : s0;
      const sample = Math.round(s0 + (s1 - s0) * frac);
      dstBuffer.writeInt16LE(sample, i * 4);     // Left
      dstBuffer.writeInt16LE(sample, i * 4 + 2); // Right
    }
    
    // WAV Header chuẩn 48000Hz Stereo 16-bit
    const wavHeader = Buffer.alloc(44);
    wavHeader.write('RIFF', 0);
    wavHeader.writeUInt32LE(36 + dstBuffer.length, 4);
    wavHeader.write('WAVE', 8);
    wavHeader.write('fmt ', 12);
    wavHeader.writeUInt32LE(16, 16);
    wavHeader.writeUInt16LE(1, 20);      // PCM
    wavHeader.writeUInt16LE(2, 22);      // Stereo (2 channels)
    wavHeader.writeUInt32LE(dstRate, 24); // 48000 Hz
    wavHeader.writeUInt32LE(dstRate * 4, 28); // ByteRate = 48000 * 2ch * 2bytes
    wavHeader.writeUInt16LE(4, 32);      // BlockAlign = 2ch * 2bytes
    wavHeader.writeUInt16LE(16, 34);     // BitsPerSample
    wavHeader.write('data', 36);
    wavHeader.writeUInt32LE(dstBuffer.length, 40);

    const audioBuffer = Buffer.concat([wavHeader, dstBuffer]);
    fs.writeFileSync('public/audio.wav', audioBuffer);
    
    console.log(`✅ Audio: ${(audioBuffer.length/1024).toFixed(0)}KB (48000Hz Stereo) — Chromium-ready!`);
    return true;
  } catch (err) {
    console.error('❌ Lỗi tạo TTS:', err.message);
    return false;
  }
}

// ===== AI EXTRACT STAT DATA =====
async function extractStatData(rawContent) {
  console.log('📊 Đang trích xuất số liệu Stat Hero từ nội dung bài...');
  
  const prompt = `Bạn là trợ lý thiết kế giao diện video tin tức (Block-Based Layout). Từ nội dung bài viết sau, hãy CHIA BÀI VIẾT THÀNH CÁC PHÂN ĐOẠN (SCENES) ngắn.
Mỗi scene gồm khoảng 2-4 câu, đi kèm với MỘT HOẶC NHIỀU Khối Thông Tin (visual blocks) phù hợp với nội dung đoạn đó. Để giao diện sinh động, hãy linh hoạt tạo lúc 1 khối to, lúc 2 khối, lúc 3 khối nhỏ.

QUY TẮC QUAN TRỌNG:
1. "title": Tiêu đề chính siêu ngắn gọn (Tối đa 4 từ).
2. "theme": Chọn "dark" hoặc "light" tuỳ thuộc vào sắc thái bài.
3. "scenes": Mảng chứa các phân đoạn kịch bản. Mỗi scene bao gồm:
   - "text": Câu văn sẽ được AI đọc (đảm bảo gộp toàn bộ text của các scenes lại sẽ thành một bài viết hoàn chỉnh).
   - "blocks": Mảng chứa từ 1 đến 3 khối hình ảnh. Phải có "type":
     + "info": Cần "icon" (1 emoji), "title" (tiêu đề khối), "subtitle" (mô tả).
     + "stat": Cần "icon" (1 emoji), "value" (con số lớn, vd: 48.2K, $4B), "label" (nhãn số liệu), "subtitle".
     + "comparison": Cần "title" (tiêu đề), "left": {"label", "value"}, "right": {"label", "value"}.

CHỈ TRẢ VỀ JSON HỢP LỆ, KHÔNG GIẢI THÍCH THÊM. ĐỊNH DẠNG JSON MONG ĐỢI:
{
  "title": "Tiêu đề",
  "theme": "dark",
  "scenes": [
    {
      "text": "OpenAI vừa công bố mô hình mới nhất với khả năng tự động viết code. Số lượt tải đã đạt mốc 48 nghìn.",
      "blocks": [
        { "type": "info", "icon": "🚀", "title": "Mô hình mới", "subtitle": "Tích hợp AI Agent" },
        { "type": "stat", "icon": "⭐", "value": "48K", "label": "Lượt tải", "subtitle": "Tăng kỷ lục" }
      ]
    }
  ]
}

Nội dung bài:
${rawContent}`;

  // Thử OpenAI trước
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.4,
          response_format: { type: 'json_object' }
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const text = data.choices[0].message.content;
        const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);
        console.log('✅ Trích xuất stat data thành công (GPT-4o)!');
        return normalizeStatData(parsed);
      }
    } catch(e) {
      console.log('⚠️ Lỗi OpenAI extract, thử Gemini...', e.message);
    }
  }
  
  // Fallback: Gemini
  const geminiKey = process.env.GEMINI_API_KEY || 'AIzaSyDiFfpfPIzAOOuBiIzAIHULGjK1wNQH0YQ';
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });
    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text.trim();
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    console.log('✅ Trích xuất stat data thành công (Gemini)!');
    return normalizeStatData(parsed);
  } catch(e) {
    console.log('⚠️ Lỗi Gemini extract, dùng fallback data...', e.message);
  }
  
  // Fallback cứng nếu cả 2 AI đều fail
  return {
    title: 'TIN KHẨN',
    theme: 'dark',
    scenes: [
      { text: rawContent || "Tin tức nóng hổi đang lan truyền trên mạng.", blocks: [{ type: 'info', icon: '🔥', title: 'Sự kiện nóng', subtitle: 'Đang lan truyền nhanh chóng' }] }
    ]
  };
}

// Chuẩn hoá key names (AI có thể trả về UPPER_CASE hoặc camelCase)
function normalizeStatData(raw) {
  return {
    title: raw.title || raw.TITLE || '#Trending',
    theme: raw.theme || raw.THEME || 'dark',
    scenes: Array.isArray(raw.scenes || raw.SCENES) ? (raw.scenes || raw.SCENES) : [
      { text: "Tin tức mới nhất đang gây bão mạng xã hội.", blocks: [{ type: 'info', icon: '🔥', title: 'Tin Tức Mới', subtitle: 'Đang hot trên mạng' }] }
    ]
  };
}

// ===== AUDIO DURATION =====
function getAudioDurationFromWav(filePath) {
  const buf = fs.readFileSync(filePath);
  const sampleRate = buf.readUInt32LE(24);
  const byteRate = buf.readUInt32LE(28);
  const dataSize = buf.readUInt32LE(40);
  const duration = dataSize / byteRate;
  console.log(`⏱️  Audio duration: ${duration.toFixed(1)}s (Sample Rate: ${sampleRate}Hz)`);
  return duration;
}

// ===== RENDER VIDEO =====
async function renderVideo(text) {
  // Xóa rác và file cũ ngay lập tức
  if (fs.existsSync('public/audio.wav')) {
    fs.unlinkSync('public/audio.wav');
  }
  if (fs.existsSync('out/video.mp4')) {
    fs.unlinkSync('out/video.mp4');
  }

  fs.mkdirSync('public', { recursive: true });
  
  // Copy logo từ assets nếu chưa có
  if (!fs.existsSync('public/logo-placeholder.jpg') && fs.existsSync('../assets/logo-placeholder.jpg')) {
    fs.copyFileSync('../assets/logo-placeholder.jpg', 'public/logo-placeholder.jpg');
  }

  // 3. AI chia scenes và trích xuất dữ liệu
  const statData = await extractStatData(text);
  console.log('📊 SCENE DATA:', JSON.stringify(statData.scenes.length, null, 2), 'scenes');

  // Gộp text lại để tạo Audio duy nhất
  const fullTextToRead = statData.scenes.map(s => s.text).join(' ');

  // 1. Tạo Audio TTS
  const ttsSuccess = await generateTTS(fullTextToRead);
  if (!ttsSuccess) {
    console.error("❌ TTS Generate thất bại, hủy bỏ render!");
    process.exit(1);
  }

  // 2. Đọc duration thật từ WAV
  const audioDuration = getAudioDurationFromWav('public/audio.wav');
  const FPS = 30;
  const totalFrames = Math.round(audioDuration * FPS) + FPS; // audio + 1s padding

  // 4. Tính timing cho từng Scene và chia caption lines
  const allWordsCount = fullTextToRead.split(/\s+/).length;
  let currentFrame = 0;
  const processedScenes = [];
  const lines = [];
  const captionTotalFrames = Math.round(audioDuration * FPS);

  for (const scene of statData.scenes) {
    const sceneWords = scene.text.split(/\s+/);
    // Tính toán frame tỉ lệ với số chữ
    const sceneFrames = Math.max(30, Math.floor((sceneWords.length / allWordsCount) * captionTotalFrames));
    
    processedScenes.push({
      ...scene,
      startFrame: currentFrame,
      durationFrames: sceneFrames
    });

    const WORDS_PER_LINE = 10;
    const lineCount = Math.ceil(sceneWords.length / WORDS_PER_LINE);
    const framesPerLine = Math.floor(sceneFrames / lineCount);
    
    for (let i = 0; i < lineCount; i++) {
      const lineWordsChunk = sceneWords.slice(i * WORDS_PER_LINE, (i + 1) * WORDS_PER_LINE);
      lines.push({
        text: lineWordsChunk.join(' '),
        startFrame: currentFrame + (i * framesPerLine),
        sceneIndex: processedScenes.length - 1
      });
    }

    currentFrame += sceneFrames;
  }
  console.log(`📝 Tạo ${processedScenes.length} scenes và ${lines.length} caption lines`);

  const props = {
    audioUrl: 'audio.wav',
    totalFrames,
    lines,
    title: statData.title,
    theme: statData.theme,
    scenes: processedScenes
  };

  // 5. Gọi lệnh render Remotion
  console.log(`🎬 Đang tiến hành Render Video Stat Hero + Caption bằng Remotion (Frame count: ${totalFrames})...`);
  
  fs.writeFileSync('props.json', JSON.stringify(props));

  // Xóa video cũ nếu có
  if (fs.existsSync('out/video.mp4')) {
    fs.unlinkSync('out/video.mp4');
  }

  // Xóa cache cũ TRIỆT ĐỂ để tránh stale bundle
  try { execSync('find /tmp -maxdepth 1 -name "remotion-*" -type d -exec rm -rf {} + 2>/dev/null || true', { stdio: 'ignore' }); } catch(e) {}
  try { execSync('rm -rf node_modules/.cache 2>/dev/null || true', { stdio: 'ignore' }); } catch(e) {}
  console.log('🧹 Đã xóa cache cũ');

  // Kill zombie processes
  try { execSync('pkill -f "remotion" 2>/dev/null || true', { stdio: 'ignore' }); } catch(e) {}
  try { execSync('pkill -f "chrome.*remotion" 2>/dev/null || true', { stdio: 'ignore' }); } catch(e) {}
  
  // Đợi 1 giây cho process cleanup
  await new Promise(r => setTimeout(r, 1000));
  
  try {
    execSync(`npx remotion render src/index.ts MainVideo out/video.mp4 --props=props.json --config=remotion.config.ts --timeout=300000 --port=9876 --bundle-cache=false --concurrency=1`, { stdio: 'inherit', maxBuffer: 50 * 1024 * 1024, timeout: 360000 });
    console.log('🎉 Render Video Stat Hero + Caption thành công: video-maker/out/video.mp4');
  } catch (e) {
    console.error('❌ Lỗi khi render bằng Remotion', e.message);
  }
}

// Nếu gọi trực tiếp từ command line để test:
if (require.main === module) {
  let sampleText = "Trong quý 1 năm 2026, tổng vốn đầu tư vào các startup A.I trên toàn cầu đã đạt 4 tỷ đô la Mỹ, tăng 180% so với cùng kỳ năm ngoái. Đặc biệt, 47 startup A.I đã nhận được vốn từ vòng Seed đến Series B. 82% trong số đó có trụ sở tại Hoa Kỳ, chủ yếu tập trung ở Silicon Valley.";
  
  if (process.argv[2] === 'cli' && fs.existsSync('temp-text.txt')) {
    sampleText = fs.readFileSync('temp-text.txt', 'utf8');
  }
  
  renderVideo(sampleText);
}

module.exports = { renderVideo };
