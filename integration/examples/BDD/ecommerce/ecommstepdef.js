const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const homePage = new HomePage();
const productPage = new ProductPage();
Given("I open ecommerce page", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

When("I add items to cart", () => {
  homePage.getShopTab().click();
  this.data.productName.forEach(function (element) {
    cy.selectProduct(element);
  });
  productPage.checkOutButton().click();
});
And("validate the total prices", () => {
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
});
Then("Select the country submit and verify thank you alert.", () => {
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

When("I fill in the form details", function () {
  homePage.getEditBox().type(this.data.name);
  homePage.getGender().select(this.data.gender);
});
Then("Validate the form behaviours", function () {
  homePage.getTwoWayDataBinding().should("have.value", this.data.name);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  cy.get("#inlineRadio3").should("be.disabled");
});
And("select the shop page", function () {
  homePage.getShopTab().click();
});
