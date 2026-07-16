# Hướng dẫn cài đặt & sử dụng — AI Content Pipeline

Hệ thống tự động **Research → Chọn format → Viết bài** bằng AI (Claude / OpenAI) và render video (Remotion).

---

## Yêu cầu cơ bản
- [Node.js](https://nodejs.org/en) phiên bản **>= 18**.
- Một database Postgres (miễn phí ở [Neon](https://neon.tech)).
- API key AI để viết bài (Anthropic **hoặc** Kyma — xem bên dưới).
- Git (tùy chọn nhưng khuyên dùng).

---

## Bước 1: Cài đặt

```bash
cd duong-dan-vao-thu-muc-du-an
npm install
```

---

## Bước 2: Cấu hình API Keys

Copy file `.env.example` (hoặc `.env.local` đã có sẵn) rồi điền key. Không phải điền hết — chỉ điền theo nhu cầu:

### 🔴 Bắt buộc (tối thiểu để chạy được)
| Biến | Dùng để làm gì | Lấy ở đâu |
|---|---|---|
| `POSTGRES_URL` | Lưu & đọc bài Research | [Neon](https://neon.tech) → tạo project → copy connection string |
| `ANTHROPIC_API_KEY` | AI viết bài (bước Write) | [console.anthropic.com](https://console.anthropic.com) |

> 💡 **Muốn tiết kiệm chi phí AI?** Có thể thay Anthropic bằng [Kyma](https://kymaapi.com?aff=offer) — một proxy tương thích Anthropic nhưng giá mềm hơn nhiều. Chỉ cần điền key Kyma vào `ANTHROPIC_API_KEY` và bỏ dấu `#` ở dòng `ANTHROPIC_BASE_URL="https://kymaapi.com"` trong `.env.local`. Không cần sửa code.

### 🟡 Research nâng cao (chỉ cần nếu quét mạng xã hội)
Nếu chỉ dùng nguồn **News (RSS)** thì bỏ qua phần này.

| Biến | Dùng để làm gì | Lấy ở đâu |
|---|---|---|
| `BRAVE_API_KEY` | Quét Instagram + bổ trợ tìm kiếm | [Brave Search API](https://brave.com/search/api) (có bậc miễn phí) |
| `RAPID_API_KEY` | Quét X (Twitter) qua RapidAPI | [rapidapi.com](https://rapidapi.com) (gói *twitter-api47*) |
| `APIFY_API_TOKEN` | Scraper ổn định hơn cho IG/X/TikTok | [Apify](https://www.apify.com?fpr=get-api) |

### ⚪ Tùy chọn
| Biến | Dùng để làm gì |
|---|---|
| `OPENAI_API_KEY` | **Chỉ** để tạo ảnh (không cần cho Research/Write) |
| `FACEBOOK_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`… | Tự động đăng bài lên Facebook |

---

## Bước 3: Chạy thử ở máy

```bash
npm run dev
```
Mở `http://localhost:3000`, làm theo 3 bước trên giao diện:
- **Research** — quét nguồn (chọn News / X / Instagram). Mới bắt đầu nên chọn **News**.
- **Select / Format** — chọn định dạng & số lượng bài.
- **Write** — Claude (hoặc Kyma) viết bài tự động.

---

## Bước 4: Đưa lên mạng (Deploy)

### 🆓 Miễn phí — Railway (khuyên dùng để bắt đầu)
[Railway](https://railway.com?referralCode=vibe-code) deploy Next.js chỉ vài phút, có sẵn Postgres.

1. Đăng ký tại [railway.com](https://railway.com?referralCode=vibe-code) (mã giới thiệu: `vibe-code`).
2. **New Project → Deploy from GitHub repo** → chọn repo này.
3. **New → Database → Add PostgreSQL**, rồi copy connection string vào biến `POSTGRES_URL` trong tab **Variables**.
4. Thêm nốt các biến còn lại (`ANTHROPIC_API_KEY`…) vào **Variables**.
5. Railway tự build & cấp domain `*.up.railway.app`. Xong.

### 💳 Trả phí / dùng lâu dài — Hostinger
Muốn hosting mạnh, domain riêng, ổn định thì dùng [Hostinger](https://hostinger.com/PENNYDEAL) (áp mã **PENNYDEAL** / **PENNYDEAL10** để giảm giá — link: [hostinger.com/PENNYDEAL10](https://hostinger.com/PENNYDEAL10)).

1. Mua gói **VPS** hoặc **Cloud/Node.js hosting** tại [Hostinger](https://hostinger.com/PENNYDEAL).
2. Cài Node.js >= 18 trên server, `git clone` repo về.
3. Tạo file `.env.local` với đầy đủ key như Bước 2.
4. `npm install && npm run build && npm start` (hoặc dùng `pm2` để chạy nền).
5. Trỏ domain về server qua phần DNS của Hostinger.

> Gợi ý: mới thử nghiệm → **Railway** cho nhanh & free. Chạy thật, cần domain + tài nguyên ổn định → **Hostinger**.

---

## (Nâng cao) Render video
```bash
cd bot/video-maker
npm install
npm start
```

---

## Tùy chỉnh thương hiệu
- **Logo:** thay `logo-placeholder.jpg` trong `bot/assets/`.
- **Tên kênh:** tìm & thay `@YOUR_USERNAME` trong code thành tài khoản của bạn.

---

## Xuất hướng dẫn ra PDF
- **VSCode:** cài extension *Markdown PDF* → chuột phải → *Export to PDF*.
- Hoặc dán nội dung vào Word / Google Docs rồi lưu `.pdf`.
