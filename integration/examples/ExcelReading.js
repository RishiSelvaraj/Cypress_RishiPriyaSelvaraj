/// <reference types="cypress" />
const neatCSV = require("neat-csv");
let retreivedProduct;

const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const { result } = require("lodash");
const fileexcelName =
  Cypress.config("fileServerFolder") +
  "/cypress/downloads/order-invoice_rishipriya101993.xlsx";

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
    cy.get("[routerlink*='cart']").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind");
    cy.get(".ta-results button").each(($e1, index, $list) => {
      if ($e1.text() === " India") {
        cy.wrap($e1).click();
      }
    });
    cy.get(".action__submit").click({ force: true });
    cy.wait(4000);
    cy.get(".order-summary button").contains("Excel").click();
    cy.task("excelToJsonConverter", fileexcelName).then(function (result) {
      cy.log(result);
      cy.log(result.data[1].A);
      expect(retreivedProduct).to.equal(result.data[1].B);
    });
    console.log(result);
    cy.readFile(fileexcelName).then(function (text) {
      expect(text).to.includes(retreivedProduct);
    });
  });
});
