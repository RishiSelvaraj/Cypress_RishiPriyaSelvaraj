/// <reference types="cypress" />
describe("Test intercept", function () {
  it("Http request faking", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => (
        (req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=rishi"),
        req.continue((res) => {
          // expect(res.statusCode).to.equal(403);
        })
      )
    ).as("dummyurl");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@dummyurl");
  });
});
