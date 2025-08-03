*** Settings ***
Documentation    ページオブジェクトパターンを使用したテスト
Library           SeleniumLibrary
Library           ../pages/GoogleSearchPage.py
Suite Setup       Initialize Page Object
Suite Teardown    Close All Browsers

*** Variables ***
${SEARCH_TERM}    Robot Framework Selenium

*** Test Cases ***
Search Using Page Object
    [Documentation]    ページオブジェクトを使用したGoogle検索テスト
    [Tags]    page_object    search
    Navigate To Google
    Input Search Term    ${SEARCH_TERM}
    Click Search Button
    Verify Search Results    ${SEARCH_TERM}

Search Using Enter Key With Page Object
    [Documentation]    ページオブジェクトを使用したEnterキー検索テスト
    [Tags]    page_object    search    keyboard
    Navigate To Google
    Input Search Term    ${SEARCH_TERM}
    Press Enter To Search
    Verify Search Results    ${SEARCH_TERM}

Get Page Title Test
    [Documentation]    ページタイトルを取得するテスト
    [Tags]    page_object    title
    Navigate To Google
    ${title}=    Get Page Title
    Should Contain    ${title}    Google

*** Keywords ***
Initialize Page Object
    [Documentation]    ページオブジェクトを初期化する
    ${google_page}=    GoogleSearchPage
    Set Suite Variable    ${google_page}

Navigate To Google
    [Documentation]    Googleのホームページに移動する
    ${google_page}.navigate_to_google

Input Search Term
    [Arguments]    ${term}
    [Documentation]    検索語を入力する
    ${google_page}.input_search_term    ${term}

Click Search Button
    [Documentation]    検索ボタンをクリックする
    ${google_page}.click_search_button

Press Enter To Search
    [Documentation]    Enterキーを押して検索する
    ${google_page}.press_enter_to_search

Verify Search Results
    [Arguments]    ${expected_term}
    [Documentation]    検索結果を検証する
    ${google_page}.verify_search_results    ${expected_term}

Get Page Title
    [Documentation]    ページタイトルを取得する
    ${title}=    ${google_page}.get_page_title
    [Return]    ${title} 