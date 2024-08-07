/// <reference types="Cypress" />

describe("My Second Test Suite", function () {
  it("My SecondTest case", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
    cy.get('input[type="checkbox"]').check(["option2", "option3"]);
    cy.get("select").select("option1").should("have.value", "option1");
    cy.get("#autocomplete").type("ind");
    cy.get(".ui-menu-item div").each(($e1, index, $list) => {
      if ($e1.text() === "India") {
        cy.wrap($e1).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "India");
  });
});
