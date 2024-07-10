/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

import "cypress-iframe";

describe("suite test", () => {
  it("iframe test", () => {
    cy.visit("/");
    cy.frameLoaded("#coureses-iframe");
    cy.iframe().find('a[href*="mentorship"]').eq(0).click();
    cy.iframe().get(".blinkingText").scrollIntoView().should("be.visible");
    cy.iframe()
      .get("#courses-iframe")
      .should(len => {
        expect(len).to.have.length(1);
      });
  });

  it.only("Alert message", () => {
    cy.visit("/");
    cy.get("#alertbtn").click();
    cy.on("window:alert", str => {
      expect(str).to.equal("Hello , share this practice page and share your knowledge");
    });
  });
});
