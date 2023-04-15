export class HomePage {
  getEditBox() {
    return cy.get('input[name="name"]:nth-child(2)');
  }
  getGender() {
    return cy.get("select");
  }
  getTwoWayDataBinding() {
    return cy.get(":nth-child(4) > .ng-untouched");
  }
  getMinLength() {
    return cy.get('input[name="name"]:nth-child(2)');
  }
  getEnterpreneurRadio() {
    return cy.get("#inlineRadio3");
  }
  getShopTab() {
    return cy.get("a[href*='shop']");
  }
}

export const onHomePage = new HomePage();
