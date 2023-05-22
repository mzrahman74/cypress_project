/// <reference types="cypress"/>
import example from "../fixtures/example.json";
import { onCheckoutPage } from "../support/pageObjects/CheckoutPage";
import { onChildWindowPage } from "../support/pageObjects/ChildWindowPage";
import { onHomePage } from "../support/pageObjects/HomePage";
import { onShopPage } from "../support/pageObjects/ShopPage";
import { onTablePage } from "../support/pageObjects/TablePage";

describe("My test suite", () => {
  it("Purchased product", () => {
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
    onChildWindowPage.getChildWindowAndBack();
  });
  it("scan the table then select the python and price", () => {
    onTablePage.scanTableRow();
  });
});
