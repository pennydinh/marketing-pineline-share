/**
 * Facebook Group Poster — đăng AS Page "Đinh Phương"
 * Chạy: node post-groups.js
 * Yêu cầu: cookies.json (từ account phụ), file .env có DATABASE_URL
 */

const { chromium } = require('playwright');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '../.env.local' });
const fs = require('fs');
const { execSync } = require('child_process');

// ===== CẤU HÌNH =====
const PAGE_NAME = 'Đinh Phương'; // Tên Page sẽ hiện trong dropdown "Đang đăng với tư cách"

const GROUPS = [
  'https://www.facebook.com/groups/comailo',
  'https://www.facebook.com/groups/groupaivietnam/',
  'https://www.facebook.com/groups/openclawxvn/',
  'https://www.facebook.com/groups/861108920047086/',
];
// ====================

async function spinContent(originalContent) {
  if (!process.env.OPENAI_API_KEY) return originalContent;
  try {
    console.log('   🔄 Đang spin lại nội dung khoảng 30%...');
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: `Viết lại bài post Facebook sau đây. Giữ đúng ý nghĩa, định dạng, cách xuống dòng, độ dài và các hashtags. Chỉ viết lại khoảng 30% câu chữ (dùng từ đồng nghĩa, hoặc diễn đạt khác đi một chút) để bài viết mượt mà và không trùng lặp 100%. Trả về nguyên chuẩn văn bản bài post mới, KHÔNG THÊM CÂU CHÀO HAY MỞ ĐẦU.\n\nBài gốc:\n${originalContent}`
        }],
        temperature: 0.7
      })
    });
    const data = await res.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    }
  } catch(e) {
    console.log('   ⚠️ Lỗi spin content:', e.message);
  }
  return originalContent;
}

const delay = (minSec, maxSec) =>
  new Promise(r => setTimeout(r, (Math.random() * (maxSec - minSec) + minSec) * 1000));

async function switchToPage(page) {
  try {
    // Tìm nút "Đang đăng với tư cách..." hoặc avatar/tên cá nhân
    const switchBtn = page.locator([
      '[aria-label*="Đang đăng với tư cách"]',
      '[aria-label*="Posting as"]',
      'div[role="button"]:has-text("Đang đăng")',
    ].join(', ')).first();

    await switchBtn.waitFor({ timeout: 8000 });
    await switchBtn.click();
    await delay(1, 2);

    // Trong dropdown chọn Page theo tên
    const pageOption = page.locator(`div[role="menuitem"]:has-text("${PAGE_NAME}"), div[role="option"]:has-text("${PAGE_NAME}")`).first();
    await pageOption.waitFor({ timeout: 8000 });
    await pageOption.click();
    await delay(1, 2);
    console.log(`   ✅ Đã chuyển sang đăng với tư cách: ${PAGE_NAME}`);
    return true;
  } catch (err) {
    console.log(`   ⚠️  Không tìm thấy nút chuyển Page, sẽ đăng bằng account hiện tại. Lỗi: ${err.message}`);
    return false;
  }
}

