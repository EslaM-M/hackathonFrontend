import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import endpoints from "../../../src/api/endpoints"
const url = "http://tag-planning-dashboard.asgard.swvl.io/";

Given("The Following Users Exist:", table => {
  cy.server();
});

Given(
  "User Open the login page with the following credential userName is {string} and Password is {string}",
  (userName, password) => {
    cy.visit(url);
    cy.get('input[name="email"]').as("addUserEmail");
    cy.get("@addUserEmail").type(userName);
    cy.get('input[name="password"]').as("addUserPassword");
    cy.get("@addUserPassword").type(password);
  }
);
Then(
  "The User Is Login successfully and I can see {string} in the page title",
  title => {
    cy.route("POST", endpoints.sign_in, "fx:auth/success");
    cy.get('button[type="submit"]').click();
    cy.get('img[alt="swvl logo"]');
  }
);

Then("The User get the following error message {string}", errorMessage => {
  cy.route({
    method: "POST",
    url: endpoints.sign_in,
    response: "fx:auth/failure",
    status: 400
  });
  cy.get('button[type="submit"]').click();
  cy.get('span[class*="Login__Error"]').contains(errorMessage);
});
