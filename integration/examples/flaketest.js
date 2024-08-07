/// <reference types="cypress" />
describe("Test intercept", function () {
  it("Http request faking", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookretrieval");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@bookretrieval").then(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    cy.get("p").should("have.text", "Oops only 1 Book available");

    //length of the response array should be equal to rows in the table
  });
});
