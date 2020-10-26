Feature: User Login

  I want to login  to the planning Dashboard
  Background:
    Given The Following Users Exist:
      | userName               | Password  |
      | eslam.mostafa@swvl.com | 1234567ES |
      | hisham.zahran@swvl.com | 1234567ES |

  Scenario: User Open the Login Page and add valid credential
    Given User Open the login page with the following credential userName is "eslam.mostafa@swvl.com" and Password is "1234567ES"
    Then The User Is Login successfully and I can see "city" in the page title

  Scenario: User Open the Login Page and add inValid credential
    Given User Open the login page with the following credential userName is "eslam.mostafa@swvl.com" and Password is "1234567ESSS"
    Then The User get the following error message "Incorrect email or password"