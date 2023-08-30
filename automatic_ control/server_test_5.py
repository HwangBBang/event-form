from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By  # 어떤 방식으로 찾을지
from selenium.webdriver.common.keys import Keys  # 키보드 입력을 위한 모듈
import time

options = Options()


user_agent = 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'

options.add_argument(f'user-agent={user_agent}')  # user_agent 변경 옵션
options.add_argument('incognito')  # 시크릿모드 옵션
options.add_experimental_option('detach', True)  # 자동 꺼짐 방지 옵션
options.add_argument('window-size=300,300')  # 화면 300x300 옵션
options.add_experimental_option(
    'excludeSwitches', ['enable-automation'])  # 상단 자동화 제어 메시지 제거 옵션


for _ in range(5):

    driver_ = webdriver.Chrome(options=options)
    driver_.set_window_position(0, 400)
    url = 'https://event.jisub.kim/events/EwNxMVDl1VtzVumd8ax8'
    driver_.get(url)
    time.sleep(1)

    driver_.find_element(By.TAG_NAME, 'body').send_keys(
        Keys.TAB, Keys.ENTER)
    time.sleep(1)

    for _ in range(3):
        driver_.find_element(By.TAG_NAME, 'body').send_keys(Keys.TAB, "TEST_5")
        time.sleep(0.5)

    driver_.find_element(By.TAG_NAME, 'body').send_keys(
        Keys.TAB, Keys.ENTER)
    time.sleep(1)

    for _ in range(1):
        driver_.find_element(By.TAG_NAME, 'body').send_keys(Keys.TAB, "TEST_5")
        time.sleep(0.5)
    driver_.find_element(By.TAG_NAME, 'body').send_keys(
        Keys.TAB, Keys.ENTER)
    time.sleep(2)
    driver_.quit()
