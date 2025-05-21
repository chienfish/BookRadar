import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# 輸入/輸出檔名
input_file = "books.csv"
output_file = "eslite_books_info.csv"

# 讀取 books.csv 的 ISBN 欄位
df = pd.read_csv(input_file)
isbns = df["ISBN"].dropna().astype(str).tolist()

# Selenium 設定
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

results = []

for isbn in isbns:
    search_url = f"https://www.eslite.com/Search?keyword={isbn}"
    driver.get(search_url)
    time.sleep(3)  # 給 JS 時間

    try:
        # 商品連結
        product_links = driver.find_elements(By.CSS_SELECTOR, "a.item-image-link")
        if not product_links:
            raise Exception("找不到商品連結")
        product_url = "https://www.eslite.com" + product_links[0].get_attribute("href")

        # 價格
        price_elements = driver.find_elements(By.CLASS_NAME, "slider-price")
        if not price_elements:
            raise Exception("找不到價格")
        price = price_elements[0].text.strip()

        # 加入結果
        results.append({
            "URL": product_url,
            "ISBN": isbn,
            "Price": price,
            "來源": "誠品"
        })

    except Exception as e:
        print(f"❌ ISBN {isbn} 發生錯誤：{e}")
        results.append({
            "URL": "Not Found",
            "ISBN": isbn,
            "Price": "Not Found",
            "來源": "誠品"
        })

# 關閉瀏覽器
driver.quit()

# 輸出結果到 CSV
pd.DataFrame(results).to_csv(output_file, index=False, encoding="utf-8-sig")
print(f"✅ 已完成，輸出檔案：{output_file}")
