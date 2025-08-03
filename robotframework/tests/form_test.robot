*** Settings ***
Documentation    フォーム入力テストのサンプル
Library           SeleniumLibrary
Suite Setup       Open Browser To Test Site
Suite Teardown    Close All Browsers

*** Variables ***
${TEST_URL}       https://demoqa.com/automation-practice-form
${FIRST_NAME}     id=firstName
${LAST_NAME}      id=lastName
${EMAIL}          id=userEmail
${PHONE}          id=userNumber
${SUBMIT_BUTTON}  id=submit

*** Test Cases ***
Fill Practice Form
    [Documentation]    デモサイトのフォームに入力するテスト
    [Tags]    form    practice
    Fill Personal Information
    Submit Form
    Verify Form Submission

Fill Form With Invalid Email
    [Documentation]    無効なメールアドレスでフォームを送信するテスト
    [Tags]    form    validation
    Fill Personal Information With Invalid Email
    Submit Form
    Verify Email Validation Error

*** Keywords ***
Open Browser To Test Site
    [Documentation]    テストサイトを開く
    Open Browser    ${TEST_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${FIRST_NAME}

Fill Personal Information
    [Documentation]    個人情報を入力する
    Input Text    ${FIRST_NAME}    John
    Input Text    ${LAST_NAME}     Doe
    Input Text    ${EMAIL}         john.doe@example.com
    Input Text    ${PHONE}         1234567890

Fill Personal Information With Invalid Email
    [Documentation]    無効なメールアドレスで個人情報を入力する
    Input Text    ${FIRST_NAME}    John
    Input Text    ${LAST_NAME}     Doe
    Input Text    ${EMAIL}         invalid-email
    Input Text    ${PHONE}         1234567890

Submit Form
    [Documentation]    フォームを送信する
    Scroll Element Into View    ${SUBMIT_BUTTON}
    Click Button    ${SUBMIT_BUTTON}

Verify Form Submission
    [Documentation]    フォーム送信の成功を検証する
    Wait Until Page Contains    Thanks for submitting the form
    Page Should Contain    Thanks for submitting the form

Verify Email Validation Error
    [Documentation]    メールアドレスのバリデーションエラーを検証する
    Wait Until Page Contains Element    css=.was-validated
    Element Should Be Visible    ${EMAIL} 