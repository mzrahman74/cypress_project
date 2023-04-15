export class CheckoutPage {
  getCartCheckOut() {
    return cy.get("button.btn.btn-success");
  }
  getLocation() {
    cy.get("input#country").clear().type("Bangladesh");
    cy.contains("Bangladesh").click();
    // cy.contains("term & Conditions").click();
    // cy.get("button.btn.btn-info").click();
    cy.get('label[for="checkbox2"]').click({ force: true });

    cy.get('input[type="submit"]').click();
    cy.get("div.alert").then(msg => {
      const actualText = msg.text();
      expect(actualText.includes("Success")).to.be.true;
    });
  }
}

export const onCheckoutPage = new CheckoutPage();
