const fs = require('fs');
require('dotenv').config({ path: '../../.env.local' });
const rawContent = "Meta vừa thả một quả bom công nghệ đáng kinh ngạc: giờ đây A.I có thể tự động chạy quảng cáo cho bạn. Meta đã chính thức ra mắt Ads MCP và CLI, cho phép Claude và ChatGPT kết nối trực tiếp vào tài khoản quảng cáo cá nhân. Tốc độ tăng lên 10 lần.";
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

async function run() {
  const openaiKey = process.env.OPENAI_API_KEY;
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openaiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' } })
    });
    const data = await res.json();
    console.log(data.choices[0].message.content);
  } catch(e) {
    console.error(e);
  }
}
run();
