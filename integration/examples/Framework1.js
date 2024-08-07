/// <reference types="cypress" />

import { data } from "ospath";
import HomePage from "./pageobjects/HomePage";
import ProductPage from "./pageobjects/ProductPage";
describe("My TestSuite", function () {
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("My Testcase", function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    cy.visit(Cypress.env("url") + "/angularpractice/");
    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should("have.value", this.data.name);
    homePage.getEditBox().should("have.attr", "minlength", "2");
    cy.get("#inlineRadio3").should("be.disabled");
    //cy.pause();
    homePage.getShopTab().click();
    this.data.productName.forEach(function (element) {
      cy.selectProduct(element);
    });
    productPage.checkOutButton().click();
    var sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($e1, index, $list) => {
        const actualText = $e1.text();
        var amount = actualText.split(" ");
        amount = amount[1].trim();
        sum = Number(sum) + Number(amount);
        cy.log(amount, sum);
      })
      .then(function () {
        cy.log(sum);
      });
    cy.get(".text-right h3 strong").then(function (element) {
      const textFromElement = element.text();
      const trimmedElement = textFromElement.split(" ");
      const value = trimmedElement[1].trim();
      cy.log(value);
      expect(sum).to.equal(Number(value));
    });
    cy.contains("Checkout").click();
    cy.get("#country").type("India");
    // Cypress.config("defaultCommandTimeout", 6000);
    cy.wait(6000);
    cy.get(".suggestions > ul > li > a ").click();
    cy.get("#checkbox2").click({ force: true });
    cy.get("input[type='submit']").click();
    cy.get(".alert").then(function (element) {
      const text = element.text();
      expect(text.includes("Success")).to.be.true;
    });
  });
});
