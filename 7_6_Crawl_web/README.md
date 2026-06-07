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
