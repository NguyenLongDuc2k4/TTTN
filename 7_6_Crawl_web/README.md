# Công cụ crawl giao diện Website (Web Interface Scraper)

Dự án này chứa một script Python chuyên nghiệp để crawl toàn bộ tài nguyên giao diện của một website dựa trên URL đầu vào. Script tự động tải mã nguồn HTML chính, các tệp Stylesheet (CSS), tệp JavaScript (JS), và các tệp hình ảnh (.png, .jpg, .jpeg, .webp), đồng thời cập nhật lại đường dẫn để hiển thị offline dễ dàng.

## 📋 Yêu cầu hệ thống và cài đặt thư viện

Để chạy được chương trình, máy tính của bạn cần cài đặt sẵn **Python 3.x**. Tiếp theo, cài đặt các thư viện cần thiết bằng công cụ quản lý thư viện `pip`.

Chạy lệnh dưới đây trong Terminal / Command Prompt:

```bash
pip install requests beautifulsoup4
```

*Giải thích thư viện:*
- `requests`: Thư viện gửi các yêu cầu HTTP/HTTPS lên máy chủ để nhận về mã nguồn trang và tải các tài nguyên (CSS, JS, Hình ảnh).
- `beautifulsoup4`: Thư viện phân tích cú pháp cú pháp HTML, giúp tìm kiếm và trích xuất các liên kết tài nguyên dễ dàng.

---

## 🚀 Hướng dẫn sử dụng

Bạn có thể chạy script bằng một trong hai cách dưới đây:

### Cách 1: Chạy trực tiếp và nhập URL từ bàn phím
Chạy lệnh:
```bash
python web_scraper.py
```
Sau đó nhập đường dẫn URL của website khi được yêu cầu trên màn hình. Ví dụ: `https://giao-dien.abc/trang-chu` hoặc `giao-dien.abc`.

### Cách 2: Truyền trực tiếp URL làm tham số dòng lệnh
Chạy lệnh:
```bash
python web_scraper.py https://giao-dien.abc/trang-chu
```

---

## 📁 Cấu trúc thư mục dữ liệu đầu ra

Tất cả tài nguyên tải xuống sẽ được sắp xếp vào thư mục `Data` theo cấu trúc quy định:

```text
TTTN/
└── 7_6_Crawl_web/
    ├── web_scraper.py         # Mã nguồn Python chính (không chú thích)
    ├── README.md              # Hướng dẫn sử dụng này
    └── Data/                  # Thư mục cha chứa dữ liệu cào về (đã được cấu hình ẩn trong .gitignore)
        └── [ngày]-[tháng]-[Tên miền]/
            ├── html/          # Chứa tệp index.html chính (đã tối ưu cấu trúc xem offline)
            ├── css/           # Chứa các tệp stylesheet (.css)
            ├── js/            # Chứa các tệp script (.js)
            └── img/           # Chứa các tệp hình ảnh (.png, .jpg, .jpeg, .webp)
```
Viết một file `README.md` rõ ràng và chuyên nghiệp là một thói quen tuyệt vời. Nó giống như "mặt tiền" của repository, giúp anh hướng dẫn (hoặc bất kỳ ai xem code) hiểu ngay dự án của bạn làm gì, cài đặt ra sao mà không cần phải đọc từng dòng code. Đây là một điểm cộng cực lớn trong công việc thực tế.

Dưới đây là mẫu `README.md` chuẩn chỉnh được thiết kế riêng cho file `web_scraper_v2.py` của bạn. Bạn hãy tạo một file có tên chính xác là `README.md` (viết hoa) để cùng thư mục với file code, copy toàn bộ nội dung trong khung dưới đây và dán vào nhé:


#  DYNAMIC WEB SCRAPER V2