async function postToGroup(page, groupUrl, content, imagePath) {
  console.log(`\n📌 Nhóm: ${groupUrl}`);
  await page.goto(groupUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await delay(3, 6);

  // Bấm vào ô "Viết gì đó..." để mở composer
  const writeBoxSelectors = [
    '[aria-label*="Viết gì đó"]',
    '[aria-label*="Write something"]',
    '[aria-label*="Bạn viết gì đi"]',
    '[aria-label*="Create a public post"]',
    '[aria-label*="Tạo bài viết"]',
    'div[role="button"]:has-text("Viết gì đó")',
    'div[role="button"]:has-text("Write something")',
    'div[role="button"]:has-text("Bạn viết gì đi")',
    'span:has-text("Viết gì đó")',
    'span:has-text("Write something")',
    'span:has-text("Bạn viết gì đi")'
  ];

  let opened = false;
  for (const selector of writeBoxSelectors) {
    try {
      const el = page.locator(selector).first();
      await el.waitFor({ timeout: 10000 });
      await el.click();
      opened = true;
      console.log(`   ✅ Mở composer bằng: ${selector}`);
      break;
    } catch {}
  }

  if (!opened) {
    throw new Error('Không mở được ô viết bài');
  }

  await delay(2, 4);

  // Chuyển sang đăng AS Page
  await switchToPage(page);

  // Tìm ô soạn thảo thực sự (sau khi click mở)
  // Ưu tiên các ô soạn thảo NẰM TRONG BẢNG POP-UP (Modal/Dialog) để không bị click nhầm xuống Background Comment
  const editorSelectors = [
    'div[role="dialog"] [contenteditable="true"][role="textbox"]',
    'div[role="dialog"] [data-lexical-editor="true"]',
    '[aria-label*="Nội dung bài viết"]',
    '[aria-label*="Create a public post"]',
    '[aria-label*="What\'s on your mind"]',
    '[contenteditable="true"][role="textbox"]'
  ];

  let editor = null;
  for (const sel of editorSelectors) {
    try {
      const el = page.locator(sel).last(); // Dùng last() vì đôi khi Facebook lồng 2 thẻ dialog chồng nhau
      await el.waitFor({ state: 'visible', timeout: 5000 });
      editor = el;
      break;
    } catch {}
  }

  if (!editor) throw new Error('Không tìm thấy ô soạn thảo');

  await editor.click();
  await delay(1, 2);

  // Gõ nội dung (type từng dòng)
  const lines = content.split('\n');
  for (const line of lines) {
    await page.keyboard.type(line, { delay: 25 + Math.random() * 30 });
    await page.keyboard.press('Enter');
    await delay(0.2, 0.5);
  }

  await delay(1, 3);

  // Úp ảnh nếu có kiểu xịn đét giả lập người thật
  if (imagePath && fs.existsSync(imagePath)) {
    console.log(`   📸 Đang đính kèm ảnh gốc vào bài viết...`);
    try {
      // Tìm Nút bấm "Ảnh/video" nằm trong Modal
      const photoBtn = page.locator([
        'div[aria-label="Ảnh/video"]', 
        'div[aria-label="Photo/video"]',
        'div[aria-label*="Ảnh"]',
        'div[aria-label*="Photo"]'
      ].join(', ')).first();
      
      // Bắt sự kiện Window chờ mở bảng chọn File
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser', { timeout: 10000 }),
        photoBtn.click()
      ]);
      
      // Bơm file vào họng nó
      await fileChooser.setFiles(imagePath);
      
      await delay(5, 8); // Chờ Facebook loading ảnh lên khung preview cho chắc cốp
      console.log(`   ✅ Ảnh đã được tải lên khung đăng và nằm chễm chệ!`);
    } catch(e) {
      console.log(`   ⚠️ Cảnh báo: Facebook chặn nút Ảnh, thử bơm ép đường cửa sau...`);
      try {
        const fileInput = page.locator('div[role="dialog"] input[type="file"][accept*="image"]').first();
        await fileInput.setInputFiles(imagePath);
        await delay(4, 7);
      } catch(err) {}
    }
  }

  await delay(2, 4);

  // Bấm nút Đăng
  const postBtnSelectors = [
    'div[aria-label="Đăng"]:not([aria-disabled="true"])',
    'div[aria-label="Post"]:not([aria-disabled="true"])',
    'button[aria-label="Đăng"]',
    'div[role="button"]:has-text("Đăng")',
  ];

  let posted = false;
  for (const sel of postBtnSelectors) {
    try {
      const btn = page.locator(sel).last();
      await btn.waitFor({ timeout: 5000 });
      await btn.click();
      posted = true;
      console.log(`   ✅ Đã bấm nút Đăng`);
      break;
    } catch {}
  }

  if (!posted) throw new Error('Không tìm thấy nút Đăng');

  await delay(4, 8);

  // Chụp màn hình
  fs.mkdirSync('screenshots', { recursive: true });
  const filename = `screenshots/${Date.now()}-${groupUrl.split('/groups/')[1] || 'group'}.png`;
  await page.screenshot({ path: filename });
  console.log(`   📸 Screenshot: ${filename}`);
}

