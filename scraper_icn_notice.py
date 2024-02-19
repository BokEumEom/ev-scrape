from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# Function to scrape announcements
def scrape_announcements(search_term):
    # Set up the Selenium WebDriver
    service = Service(excutable_path="./chromedriver.exe")
    options = webdriver.ChromeOptions()
    options.headless = True  # 브라우저를 머리없는 모드로 실행 (GUI 없이)
    driver = webdriver.Chrome(service=service, options=options)

    try:
        # Open the page
        driver.get("https://announce.incheon.go.kr/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchList&flag=gosiGL&svp=Y&sido=ic#")
        
        # Wait for the input box to be loaded
        time.sleep(3)  # Adjust the sleep time as necessary

        # Find the search input and submit the search term
        search_input = driver.find_element(By.ID, "conTitle")
        search_input.send_keys(search_term)
        search_input.send_keys(Keys.ENTER)
        
        # Wait for the search results to be loaded
        time.sleep(3)  # Adjust the sleep time as necessary

        # Now you can use BeautifulSoup to parse the page source
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Extract information from the page with BeautifulSoup...
        # Replace the below with the actual scraping logic for your content
        announcements = []
        for row in soup.select('table tr')[1:]:  # Skip header row
            cells = row.select('td')
            if len(cells) > 1:  # Ensure there are enough columns
                announcement = {
                    'number': cells[0].text.strip(),
                    'title': cells[1].text.strip(),
                    'link': cells[1].find('a')['href'],
                    'date': cells[3].text.strip()
                }
                announcements.append(announcement)
        return announcements
    finally:
        driver.quit()  # Make sure to quit the driver

# Use the function
if __name__ == "__main__":
    search_term = '전기자동차'
    results = scrape_announcements(search_term)
    for result in results:
        print(result)
