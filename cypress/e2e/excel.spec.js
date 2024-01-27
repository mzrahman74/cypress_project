/// <reference types="cypress" />
let productName;
describe("JWT Session", () => {
  it("is logged in through local storage", async () => {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        }
      });
    });
    cy.get(".card-body b")
      .eq(1)
      .then(ele => {
        productName = ele.text();
      });
    cy.get(".card-body button:last-child").eq(1).click();
    cy.get("[routerlink*=cart]").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind");
    cy.get(".ta-results button").each(($el, index, $list) => {
      const text = $el.text().trim();
      if (text.includes("Indonesia")) {
        cy.wrap($el).click();
      }
    });
    cy.get(".action__submit").click();
    cy.wait(2000);
    cy.get(".order-summary button").contains("Excel").click();
    const filePath = Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_test12.q.xlsx";
    cy.task("excelToJsonConverter", filePath).then(function (result) {
      console.log(result);
      console.log(result.data[1].A);
      expect(productName).to.equal(result.data[1].B);
    });
    cy.readFile(filePath).then(text => {
      expect(text).to.include(productName);
    });

    // Browser (engine) - Js code  -> client side environment (front) - cypress
    // Node (engine) - Js code -> Back end applications/environment
    // Accessing files - fs, databasesaccess
    // Task(file, db) -> config.js
  });
});