async function main() {
  // Lấy bài cần đăng từ DB
  let content = '';
  let postId = null;
  let imagePathLocal = null;

  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (dbUrl) {
    const sql = neon(dbUrl);
    // Lấy timestamp hiện tại (giây) để so sánh với scheduled_time
    const currentEpoch = Math.floor(Date.now() / 1000);

    const posts = await sql`
      SELECT * FROM posts
      WHERE status = 'ready_for_groups' 
        AND (scheduled_time IS NULL OR scheduled_time <= ${currentEpoch})
      ORDER BY id ASC
      LIMIT 1
    `;
    if (posts.length === 0) {
      if (!global.hasLoggedGroupsQueue) {
        console.log('⏳ Chưa tới lịch Đăng Nhóm mới nào (hoặc các bài đang chờ tới giờ hoàng đạo).');
        global.hasLoggedGroupsQueue = true;
      }
      return false;
    }
    const post = posts[0];
    global.hasLoggedGroupsQueue = false;
    postId = post.id;
    content = `${post.content}\n\n${post.hashtags}`;
    
    // Nếu có facebook_post_id, gọi Graph API để kiểm tra xem đã Public trên Page chưa và lấy nội dung chuẩn
    if (post.facebook_post_id && process.env.FACEBOOK_ACCESS_TOKEN) {
      console.log(`\n🔍 Đang kiểm tra trạng thái bài viết cực căng trên Page (FB_ID: ${post.facebook_post_id})...`);
      try {
        const fbRes = await fetch(`https://graph.facebook.com/v21.0/${post.facebook_post_id}?fields=message,is_published&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`);
        const fbData = await fbRes.json();
        
        if (fbData.is_published === false) {
          console.log(`⏳ Bài này hẹn giờ NHƯNG chưa thực sự xuất hiện chễm chệ trên Page chính. Bot sẽ hoãn lại chờ Page lên sóng trước nhé!`);
          return;
        }
        
        if (fbData.message) {
          console.log(`✅ KAK! Đã lụm được nguyên si bài Public chuẩn trên Page. Dùng cái này làm gốc để Spin!!`);
          content = fbData.message;
        }
      } catch (e) {
        console.log(`⚠️ Lỗi check mạng FB, sẽ backup dùng nguyên nội dung từ DB để spin.`);
      }
    }

    console.log(`📝 NỘI DUNG GỐC ĐỂ SPIN (ID: ${postId}):\n${content.substring(0, 150)}...\n`);
    
    // Tải ảnh chuẩn chỉ mà User đã tích chọn trên Vercel để Up Group
    const imgUrl = post.selected_image_url || post.generated_image_url || post.original_image_url;
    if (imgUrl) {
      console.log(`📥 Lấy đúng chuẩn ảnh User đã soi để up Group...`);
      try {
        const res = await fetch(imgUrl);
        const buffer = await res.arrayBuffer();
        imagePathLocal = `screenshots/img_group_${postId}.jpg`;
        fs.writeFileSync(imagePathLocal, Buffer.from(buffer));
      } catch(e) {
        console.log(`⚠️ Lỗi tải ảnh cho Group:`, e.message);
      }
    }

  } else {
    // Test mode: dùng nội dung mẫu
    content = 'Test post từ bot Playwright. #AI #agent';
    console.log('⚠️  Chạy test mode (không có DATABASE_URL)');
  }

  // Load cookies
  if (!fs.existsSync('cookies.json')) {
    console.error('❌ Không tìm thấy file cookies.json!');
    console.log('👉 Cài Cookie-Editor trên Chrome → Export cookies từ Facebook → lưu thành cookies.json');
    return;
  }

  let cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  // Playwright cần format khác Cookie-Editor một chút
  cookies = cookies.map(c => ({
    name: c.name,
    value: c.value,
    domain: c.domain,
    path: c.path || '/',
    expires: c.expirationDate || -1,
    httpOnly: c.httpOnly || false,
    secure: c.secure || false,
    sameSite: 'None',
  }));

  const browser = await chromium.launch({
    headless: false, // false = thấy browser (nên để false lúc test)
    args: ['--lang=vi-VN'],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'vi-VN',
  });

  await context.addCookies(cookies);
  const page = await context.newPage();

  // Kiểm tra cookies còn hợp lệ
  await page.goto('https://www.facebook.com', { waitUntil: 'domcontentloaded' });
  await delay(3, 5);

  if (page.url().includes('login')) {
    console.error('❌ Cookies hết hạn! Cần export lại cookies từ Facebook.');
    await browser.close();
    return;
  }
  console.log('✅ Đăng nhập thành công!\n');

  // Đăng lên từng nhóm
  let successCount = 0;
  for (const groupUrl of GROUPS) {
    try {
      const spunContent = await spinContent(content);
      await postToGroup(page, groupUrl, spunContent, imagePathLocal);
      successCount++;
    } catch (err) {
      console.error(`❌ Lỗi nhóm ${groupUrl}:`, err.message);
      try {
        fs.mkdirSync('screenshots', { recursive: true });
        await page.screenshot({ path: `screenshots/error-${Date.now()}.png` });
      } catch {}
    }

    if (GROUPS.indexOf(groupUrl) < GROUPS.length - 1) {
      const waitMin = 60; // 1 phút
      const waitMax = 300; // 5 phút
      const wait = waitMin + Math.random() * (waitMax - waitMin);
      console.log(`   ⏳ Chờ ${Math.round(wait)}s trước nhóm tiếp theo...`);
      await delay(wait, wait + 10);
    }
  }

  // Cập nhật DB
  if (postId && dbUrl && successCount > 0) {
    const sql = neon(dbUrl);
    await sql`UPDATE posts SET status = 'groups_posted' WHERE id = ${postId}`;
    console.log(`\n✅ Cập nhật DB: bài ${postId} → groups_posted\n`);
  }

  console.log(`\n🎉 Hoàn tất! ${successCount}/${GROUPS.length} nhóm thành công. Sàng lọc sang bài tiếp theo...`);
  await browser.close();
  return true;
}

