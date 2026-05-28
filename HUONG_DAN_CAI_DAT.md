# Hướng dẫn cài đặt và sử dụng Hệ thống AI Content Pipeline

Hệ thống này giúp bạn tự động tìm kiếm tin tức, lên kịch bản và tạo bài đăng/video hoàn toàn tự động bằng sức mạnh của AI (Claude, OpenAI) và Remotion.

## Yêu cầu cơ bản
- Máy tính đã cài đặt [Node.js](https://nodejs.org/en) (Phiên bản >= 18).
- Có tài khoản và API Key của các dịch vụ sau: OpenAI, Anthropic (Claude), RapidAPI (nếu dùng các luồng crawl data), và Vercel Postgres (nếu cần database).
- Đã cài đặt Git (tùy chọn nhưng khuyên dùng).

---

## Bước 1: Cài đặt và thiết lập môi trường

1. **Mở thư mục code**
   Mở ứng dụng Terminal (Mac/Linux) hoặc Command Prompt / PowerShell (Windows) và truy cập vào thư mục của dự án này.
   ```bash
   cd du-ong-dan-vao-thu-muc-du-an
   ```

2. **Cài đặt thư viện**
   Chạy lệnh sau để cài toàn bộ thư viện cần thiết:
   ```bash
   npm install
   ```

3. **Cấu hình API Keys**
   - Bạn sẽ thấy một file tên là `.env.example`.
   - Copy file này hoặc đổi tên nó thành `.env.local`.
   - Mở file `.env.local` lên bằng bất kỳ trình soạn thảo nào (Notepad, VSCode...).
   - Điền các thông tin API Key của bạn vào trong dấu ngoặc kép.
     - `OPENAI_API_KEY`: Lấy từ trang platform.openai.com.
     - `FACEBOOK_ACCESS_TOKEN`: Lấy từ Meta for Developers.
     - `POSTGRES_URL`: Lấy từ NeonDB hoặc Vercel.

---

## Bước 2: Tùy chỉnh thông tin cá nhân

- **Đổi Logo:** Thay thế file `logo-placeholder.jpg` trong mục `bot/assets/` bằng logo thương hiệu của bạn (đặt tên lại thành `logo-placeholder.jpg` hoặc sửa tên trong code tương ứng).
- **Đổi Tên Kênh:** Nếu có các đoạn code chứa chữ `@YOUR_USERNAME` (ví dụ ở phần video render), hãy sửa lại thành tên tài khoản thực tế của bạn (VD: `@ai_news`).

---

## Bước 3: Chạy ứng dụng

1. **Khởi chạy giao diện chính**
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt ở địa chỉ: `http://localhost:3000`
   Tại giao diện này, bạn có thể thực hiện 3 bước:
   - **Research**: AI sẽ quét các nguồn báo chí (TechCrunch, a16z...) để tìm tin tức mới nhất.
   - **Select/Format**: Chọn định dạng bài và số lượng.
   - **Write**: Hệ thống sẽ yêu cầu Claude viết bài tự động.

2. **(Nâng cao) Khởi chạy luồng render Video**
   Chuyển hướng vào thư mục bot video:
   ```bash
   cd bot/video-maker
   npm install
   npm start
   ```

---

## Xuất file Hướng dẫn này ra định dạng PDF
Nếu bạn đang xem file Markdown này trên các trình duyệt hỗ trợ Markdown hoặc trên ứng dụng như Visual Studio Code, bạn có thể dễ dàng xuất nó ra PDF bằng cách:
1. (VSCode): Cài đặt extension "Markdown PDF", click chuột phải vào nội dung và chọn "Export to PDF".
2. Hoặc upload nội dung chữ này vào Chatbot AI, hoặc phần mềm Word để lưu dưới định dạng `.pdf` chia sẻ cho bạn bè.
