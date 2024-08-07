/// <reference types="cypress" />
const neatCSV = require("neat-csv");
let retreivedProduct;
describe("My TestSuite", function () {
  it("AWT session function ", async function () {
    cy.APILogin().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get(".card-body b")
      .eq(1)
      .then(function (ele) {
        retreivedProduct = ele.text();
      });
    cy.get("[routerlink*='cart']").click({ force: true });
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind");
    cy.get(".ta-results button").each(($e1, index, $list) => {
      if ($e1.text() === " India") {
        cy.wrap($e1).click();
      }
    });
    cy.get(".action__submit").click({ force: true });
    cy.wait(4000);
    cy.get(".order-summary button")
      .contains("Click To Download Order Details in CSV")
      .click();
    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_rishipriya101993.csv"
    ).then(async function (text) {
      const csv = await neatCSV(text);
      console.log(csv);
      const actualProductcsv = csv[0]["Product Name"];
      expect(retreivedProduct).to.equal(actualProductcsv);
    });
  });
});
