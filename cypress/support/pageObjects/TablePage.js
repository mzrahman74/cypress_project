export class TablePage {
  scanTableRow() {
    cy.visit("/");
    cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Python")) {
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(price => {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    });
  }
  scanSqlRow() {
    cy.visit("/");
    cy.get("tr td:nth-child(2)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("SQL")) {
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(price => {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    });
  }
}

export const onTablePage = new TablePage();
