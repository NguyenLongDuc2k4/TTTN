DELAY_TIME = 5  # Chờ 5 giây để các API fetch và render đầy đủ lên giao diện
# ==========================================

import os
import sys
import time
from urllib.parse import urlparse, urljoin
from datetime import datetime
import requests
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def download_file(url, folder, filename):
    try:
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            with open(os.path.join(folder, filename), "wb") as f:
                f.write(res.content)
            return True
    except:
        pass
    return False

def crawl_dynamic_website(url):
    print("==================================================")
    print("    TIẾN TRÌNH CRAWL DỮ LIỆU GIAO DIỆN (BẢN V2)     ")
    print("==================================================")
    
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    domain = urlparse(url).netloc
    date_str = f"{datetime.now().day}-{datetime.now().month}"
    project_dir = os.path.join("Data", f"{date_str}-{domain}-v2")
    
    dirs = {
        "html": os.path.join(project_dir, "html"),
        "css": os.path.join(project_dir, "css"),
        "js": os.path.join(project_dir, "js"),
        "img": os.path.join(project_dir, "img")
    }
    for folder in dirs.values():
        os.makedirs(folder, exist_ok=True)
        
    print(f"[+] Đã tạo thư mục lưu trữ tại: {project_dir}")

    print("[*] Đang khởi động trình duyệt ảo (Chrome Headless)...")
    chrome_options = Options()
    chrome_options.add_argument("--headless") 
    chrome_options.add_argument("--log-level=3")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        print(f"[*] Đang truy cập URL: {url}")
        driver.get(url)
        
        print(f"[*] Đang chờ {DELAY_TIME} giây để API fetch đầy đủ nội dung lên UI...")
        time.sleep(DELAY_TIME) 
        
        html_content = driver.page_source
        print("[+] Đã lấy được toàn bộ mã nguồn HTML (bao gồm dữ liệu động).")
    finally:
        driver.quit()

    soup = BeautifulSoup(html_content, "html.parser")
    
    with open(os.path.join(dirs["html"], "index.html"), "w", encoding="utf-8") as f:
        f.write(soup.prettify())

    print("\n[*] Đang tải CSS...")
    css_count = 0
    for tag in soup.find_all("link", rel="stylesheet"):
        href = tag.get("href")
        if href:
            css_url = urljoin(url, href)
            filename = f"style_{css_count}.css"
            if download_file(css_url, dirs["css"], filename):
                tag["href"] = f"../css/{filename}"
                css_count += 1
                
    print("[*] Đang tải JS...")
    js_count = 0
    for tag in soup.find_all("script"):
        src = tag.get("src")
        if src:
            js_url = urljoin(url, src)
            filename = f"script_{js_count}.js"
            if download_file(js_url, dirs["js"], filename):
                tag["src"] = f"../js/{filename}"
                js_count += 1

    print("[*] Đang tải Hình ảnh...")
    img_count = 0
    for tag in soup.find_all("img"):
        img_url = tag.get("data-src") or tag.get("src")
        if img_url:
            full_img_url = urljoin(url, img_url)
            ext = os.path.splitext(urlparse(full_img_url).path)[1]
            if not ext: ext = ".png"
            
            filename = f"image_{img_count}{ext}"
            if download_file(full_img_url, dirs["img"], filename):
                tag["src"] = f"../img/{filename}"
                if tag.get("data-src"):
                    tag["data-src"] = f"../img/{filename}"
                img_count += 1

    with open(os.path.join(dirs["html"], "index.html"), "w", encoding="utf-8") as f:
        f.write(soup.prettify())

    print("\n==================================================")
    print(f"[✓] HOÀN TẤT V2! Đã tải: {css_count} CSS, {js_count} JS, {img_count} Ảnh.")
    print("==================================================")

if __name__ == "__main__":
    target_url = input("Nhập URL website (Bản V2 hỗ trợ trang web động): ").strip()
    if target_url:
        crawl_dynamic_website(target_url)