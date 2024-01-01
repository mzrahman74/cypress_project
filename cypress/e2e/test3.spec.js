/// <reference types="cypress"/>
describe("Suite one", () => {
  it("child window open", () => {
    cy.visit("/");
    cy.get("#opentab").then(el => {
      const url = el.prop("href");
      cy.log(url);
      cy.visit(url);
      cy.wait(3000);
    });
  });

  it("child window 2nd test with target attribute", () => {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/windows"]').click();
    cy.get('a[href="/windows/new"]').invoke("removeAttr", "target").click();
    cy.url().should("include", "new");
    cy.go("back");
    cy.url().should("contain", "https://the-internet.herokuapp.com/windows");
  });
});
