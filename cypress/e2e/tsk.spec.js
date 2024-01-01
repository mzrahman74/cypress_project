/// <reference types="cypress"/>

describe("Href visit", () => {
  it("captures href", () => {
    cy.visit("https://example.cypress.io");
    cy.get("a")
      .invoke("attr", "href")
      .then(href => {
        cy.task("setHref", href);
      });
  });

  it("visit href", () => {
    cy.task("getHref").then(href => {
      cy.visit(href);
    });
  });
});
