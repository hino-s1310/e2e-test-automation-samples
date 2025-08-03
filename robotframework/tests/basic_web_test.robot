*** Settings ***
Documentation    基本的なWebテストのサンプル
Library           SeleniumLibrary
Suite Setup       Open Browser To Google
Suite Teardown    Close All Browsers

*** Variables ***
${GOOGLE_URL}     https://www.google.com
${SEARCH_BOX}     name=q
${SEARCH_BUTTON}  name=btnK
${SEARCH_TERM}    Robot Framework

*** Test Cases ***
Google Search Test
    [Documentation]    Googleで検索を実行するテスト
    [Tags]    smoke    search
    Input Search Term    ${SEARCH_TERM}
    Click Search Button
    Verify Search Results    ${SEARCH_TERM}

Search Without Clicking Button
    [Documentation]    検索ボタンをクリックせずにEnterキーで検索するテスト
    [Tags]    search    keyboard
    Input Search Term    ${SEARCH_TERM}
    Press Keys    ${SEARCH_BOX}    RETURN
    Verify Search Results    ${SEARCH_TERM}

*** Keywords ***
Open Browser To Google
    [Documentation]    Googleのホームページを開く
    Open Browser    ${GOOGLE_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${SEARCH_BOX}

Input Search Term
    [Arguments]    ${term}
    [Documentation]    検索語を入力する
    Input Text    ${SEARCH_BOX}    ${term}
    Wait Until Element Is Visible    ${SEARCH_BUTTON}

Click Search Button
    [Documentation]    検索ボタンをクリックする
    Click Button    ${SEARCH_BUTTON}
    Wait Until Page Contains Element    id=search

Verify Search Results
    [Arguments]    ${expected_term}
    [Documentation]    検索結果を検証する
    Wait Until Page Contains    ${expected_term}
    Page Should Contain    ${expected_term} 