async function uploadReelsGraphAPI(videoPath, description, scheduledTime) {
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) throw new Error("Chưa có FACEBOOK_ACCESS_TOKEN hoặc PAGE_ID để up Reels");

  console.log("   👉 1. Khởi tạo phiên Upload Reels...");
  const initRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}/video_reels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ upload_phase: 'start', access_token: token })
  });
  const initData = await initRes.json();
  if (!initData.video_id) throw new Error("Lỗi khởi tạo Reels: " + JSON.stringify(initData));

  console.log("   👉 2. Bắn file MP4 lên Mây nhà Zucc (Offset: 0)...");
  const stats = fs.statSync(videoPath);
  const videoBuffer = fs.readFileSync(videoPath);
  
  await fetch(initData.upload_url, {
    method: 'POST',
    headers: {
      'Authorization': `OAuth ${token}`,
      'offset': '0',
      'file_size': stats.size.toString(),
      'Content-Type': 'application/octet-stream'
    },
    body: videoBuffer
  });

  console.log("   👉 3. Publish Reels lên Page...");
  const finishPayload = {
    upload_phase: 'finish',
    video_id: initData.video_id,
    description: description,
    access_token: token,
    video_state: scheduledTime ? 'SCHEDULED' : 'PUBLISHED'
  };
  
  if (scheduledTime) {
    // Đảm bảo hẹn giờ cách hiện tại > 15 phút theo chuẩn Meta 
    const minTime = Math.floor(Date.now() / 1000) + 16 * 60;
    finishPayload.scheduled_publish_time = Math.max(scheduledTime, minTime);
  }

  const finishRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}/video_reels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finishPayload)
  });
  const finishData = await finishRes.json();
  if (finishData.success) {
    if (scheduledTime) {
      console.log(`   ✅ SẮC NÉT! Đã chốt sổ Reels LÊN LỊCH THÀNH CÔNG (Sẽ xuất hiện đúng khung giờ bạn hẹn).`);
    } else {
      console.log(`   ✅ SẮC NÉT! Đã chốt sổ Reels ĐĂNG NGAY (Khoảng 5 phút sau Video sẽ nổi trên Page do hệ thống cần xử lý HD).`);
    }
    return true;
  } else {
    console.log(`   ❌ Lỗi chốt Reels:`, finishData);
    return false;
  }
}