Đây là công cụ crawl dữ liệu giao diện website nâng cao, được thiết kế đặc biệt để xử lý các trang web động (Dynamic Websites). Thay vì chỉ tải mã nguồn tĩnh gốc, công cụ này tích hợp trình duyệt ảo để chờ các API tải hoàn tất dữ liệu lên giao diện trước khi tiến hành bóc tách.

## ✨ Tính năng nổi bật

* **Hỗ trợ Web Động (JavaScript/API):** Tích hợp `Selenium WebDriver` chạy ngầm (Headless Chrome) giúp đợi trang web render đầy đủ dữ liệu từ API.
* **Thời gian trễ tùy chỉnh (Custom Delay):** Cho phép cấu hình thời gian chờ API (mặc định 5s) thông qua biến `DELAY_TIME` ở đầu file.
* **Tự động hóa cấu trúc lưu trữ:** Tự động tạo thư mục theo chuẩn `Data/[Ngày-Tháng]-[Tên_Miền]-v2/` bao gồm các thư mục con `html`, `css`, `js`, `img`.
* **Xử lý liên kết thông minh:** Tự động phát hiện, tải về mọi tài nguyên (kể cả ảnh dùng công nghệ Lazy-load `data-src`) và sửa đổi trực tiếp đường dẫn bên trong file `index.html` thành đường dẫn cục bộ (Local path) để xem offline mượt mà.

---

## ⚙️ Yêu cầu hệ thống

Trước khi chạy chương trình, hãy đảm bảo máy tính của bạn đã cài đặt:
1. **[Python 3.x](https://www.python.org/)** (Đã cấu hình vào biến môi trường PATH).
2. Trình duyệt **Google Chrome** (Bản cập nhật mới nhất).

## 📦 Hướng dẫn Cài đặt

Mở Terminal / Command Prompt tại thư mục chứa mã nguồn và chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
pip install requests beautifulsoup4 selenium webdriver-manager

```

---

## 🚀 Hướng dẫn Sử dụng

**Bước 1:** Khởi động chương trình bằng lệnh:

```bash
python web_scraper_v2.py

```

*(Hoặc dùng lệnh `py web_scraper_v2.py` tùy thuộc vào hệ điều hành Windows của bạn).*

**Bước 2:** Nhập đường link website bạn muốn crawl dữ liệu khi màn hình Terminal yêu cầu. Ví dụ: https://www.youtube.com/@TuyenVanHoaTV

**Bước 3:** Ngồi chờ chương trình tự động mở trình duyệt ảo, đợi API đổ dữ liệu (5 giây) và tải các tệp tin về máy.

---

## 📂 Cấu trúc thư mục đầu ra

Sau khi chạy thành công, mã nguồn sẽ tự động trả về toàn bộ dữ liệu giao diện theo cấu trúc cây thư mục cực kỳ gọn gàng như sau:

```text
📁 Data/
└── 📁 [Ngày]-[Tháng]-[Domain]-v2/
    ├── 📁 css/          # Chứa toàn bộ file style (style_0.css, style_1.css...)
    ├── 📁 html/         
    │   └── 📄 index.html # File giao diện chính đã được chỉnh sửa link cục bộ
    ├── 📁 img/          # Chứa hình ảnh định dạng (.png, .jpg, .webp...)
    └── 📁 js/           # Chứa các file kịch bản JS (script_0.js...)

```

Để kiểm tra thành quả, bạn chỉ cần vào thư mục `html/` và mở file `index.html` bằng trình duyệt web.

---

## 🔧 Cấu hình Nâng cao

Nếu bạn gặp phải trang web có tốc độ load API quá chậm hoặc mạng yếu, bạn có thể tăng thời gian chờ bằng cách mở file `web_scraper_v2.py` và sửa con số tại dòng cấu hình ở ngay trên cùng:

# CẤU HÌNH THỜI GIAN CHỜ TẠI ĐÂY
DELAY_TIME = 5  # Thay đổi số 5 thành số giây bạn mong muốn

Lưu ý: Đây là bài tập mục đích phục vụ học tập