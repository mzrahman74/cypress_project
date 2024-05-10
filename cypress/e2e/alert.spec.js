/// <reference types="cypress"/>
describe("some random test", () => {
  it("alert test", () => {
    cy.visit("/");
    cy.get("input#alertbtn").click();
    cy.on("window:alert", str => {
      expect(str).to.equal("Hello , share this practice page and share your knowledge");
      cy.get('[value="Confirm"]').click();
    });
    cy.get('[value="Confirm').click();
    cy.on("window:confirm", str => {
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
  });
});
