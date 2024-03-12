# app/scraper_incheon.py
import asyncio
from playwright.async_api import async_playwright
import logging
import re

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# The Incheon website URL we will scrape
INCEHON_ANNOUNCEMENTS_URL = "https://announce.incheon.go.kr/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchList&flag=gosiGL&svp=Y&sido=ic"

async def scrape_incheon2_announcements():
    announcements = []
    try:
        async with async_playwright() as p:
            # Launch the browser in headless mode
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            # Go to the announcements page
            await page.goto(INCEHON_ANNOUNCEMENTS_URL, wait_until="domcontentloaded")
            
            # Wait for the necessary elements to load
            await page.wait_for_selector("table[summary] tr")

            # Select all table rows
            rows = await page.query_selector_all("table[summary] tr")
            for row in rows:
                # Select the title cell and date cell within the row
                title_cell = await row.query_selector('td.d_tb_left a')
                date_cell = await row.query_selector('td.d_tb_center:nth-of-type(4)')
                
                if title_cell and date_cell:
                    title = await title_cell.inner_text()
                    date = await date_cell.inner_text()
                    onclick_value = await title_cell.get_attribute('onclick')
                    
                    # Use regex to extract the announcement ID from the onclick attribute
                    match = re.search(r"viewData\('(\d+)',", onclick_value or '')
                    if match:
                        announcement_id = match.group(1)
                        # Construct the link to the announcement detail page
                        link = f"https://announce.incheon.go.kr/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchDetail&flag=gosiGL&svp=Y&sido=ic&sno={announcement_id}&gosiGbn=A"
                    else:
                        link = "Link not found"
                    
                    announcements.append({
                        'title': title.strip(),
                        'date': date.strip(),
                        'link': link
                    })

    except Exception as e:
        logger.error("Error during scraping: ", exc_info=True)
        return []
    finally:
        # Make sure to close the browser
        await browser.close()

    return announcements

async def main():
    logger.info("Main function started")
    announcements = await scrape_incheon_announcements()
    for announcement in announcements:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
