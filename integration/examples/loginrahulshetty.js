/// <reference types="cypress" />

describe("My TestSuite", function () {
  it("login function ", function () {
    cy.visit("https://rahulshettyacademy.com/");
    cy.get(":nth-child(3) > .theme-btn").click();
    cy.get("#email").type("rishipriya101993@gmail.com");
    cy.get("#password").type("Magill312!@");
    cy.get("input[value='Log in']").click();
  });
});
