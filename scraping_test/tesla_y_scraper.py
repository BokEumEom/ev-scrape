from playwright.async_api import async_playwright
import asyncio

async def scrape_tesla_with_playwright():
    async with async_playwright() as p:
        # Launching Firefox browser instance asynchronously
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        
        # Navigating to the web page
        await page.goto('https://www.tesla.com/ko_kr/modely', wait_until='networkidle')

        # Defining a function to safely extract text from the page
        async def safe_text(selector):
            """Asynchronously waits for the element and extracts text safely."""
            try:
                element = await page.wait_for_selector(selector, timeout=10000)
                return await element.text_content() if element else 'Not available'
            except Exception as e:
                return f'Error: {str(e)}'

        # Using selectors to extract data from specific elements
        specs = {
            "Drive": {
                "Battery": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "배터리")]/following-sibling::div/p'),
                "Range": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "주행 가능 거리")]/following-sibling::div/p'),
                "Acceleration": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "도달시간")]/following-sibling::div/p'),
                "Drive": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "드라이브")]/following-sibling::div/p')
            },
            "Dimensions": {
                "Weight": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "중량")]/following-sibling::div/p'),
                "Cargo Volume": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "적재공간")]/following-sibling::div/p'),
                "Wheel Size": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "휠")]/following-sibling::div/p'),
                "Seating Capacity": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "좌석수")]/following-sibling::div/p'),
                "Display Size": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "디스플레이")]/following-sibling::div/p'),
                "Ground Clearance": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "최저 지상고")]/following-sibling::div/p'),
                "Width with Mirrors": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전폭")]/following-sibling::div/p'),
                "Height": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전고")]/following-sibling::div/p'),
                "Length": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전장")]/following-sibling::div/p'),
                "Track Front and Rear": await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "트랙 - 전면 및 후면")]/following-sibling::div/p')
            }
        }
        
        # Closing the browser
        await browser.close()
        return specs

# Asynchronously calling the function and printing the results
async def main():
    tesla_specs = await scrape_tesla_with_playwright()
    print(tesla_specs)

if __name__ == "__main__":
    asyncio.run(main())
