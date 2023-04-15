/**
 * add multiple product in the cart then checkout and assert product total match orginial total
 */

export class ShopPage {
  getCheckout() {
    return cy.get("a.nav-link.btn.btn-primary");
  }
  productTotal() {
    let sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($el, index, $list) => {
        const actualText = $el.text();
        var res = actualText.split(" ");
        res = res[1].trim();
        // convert string to number
        // since javaScript async need to finis promise with then
        sum = Number(sum) + Number(res);
      })
      .then(() => {
        cy.log(sum);
      });
    cy.get("h3 strong").then(element => {
      const amount = element.text();
      var res = amount.split(" ");
      var total = res[1].trim();

      expect(sum).to.equal(Number(total));
    });
  }
}

export const onShopPage = new ShopPage();
