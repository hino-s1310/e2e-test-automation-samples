*** Settings ***
Documentation    共通のキーワードと設定
Library           SeleniumLibrary

*** Variables ***
${BROWSER}        chrome
${TIMEOUT}        10s
${IMPLICIT_WAIT}  5s

*** Keywords ***
Setup Browser
    [Documentation]    ブラウザの基本設定を行う
    Set Selenium Speed    0.5s
    Set Selenium Timeout    ${TIMEOUT}
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

Take Screenshot On Failure
    [Documentation]    テスト失敗時にスクリーンショットを撮影する
    Run Keyword If Test Failed    Capture Page Screenshot

Wait For Element And Click
    [Arguments]    ${locator}
    [Documentation]    要素が表示されるまで待機してからクリックする
    Wait Until Element Is Visible    ${locator}
    Click Element    ${locator}

Wait For Element And Input Text
    [Arguments]    ${locator}    ${text}
    [Documentation]    要素が表示されるまで待機してからテキストを入力する
    Wait Until Element Is Visible    ${locator}
    Input Text    ${locator}    ${text}

Verify Element Contains Text
    [Arguments]    ${locator}    ${expected_text}
    [Documentation]    要素に期待されるテキストが含まれていることを検証する
    Wait Until Element Contains    ${locator}    ${expected_text}
    Element Should Contain    ${locator}    ${expected_text}

Scroll To Element
    [Arguments]    ${locator}
    [Documentation]    要素までスクロールする
    Scroll Element Into View    ${locator}

Clear And Input Text
    [Arguments]    ${locator}    ${text}
    [Documentation]    要素をクリアしてからテキストを入力する
    Wait Until Element Is Visible    ${locator}
    Clear Element Text    ${locator}
    Input Text    ${locator}    ${text} 