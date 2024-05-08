from playwright.async_api import async_playwright
import asyncio
import re
from app.config import get_logger

logger = get_logger()

async def scrape_tesla_specs(url: str):
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto(url, wait_until='networkidle')

        async def safe_text(selector):
            try:
                element = await page.wait_for_selector(selector, timeout=10000)
                return await element.text_content() or ''
            except Exception as e:
                logger.error(f"Error extracting text for {selector}: {str(e)}")
                return ''

        def parse_float(text: str) -> float:
            try:
                match = re.search(r'\d+(\.\d+)?', text)
                return float(match.group()) if match else 0.0
            except ValueError:
                logger.error(f"Failed to parse float from text: {text}")
                return 0.0

        def parse_int(text: str) -> int:
            try:
                match = re.search(r'\d+', text)
                return int(match.group()) if match else 0
            except ValueError:
                logger.error(f"Failed to parse int from text: {text}")
                return 0

        # Extracting the model name using the specific selector provided
        model_name = await safe_text('h2.tcl-specs-table__heading strong')

        specs = {
            "manufacturer": "Tesla",
            "model": model_name.strip(),
            "drive_type": (await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "드라이브")]/following-sibling::div/p')),
            "battery_type": (await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "배터리")]/following-sibling::div/p')),
            "range_km": parse_float(await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "주행 가능 거리")]/following-sibling::div/p')),
            "acceleration": parse_float(await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "도달시간")]/following-sibling::div/p')),
            "weight_kg": parse_float(await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "중량")]/following-sibling::div/p')),
            "storage_l": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "적재공간")]/following-sibling::div/p')).replace('L', '')),
            "wheel_size": (await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "휠")]/following-sibling::div/p')),
            "seating_capacity": parse_int(await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "좌석수")]/following-sibling::div/p')),
            "display_inch": parse_float(await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "디스플레이")]/following-sibling::div/p')),
            "minimum_ground_clearance_mm": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "최저 지상고")]/following-sibling::div/p')).replace('mm', '')),
            "width_mm": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전폭")]/following-sibling::div/p')).split(':')[-1].replace('m', '')),
            "height_mm": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전고")]/following-sibling::div/p')).replace(' mm', '')),
            "length_mm": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전장")]/following-sibling::div/p')).replace(' mm', '')),
            "track_mm_front": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "트랙 - 전면")]/following-sibling::div/p')).split(' 및')[0].replace('mm', '')),
            "track_mm_rear": parse_int((await safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "트랙 - 후면")]/following-sibling::div/p')).split(' 및')[-1].replace('mm', ''))
        }

        await browser.close()
        return specs
