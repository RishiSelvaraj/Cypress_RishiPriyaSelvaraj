/// <reference types="Cypress" />
describe("My Suite", function () {
  it("My TC", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#opentab").then(function (e1) {
      const url = e1.prop("href");
      cy.visit(url);
      cy.origin(url, () => {
        cy.get("div.sub-menu-bar a[href*='about.html']").click();
      });
    });
  });
});
