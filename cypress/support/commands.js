// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("selectProduct", prodectName => {
  cy.get("h4.card-title").each(($el, index, $list) => {
    if ($el.text().includes(prodectName)) {
      cy.get("button.btn.btn-info").eq(index).click();
    }
  });
});
Cypress.Commands.add("LoginAPI", () => {
  cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", { userEmail: "test12.q@gmail.com", userPassword: "Bsky1265" }).then(function (response) {
    expect(response.status).to.eq(200);
    Cypress.env("token", response.body.token);
  });
});
