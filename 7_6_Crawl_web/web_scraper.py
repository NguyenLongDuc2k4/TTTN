import os
import sys
import re
from datetime import datetime
from urllib.parse import urlparse, urljoin
import requests
from bs4 import BeautifulSoup

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

def get_unique_filename(url, folder_path, default_ext=""):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    
    if not filename:
        import uuid
        filename = f"resource_{uuid.uuid4().hex[:8]}"
        
    name, ext = os.path.splitext(filename)
    
    if not ext and default_ext:
        ext = default_ext
        
    safe_name = re.sub(r'[\\/*?:"<>|]', "", name)
    safe_name = "".join(c for c in safe_name if c.isalnum() or c in ("-", "_", "."))
    if not safe_name:
        safe_name = "asset"
        
    safe_ext = re.sub(r'[\\/*?:"<>|]', "", ext)
    safe_ext = "".join(c for c in safe_ext if c.isalnum() or c == ".")
    
    filename = safe_name + safe_ext
    
    full_path = os.path.join(folder_path, filename)
    counter = 1
    while os.path.exists(full_path):
        filename = f"{safe_name}_{counter}{safe_ext}"
        full_path = os.path.join(folder_path, filename)
        counter += 1
        
    return filename

def download_web_assets(url):
    print("==================================================")
    print("        TIẾN TRÌNH CÀO GIAO DIỆN WEBSITE          ")
    print("==================================================")
    
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
        
    try:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        if not domain:
            raise ValueError("Không tìm thấy tên miền hợp lệ từ URL cung cấp.")
        print(f"[+] URL mục tiêu: {url}")
        print(f"[+] Tên miền phân tách được: {domain}")
    except Exception as e:
        print(f"[-] Lỗi phân tích URL: {e}")
        return

    now = datetime.now()
    date_str = f"{now.day}-{now.month}"
    
    base_dir = "Data"
    project_dir = os.path.join(base_dir, f"{date_str}-{domain}")
    
    html_dir = os.path.join(project_dir, "html")
    css_dir = os.path.join(project_dir, "css")
    js_dir = os.path.join(project_dir, "js")
    img_dir = os.path.join(project_dir, "img")
    
    try:
        for folder in [html_dir, css_dir, js_dir, img_dir]:
            os.makedirs(folder, exist_ok=True)
        print(f"[+] Đã khởi tạo cấu trúc thư mục dự án tại: {project_dir}")
    except Exception as e:
        print(f"[-] Không thể tạo thư mục lưu trữ: {e}")
        return

    session = requests.Session()
    session.headers.update({
        "authority": domain,
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    
    try:
        print("[*] Đang gửi yêu cầu tải trang HTML chính...")
        response = session.get(url, timeout=20)
        response.raise_for_status()
        
        response.encoding = response.apparent_encoding
        soup = BeautifulSoup(response.text, "html.parser")
        print("[+] Đã tải xong mã nguồn HTML chính.")
    except Exception as e:
        print(f"[-] Lỗi nghiêm trọng khi tải HTML chính từ server: {e}")
        return

    print("\n--- BẮT ĐẦU TẢI CÁC TỆP CSS ---")
    css_tags = soup.find_all("link", rel="stylesheet")
    print(f"[+] Tìm thấy {len(css_tags)} liên kết stylesheet CSS.")
    
    for tag in css_tags:
        href = tag.get("href")
        if href:
            css_url = urljoin(url, href)
            filename = get_unique_filename(css_url, css_dir, ".css")
            local_path = os.path.join(css_dir, filename)
            
            try:
                print(f"[*] Đang tải: {css_url}")
                css_response = session.get(css_url, timeout=15)
                css_response.raise_for_status()
                with open(local_path, "wb") as f:
                    f.write(css_response.content)
                tag["href"] = f"../css/{filename}"
                print(f"   => Lưu thành công: {filename}")
            except Exception as e:
                print(f"   => [Lỗi] Không tải được CSS: {css_url}. Chi tiết: {e}")

    print("\n--- BẮT ĐẦU TẢI CÁC TỆP SCRIPT JS ---")
    js_tags = [script for script in soup.find_all("script") if script.get("src")]
    print(f"[+] Tìm thấy {len(js_tags)} liên kết script JS.")
    
    for tag in js_tags:
        src = tag.get("src")
        if src:
            js_url = urljoin(url, src)
            filename = get_unique_filename(js_url, js_dir, ".js")
            local_path = os.path.join(js_dir, filename)
            
            try:
                print(f"[*] Đang tải: {js_url}")
                js_response = session.get(js_url, timeout=15)
                js_response.raise_for_status()
                with open(local_path, "wb") as f:
                    f.write(js_response.content)
                tag["src"] = f"../js/{filename}"
                print(f"   => Lưu thành công: {filename}")
            except Exception as e:
                print(f"   => [Lỗi] Không tải được JS: {js_url}. Chi tiết: {e}")

    print("\n--- BẮT ĐẦU TRÍCH XUẤT DANH SÁCH HÌNH ẢNH ---")
    img_tags = soup.find_all("img")
    
    valid_img_extensions = (".png", ".jpg", ".jpeg", ".webp")
    image_download_tasks = []
    
    for tag in img_tags:
        src = tag.get("src")
        data_src = tag.get("data-src")
        
        for img_attr in [src, data_src]:
            if img_attr:
                abs_img_url = urljoin(url, img_attr)
                parsed_img_url = urlparse(abs_img_url)
                img_path = parsed_img_url.path.lower()
                
                if img_path.endswith(valid_img_extensions):
                    image_download_tasks.append({
                        "tag": tag,
                        "url": abs_img_url,
                        "attr": "src" if img_attr == src else "data-src"
                    })
                    break
                    
    print(f"[+] Tìm thấy {len(image_download_tasks)} hình ảnh có định dạng hợp lệ (.png, .jpg, .jpeg, .webp):")
    for index, task in enumerate(image_download_tasks, 1):
        print(f" {index}. {task['url']}")
        
    print("\n--- TIẾN HÀNH TẢI CÁC TỆP HÌNH ẢNH ---")
    for task in image_download_tasks:
        img_url = task["url"]
        img_tag = task["tag"]
        attr = task["attr"]
        
        parsed_img = urlparse(img_url)
        _, ext = os.path.splitext(parsed_img.path)
        if not ext:
            ext = ".png"
            
        filename = get_unique_filename(img_url, img_dir, ext)
        local_path = os.path.join(img_dir, filename)
        
        try:
            print(f"[*] Đang tải: {img_url}")
            img_response = session.get(img_url, timeout=15)
            img_response.raise_for_status()
            with open(local_path, "wb") as f:
                f.write(img_response.content)
                
            img_tag[attr] = f"../img/{filename}"
            if attr == "data-src":
                img_tag["src"] = f"../img/{filename}"
                
            print(f"   => Lưu thành công: {filename}")
        except Exception as e:
            print(f"   => [Lỗi] Không tải được ảnh: {img_url}. Chi tiết: {e}")

    html_file_path = os.path.join(html_dir, "index.html")
    print("\n--- LƯU TRANG GIAO DIỆN HTML HOÀN CHỈNH ---")
    try:
        with open(html_file_path, "w", encoding="utf-8") as f:
            f.write(soup.prettify())
        print(f"[+] Đã hoàn thiện và lưu mã nguồn HTML cục bộ tại: {html_file_path}")
    except Exception as e:
        print(f"[-] Không thể lưu tệp HTML chính: {e}")

    print("\n==================================================")
    print(f"[THÀNH CÔNG] Hoàn tất tiến trình cào dữ liệu: {domain}")
    print(f"Thư mục dự án lưu trữ tại: {project_dir}")
    print("==================================================")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
    else:
        target_url = input("Nhập URL website cần cào giao diện: ").strip()
        
    if target_url:
        download_web_assets(target_url)
    else:
        print("[-] Đường dẫn URL đầu vào không hợp lệ hoặc bị để trống.")
