/// <reference types="cypress" />

context("Actions", () => {
  it("trigger a range input (slider)", () => {
    cy.visit("https://example.cypress.io/commands/actions");
    cy.get(".trigger-input-range").invoke("val", 100).trigger("change").get("input[type=range]").siblings("p").should("have.text", "100");
  });
  it(".as() - alias a route for later use", () => {
    cy.visit("https://example.cypress.io/commands/aliasing");
    cy.intercept("GET", "**/comments/*").as("getComment");
    cy.get("button.network-btn").click();
    cy.wait("@getComment").its("response.statusCode").should("eq", 200);
  });
  it("cy.getCookies() - get browser cookies", () => {
    cy.visit("https://example.cypress.io/commands/cookies");
    cy.get("#getCookies .set-a-cookie").click();
    cy.getCookies()
      .should("have.length", 1)
      .should(cookies => {
        expect(cookies[0]).to.have.property("name", "token");
        expect(cookies[0]).to.have.property("value", "123ABC");
      });
    cy.clearCookies();
    cy.getCookies().should("be.empty");
  });
  it("cy.request() - pass result to the second request", () => {
    cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
      .its("body")
      .its("0")
      .then(user => {
        expect(user).property("id").to.be.a("number");

        cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
          userId: user.id,
          title: "Cypress Test Runner",
          body: "Fast, easy and reliable testing for anything that runs in a browser."
        });
      })
      .then(response => {
        expect(response).property("status").to.equal(201);
        expect(response).property("body").to.contain({
          title: "Cypress Test Runner"
        });
        expect(response.body).property("id").to.be.a("number").and.to.be.gt(100);
        expect(response.body).property("userId").to.be.a("number");
      });
  });
});
