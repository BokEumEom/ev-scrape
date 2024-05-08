from playwright.sync_api import sync_playwright

def scrape_tesla_with_playwright():
    with sync_playwright() as p:
        # Firefox 브라우저 인스턴스 생성
        browser = p.firefox.launch(headless=True)
        page = browser.new_page()
        
        # 웹 페이지 접속
        page.goto('https://www.tesla.com/ko_kr/model3-performance', wait_until='networkidle')

        # 데이터 추출을 위한 함수 정의
        def safe_text(selector):
            """ 페이지에 요소가 나타날 때까지 대기하고 안전하게 텍스트를 추출합니다. """
            try:
                # 요소가 로드될 때까지 기다림
                element = page.wait_for_selector(selector, timeout=10000)  # 10초 타임아웃
                return element.text_content().strip() if element else 'Not available'
            except Exception as e:
                return f'Error: {str(e)}'

        # 각 항목에 대한 선택자 업데이트
        specs = {
            "Drive": {
                "Battery": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "배터리")]/following-sibling::div/p'),
                "Range": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "주행 가능 거리")]/following-sibling::div/p'),
                "Acceleration": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "도달시간")]/following-sibling::div/p'),
                "Drive": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "드라이브")]/following-sibling::div/p')
            },
            "Dimensions": {
                "Weight": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "중량")]/following-sibling::div/p'),
                "Cargo Volume": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "적재공간")]/following-sibling::div/p'),
                "Wheel Size": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "휠")]/following-sibling::div/p'),
                "Seating Capacity": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "좌석수")]/following-sibling::div/p'),
                "Display Size": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "디스플레이")]/following-sibling::div/p'),
                "Ground Clearance": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "최저 지상고")]/following-sibling::div/p'),
                "Width with Mirrors": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전폭")]/following-sibling::div/p'),
                "Height": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전고")]/following-sibling::div/p'),
                "Length": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "전장")]/following-sibling::div/p'),
                "Track Front and Rear": safe_text('.tcl-specs-table >> xpath=//h6[contains(text(), "트랙 - 전면 및 후면")]/following-sibling::div/p')
            }
        }
        
        # 브라우저 종료
        browser.close()
        return specs

# 함수 호출 및 결과 확인
tesla_specs = scrape_tesla_with_playwright()
print(tesla_specs)
