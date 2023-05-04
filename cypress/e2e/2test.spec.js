/// <reference types="cypress"/>
import example from "../fixtures/example.json";
import { onCheckoutPage } from "../support/pageObjects/CheckoutPage";
import { onHomePage } from "../support/pageObjects/HomePage";
import { onShopPage } from "../support/pageObjects/ShopPage";

describe("My test suite", () => {
  it("My first test case", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.fixture("example").then(data => {
      onHomePage.getEditBox().type(data.name);
      onHomePage.getGender().select(data.gender);
      onHomePage.getTwoWayDataBinding().should("have.value", "bob");
      onHomePage.getMinLength().should("have.attr", "minlength", "2");
      onHomePage.getEnterpreneurRadio().should("be.visible");
      onHomePage.getShopTab().click();

      data.productName.forEach(element => {
        cy.selectProduct(element);
      });
      onShopPage.getCheckout().click({ force: true });
      onShopPage.productTotal();
      onCheckoutPage.getCartCheckOut().click();
      onCheckoutPage.getLocation();
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
