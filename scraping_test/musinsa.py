import pandas as pd
from playwright.sync_api import sync_playwright

def crawl_musinsa(keyword):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # headless=False로 설정하여 디버깅을 용이하게 합니다.
        page = browser.new_page()
        url = f"https://www.musinsa.com/search/musinsa/integration?q={keyword}&type=keyword"
        page.goto(url)
        
        # 검색 결과가 로드될 때까지 대기 시간을 늘립니다.
        try:
            page.wait_for_selector('ul#searchList li', timeout=60000)  # 대기 시간을 60초로 늘립니다.
        except Exception as e:
            print(f"Error waiting for search results: {e}")
            browser.close()
            return []
        
        items = page.query_selector_all('ul#searchList li')
        
        results = []
        
        for item in items:
            try:
                image = item.query_selector('img').get_attribute('src')
                name = item.get_attribute('data-bh-content-nm')
                price = item.get_attribute('data-bh-content-meta2')
                brand = item.get_attribute('data-bh-content-meta4')
                
                results.append({
                    'image': image,
                    'name': name,
                    'price': price,
                    'brand': brand
                })
            except AttributeError:
                continue
        
        browser.close()
        
        return results

# Example usage
keyword = '반팔'
results = crawl_musinsa(keyword)

# Convert results to DataFrame and save to CSV
df = pd.DataFrame(results)
df.to_csv('musinsa_products.csv', index=False)

# Display the results
print(df)
