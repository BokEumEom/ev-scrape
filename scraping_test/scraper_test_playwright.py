from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=False)
    context = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = context.new_page()

    page.goto("https://twitch.tv/directory/game/Art")  # go to url
    page.wait_for_selector("div[data-target=directory-first-item]")  # wait for content to load

    parsed = []
    stream_boxes = page.locator("//div[contains(@class,'tw-tower')]/div[@data-target]")
    for box in stream_boxes.element_handles():
        parsed.append({
            "title": box.query_selector("h3").inner_text(),
            "url": box.query_selector(".tw-link").get_attribute("href"),
            "username": box.query_selector(".tw-link").inner_text(),
            "viewers": box.query_selector(".tw-media-card-stat").inner_text(),
            # tags are not always present:
            "tags": box.query_selector(".tw-tag").inner_text() if box.query_selector(".tw-tag") else None,
        })
    for video in parsed:
        print(video)