// Hàm AI tự động Tóm tắt nội dung dài sang Kịch bản Video giật gân, Không xưng ngôi, Trân thuật khách quan
async function rewriteForVideo(rawContent) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log("⚠️ Thiếu OPENAI_API_KEY, chuyển sang dùng Gemini...");
    return rewriteForVideoGemini(rawContent);
  }
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: `Dựa vào bài viết sau, hãy viết hoàn thiện thành một KỊCH BẢN VIDEO REELS cực kỳ chi tiết, độ dài khoảng từ 1000 đến 1200 ký tự. BẮT BUỘC: \n- Đọc dạng thông báo giật gân, ngôi kể trần thuật khách quan.\n- Tuyệt đối KHÔNG có đại từ xưng hô, KHÔNG xưng tên (kể cả tên Phương, tôi, mình, chúng tôi).\n- LƯU Ý PHÁT ÂM: Nếu viết về Trí tuệ nhân tạo, BẮT BUỘC phải viết là "A.I". Tuyệt đối không viết là "AI" để tránh máy đọc nhầm. Còn chữ "ai" (chỉ người) thì vẫn viết bình thường.\n- Đảm bảo kịch bản hoàn chỉnh từ đầu đến cuối, không bị cắt cụt giữa chừng.\n- Không gạch đầu dòng, không in đậm, viết thành một khối văn liên tục, mạch lạc, cuốn hút.\n- Chia nội dung thành 8-10 câu ngắn để dễ hiển thị caption.\n\nNội dung gốc:\n${rawContent}`
        }],
        temperature: 0.7
      })
    });
    const data = await res.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const result = data.choices[0].message.content.trim();
      return result.replace(/[*_#]/g, '');
    } else {
      throw new Error("Invalid response format");
    }
  } catch(e) {
    console.log("⚠️ Lỗi OpenAI, dùng tạm Gemini...", e.message);
    return rewriteForVideoGemini(rawContent);
  }
}

