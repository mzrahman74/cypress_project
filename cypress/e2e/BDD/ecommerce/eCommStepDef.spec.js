import { Given, When, Then } from "cypress-cucumber-preprocessor";
import example from "../fixtures/example.json";
import { onCheckoutPage } from "../support/pageObjects/CheckoutPage";
import { onHomePage } from "../support/pageObjects/HomePage";
import { onShopPage } from "../support/pageObjects/ShopPage";

Given("I open Ecommerce Page", () => {
  cy.visit("https://rahulshettyacademy.com/angularpractice/");
});

// when I add items to cart

When("I add items to cart", () => {
  onHomePage.getShopTab().click();

  data.productName.forEach(element => {
    cy.selectProduct(element);
  });
  onShopPage.getCheckout().click({ force: true });
});
And("Validate the total prices", () => {
  onShopPage.productTotal();
  onCheckoutPage.getCartCheckOut().click();
});
Then("select the country submit and verify Thankyou", () => {
  onCheckoutPage.getLocation();
});

When("I fill the from details", () => {
  cy.fixture("example").then(data => {
    onHomePage.getEditBox().type(data.name);
    onHomePage.getGender().select(data.gender);
  });
});
Then("validate the forms behaviour", () => {
  onHomePage.getTwoWayDataBinding().should("have.value", "bob");
  onHomePage.getMinLength().should("have.attr", "minlength", "2");
  onHomePage.getEnterpreneurRadio().should("be.visible");
});

Then("selet the shop page", () => {
  onHomePage.getShopTab().click();
});
