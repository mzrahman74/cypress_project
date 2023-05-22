export class ChildWindowPage {
  getChildWindowAndBack() {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/windows"]').click();
    cy.get('a[href="/windows/new"]').invoke("removeAttr", "target").click();
    cy.url().should("include", "new");
    cy.go("back");
    cy.url().should("contain", "https://the-internet.herokuapp.com/windows");
  }
}
export const onChildWindowPage = new ChildWindowPage();
