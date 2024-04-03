# app/scrapers/goyang_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
import re

class GoyangScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.goyang.go.kr"
        self.path = "/www/user/bbs/BD_selectBbsList.do?q_bbsCode=1030"
        self.selectors = {
            'announcement': "tbody > tr",
            'title': "td.subject.text-left > a",
            'date': "td.date",
            'link': "td.subject.text-left > a"
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link = 'No link' if not title_element or not title_element.has_attr('onclick') else self.transform_link(title_element.get('onclick'))

            announcements.append({
                'title': title_element.text.strip() if title_element else 'No title',
                'date': date_element.text.strip() if date_element else 'No date',
                'link': link
            })
        return announcements

    def transform_link(self, onclick_attr: str):
        onclick_params = re.search(r"fnView\('(\d+)','(\d{17})',.*", onclick_attr)
        if onclick_params:
            bbs_code, bbsctt_sn = onclick_params.groups()
            return f"{self.base_url}/www/user/bbs/BD_selectBbs.do?q_bbsCode={bbs_code}&q_bbscttSn={bbsctt_sn}&q_currPage=1&q_pClCode="
        return 'No link'
