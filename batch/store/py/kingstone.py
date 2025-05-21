import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# 檔案設定
input_file = "books.csv"
output_file = "kingstone_books_info.csv"

# 讀入 ISBN 清單
df = pd.read_csv(input_file)
isbns = df["ISBN"].dropna().astype(str).tolist()

# 設定 Selenium
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

results = []

for isbn in isbns:
    try:
        search_url = f"https://www.kingstone.com.tw/search/key/{isbn}"
        driver.get(search_url)
        time.sleep(2)

        # 抓第一筆 li.displayunit
        book_items = driver.find_elements(By.CSS_SELECTOR, "li.displayunit")
        if not book_items:
            raise Exception("找不到書籍項目")

        first_item = book_items[0]

        # 書籍連結
        link_tag = first_item.find_element(By.CSS_SELECTOR, "h3.pdnamebox a")
        href = link_tag.get_attribute("href")
        product_url = href if href.startswith("http") else "https://www.kingstone.com.tw" + href

        # 價格
        price_tag = first_item.find_element(By.CSS_SELECTOR, ".buymixbox b")
        price = price_tag.text.strip()

        # 加入結果
        results.append({
            "URL": product_url,
            "ISBN": isbn,
            "Price": price,
            "來源": "金石堂"
        })

    except Exception as e:
        print(f"❌ ISBN {isbn} 發生錯誤：{e}")
        results.append({
            "URL": "Not Found",
            "ISBN": isbn,
            "Price": "Not Found",
            "來源": "金石堂"
        })

# 關閉瀏覽器
driver.quit()

# 儲存為 CSV
pd.DataFrame(results).to_csv(output_file, index=False, encoding="utf-8-sig")
print(f"✅ 已完成，輸出檔案：{output_file}")
