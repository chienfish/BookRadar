import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def check_book_availability(driver, isbn):
    search_url = f"https://ipac.nlpi.edu.tw/search?searchField=FullText&searchInput={isbn}"
    driver.get(search_url)
    time.sleep(3)

    # 若非直接跳轉至 bookDetail，試著點第一筆
    if "bookDetail" not in driver.current_url:
        try:
            WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, "seq_1")))
            driver.find_element(By.ID, "seq_1").click()
            time.sleep(3)
        except:
            return None  # 無搜尋結果

    # 確認是否有館藏資訊
    rows = driver.find_elements(By.CSS_SELECTOR, "div.bookplace_list tr")
    if not rows:
        return None

    # 有任何一筆在架即回傳
    for row in rows:
        try:
            status = row.find_element(By.CSS_SELECTOR, 'td[data-title="狀態/到期日"]').text.strip()
            location = row.find_element(By.CSS_SELECTOR, 'td[data-title="館藏地/室"]').text.strip()
            if status == "在架":
                return (isbn, "國資圖", "可借", location)
        except:
            continue

    # 否則回傳第一筆不可借位置
    for row in rows:
        try:
            location = row.find_element(By.CSS_SELECTOR, 'td[data-title="館藏地/室"]').text.strip()
            return (isbn, "國資圖", "不可借", location)
        except:
            continue

    # 找不到位置
    return (isbn, "國資圖", "不可借", "無館藏資訊")


def main():
    options = Options()
    options.add_argument("--headless")  # 開啟視窗除錯可註解
    driver = webdriver.Chrome(options=options)

    output_rows = []

    try:
        with open("books.csv", newline='', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            for row in reader:
                isbn = row["ISBN"].strip()
                result = check_book_availability(driver, isbn)
                if result:
                    output_rows.append(result)
                else:
                    print(f"{isbn}：找不到書籍")

        # 寫入 library_holdings.csv
        with open("library_holdings.csv", "w", newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(["ISBN", "library", "available", "location"])  # 標題
            writer.writerows(output_rows)

    finally:
        driver.quit()


if __name__ == "__main__":
    main()
