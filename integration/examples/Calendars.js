/// <reference types="Cypress" />

describe("My TestSuite", function () {
  it("My Testcase", function () {
    const date = "13";
    const monthNumber = "5";
    const year = "2027";
    const expList = [monthNumber, date, year];
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.get(".react-date-picker__calendar-button__icon").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months__month")
      .eq(Number(monthNumber) - 1)
      .click();
    cy.contains("abbr", date).click();
    cy.get(".react-date-picker__inputGroup__input").each(($e1, index) => {
      cy.wrap($e1).invoke("val").should("eq", expList[index]);
    });
  });
});
