/// <reference types="cypress" />
const neatCSV = require("neat-csv");

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
    cy.get(".order-summary button").first().click();
    cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_test12.q.csv").then(async function (text) {
      const csv = await neatCSV(text);
      console.log(csv);
      const actualProductCSV = csv[0]["Product Name"];
      expect(productName).to.equal(actualProductCSV);
      const address = csv[0].Address;
      cy.log(address);
      const price = csv[0]["Product Price"];
      cy.log(price);
    });
  });
});