async function rewriteForVideoGemini(rawContent) {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDiFfpfPIzAOOuBiIzAIHULGjK1wNQH0YQ';
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Dựa vào bài viết sau, hãy viết lại thành một KỊCH BẢN VIDEO REELS dài từ 1200 đến 1600 ký tự. Đọc dạng thông báo giật gân, ngôi kể trần thuật khách quan. Không xưng hô. Viết liên tục không gạch đầu dòng.\n\nNội dung gốc:\n${rawContent}` }] }]
      })
    });
    const data = await res.json();
    return data.candidates[0].content.parts[0].text.trim().replace(/[*_#]/g, '');
  } catch(e) {
    return rawContent.substring(0, 500);
  }
}

async function checkAndProcessVideos() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) return false;
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  const sql = neon(dbUrl);
  
  const currentEpoch = Math.floor(Date.now() / 1000);
  // Dùng ASC để xử lý tuần tự từ bài chọn trước tới bài chọn sau. Không cần chờ scheduled_time để Render Video nữa!
  const posts = await sql`
    SELECT * FROM posts 
    WHERE create_video = true 
    AND video_status = 'pending'
    ORDER BY id ASC 
    LIMIT 1
  `;
  if (posts.length === 0) {
      if (!global.hasLoggedVideoQueue) {
        console.log('🕵️‍♂️ Hàng đợi Render Video đã được dọn sạch.');
        global.hasLoggedVideoQueue = true;
      }
      return false;
  }
  
  const post = posts[0];
  global.hasLoggedVideoQueue = false;
  console.log(`\n====== 🎬 PHÁT HIỆN LỆNH LÀM VIDEO CHO BÀI: ${post.id} ======`);
  
  try {
    // Trích xuất đúng câu Hook (câu đầu tiên có chữ)
    const lines = post.content.split('\n');
    let hook = lines.find(l => l.trim().length > 0) || 'Video AI Content';
    if (hook.length > 200) hook = hook.substring(0, 197) + '...'; // Tránh dài quá
    const description = `${hook}\n\n${post.hashtags}`;
    
    // Gọi AI bóp ngắn nội dung để phù hợp quay Video Tiktok siêu nhanh (Trần thuật, Không có tên)
    // Bóp kịch bản
    console.log("🎬 Đang đưa cho GPT-4o soạn lại Kịch bản Video ngắn giật gân (Trần thuật, Không xưng hô)...");
    const videoScript = await rewriteForVideo(post.content);
    console.log(`📝 KỊCH BẢN RÚT GỌN CHỐT HẠ CHO VIDEO:\n"${videoScript}"`);
    
    fs.writeFileSync('./video-maker/temp-text.txt', videoScript);
    
    // Template Stat Hero dùng gradient cố định, không cần background.jpg nữa
    
    console.log("🔄 Đang quất máy Render Stat Hero (Remotion + TTS)... Vui lòng chờ...");
    try {
      execSync('node render-cmd.js cli', { cwd: './video-maker', stdio: 'inherit' });
    } catch(renderErr) {
      console.error("❌ Máy Render hoặc TTS báo lỗi cứng. Hủy bỏ phiên này và đánh dấu lỗi!");
      await sql`UPDATE posts SET video_status = 'error' WHERE id = ${post.id}`;
      return true; // Để chạy bài khác
    }
    
    const outPath = './video-maker/out/video.mp4';
    if (fs.existsSync(outPath)) {
      console.log("🔄 Render MP4 thành công! Tiến hành đẩy lên kho Reels của Page...");
      const success = await uploadReelsGraphAPI(outPath, description, post.scheduled_time);
      if (success) {
        await sql`UPDATE posts SET video_status = 'completed' WHERE id = ${post.id}`;
      } else {
        await sql`UPDATE posts SET video_status = 'error' WHERE id = ${post.id}`;
      }
    }
    return true; // Báo hiệu đã làm xong 1 cái, bảo loop quét tiếp
  } catch (err) {
    console.log("❌ Lỗi đứt ruột trong quá trình Video:", err.message);
    await sql`UPDATE posts SET video_status = 'error' WHERE id = ${post.id}`;
    return true;
  }
}


async function startBot() {
  console.log("🤖 BOT NỀN ĐÃ KHỞI ĐỘNG CỰC MẠNH!");
  
  // DỌN RÁC THÔNG MINH – Chỉ xoá bài ĐÃ QUÁ GIỜ HẸN mà vẫn chưa chạy
  // KHÔNG XOÁ bài có scheduled_time trong tương lai (đang chờ đúng giờ)
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      console.log('🧹 Đang kiểm tra bài tồn đọng...');
      const currentEpoch = Math.floor(Date.now() / 1000);
      const expiredThreshold = currentEpoch - 2 * 60 * 60; // Quá giờ hẹn 2 tiếng mới dọn
      
      // Video: Đừng xoá 'pending' vì nhỡ user vừa bấm tạo trên một bài báo đã cũ (thời gian cào created_at sinh ra lâu rồi).
      // Chỉ xoá 'error' nếu nó đã nghẽn quá lâu.
      const res1 = await sql`
        UPDATE posts SET video_status = 'completed' 
        WHERE video_status = 'error' 
        AND (scheduled_time IS NULL OR scheduled_time < ${expiredThreshold})
        AND EXTRACT(EPOCH FROM created_at) < ${currentEpoch - 15 * 60}
        RETURNING id
      `;
      
      // Groups: Chỉ xoá bài ready_for_groups mà KHÔNG có lịch hẹn tương lai
      const res2 = await sql`
        UPDATE posts SET status = 'groups_posted' 
        WHERE status = 'ready_for_groups' 
        AND (scheduled_time IS NULL OR scheduled_time < ${expiredThreshold})
        AND EXTRACT(EPOCH FROM created_at) < ${currentEpoch - 15 * 60}
        RETURNING id
      `;
      
      // Đếm bài đang chờ đúng giờ (để thông báo cho Penny biết)
      const waiting = await sql`
        SELECT COUNT(*) as cnt FROM posts 
        WHERE (status = 'ready_for_groups' OR (create_video = true AND video_status = 'pending'))
        AND scheduled_time IS NOT NULL AND scheduled_time > ${currentEpoch}
      `;
      const waitingCount = Number(waiting[0]?.cnt || 0);
      
      if (res1.length > 0 || res2.length > 0) {
        console.log(`🗑️  Đã dọn ${res1.length} video + ${res2.length} bài nhóm QUÁ HẠN.`);
      }
      if (waitingCount > 0) {
        console.log(`⏰ Đang giữ ${waitingCount} bài CÓ LỊCH HẸN trong tương lai – sẽ chạy đúng giờ!`);
      }
      if (res1.length === 0 && res2.length === 0 && waitingCount === 0) {
        console.log('✨ Không có bài tồn đọng nào.');
      }
    } catch(e) {}
  }
  
  const loop = async () => {
    try {
      let isVideoProcessing = true;
      let isGroupProcessing = true;

      while (isVideoProcessing) {
        isVideoProcessing = await checkAndProcessVideos();
      }

      while (isGroupProcessing) {
        isGroupProcessing = await main();
      }

    } catch (err) {
      console.error('💥 Lỗi không mong đợi trong quá trình quét:', err.message);
    }
  };

  // Chạy luôn lần đầu
  await loop();
  // Treo lặp lại mỗi 1 phút (60000ms) thay vì 10 phút để bot bắt bài mới nhanh hơn
  setInterval(loop, 1 * 60 * 1000);
}

startBot();
