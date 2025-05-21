import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def check_tpml_availability(driver, isbn):
    try:
        search_url = f"https://book.tpml.edu.tw/search?searchField=FullText&searchInput={isbn}"
        driver.get(search_url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(1)

        # 若不是詳細頁面就點第一筆
        if "bookDetail" not in driver.current_url:
            try:
                WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, "seq_1"))).click()
                WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "tpmlholdinfo")))
                time.sleep(1)
            except:
                return None  # 查不到書籍

        available = "不可借"
        location = "無館藏資訊"

        try:
            shelf_td = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'td[data-title="書在館"]'))
            )
            shelf_text = shelf_td.text.strip()
            shelf_count = int(shelf_text) if shelf_text.isdigit() else 0
        except:
            shelf_count = 0

        if shelf_count > 0:
            available = "可借"
            try:
                driver.find_element(By.CSS_SELECTOR, 'td[data-title="書在館"] a.open_innertable').click()
                time.sleep(1)
                location = driver.find_element(
                    By.CSS_SELECTOR,
                    'td.innertable table tbody tr td[data-title="館藏地"]'
                ).text.strip()
            except:
                location = "展開失敗"
        else:
            try:
                driver.find_element(By.CSS_SELECTOR, 'td[data-title="外借數量"] a.open_innertable').click()
                time.sleep(1)
                location = driver.find_element(
                    By.CSS_SELECTOR,
                    'td.innertable table tbody tr td[data-title="館藏地"]'
                ).text.strip()
            except:
                location = "展開失敗"

        return (isbn, "台北市立圖書館", available, location)

    except:
        return None  # 處理錯誤時回傳 None

def process_books_csv():
    options = Options()
    options.add_argument("--headless")  # 批次查詢用無頭模式
    driver = webdriver.Chrome(options=options)

    output_rows = []

    try:
        with open("books.csv", newline='', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            for row in reader:
                isbn = row["ISBN"].strip()
                result = check_tpml_availability(driver, isbn)
                if result:
                    output_rows.append(result)
                else:
                    print(f"{isbn}：查無資料或錯誤")

        with open("tpml_holdings.csv", "w", newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(["ISBN", "library", "available", "location"])
            writer.writerows(output_rows)

    finally:
        driver.quit()

if __name__ == "__main__":
    process_books_csv()
