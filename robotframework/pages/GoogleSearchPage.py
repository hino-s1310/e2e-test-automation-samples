from robot.api import logger
from SeleniumLibrary import SeleniumLibrary
from robot.libraries.BuiltIn import BuiltIn

class GoogleSearchPage:
    """Google検索ページのページオブジェクトクラス"""
    
    def __init__(self):
        self.selenium = BuiltIn().get_library_instance('SeleniumLibrary')
        self.search_box = "name=q"
        self.search_button = "name=btnK"
        self.search_results = "id=search"
        
    def navigate_to_google(self):
        """Googleのホームページに移動する"""
        self.selenium.go_to("https://www.google.com")
        self.selenium.maximize_browser_window()
        self.selenium.wait_until_page_contains_element(self.search_box)
        logger.info("Googleのホームページに移動しました")
        
    def input_search_term(self, search_term):
        """検索語を入力する"""
        self.selenium.input_text(self.search_box, search_term)
        self.selenium.wait_until_element_is_visible(self.search_button)
        logger.info(f"検索語 '{search_term}' を入力しました")
        
    def click_search_button(self):
        """検索ボタンをクリックする"""
        self.selenium.click_button(self.search_button)
        self.selenium.wait_until_page_contains_element(self.search_results)
        logger.info("検索ボタンをクリックしました")
        
    def press_enter_to_search(self):
        """Enterキーを押して検索する"""
        self.selenium.press_keys(self.search_box, "RETURN")
        self.selenium.wait_until_page_contains_element(self.search_results)
        logger.info("Enterキーを押して検索しました")
        
    def verify_search_results(self, expected_term):
        """検索結果を検証する"""
        self.selenium.wait_until_page_contains(expected_term)
        self.selenium.page_should_contain(expected_term)
        logger.info(f"検索結果に '{expected_term}' が含まれていることを確認しました")
        
    def get_page_title(self):
        """ページタイトルを取得する"""
        title = self.selenium.get_title()
        logger.info(f"ページタイトル: {title}")
        return title 