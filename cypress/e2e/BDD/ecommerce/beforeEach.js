beforeEach(() => {
  cy.fixture("example").then(data => {
    this.data = data;
  });
});
