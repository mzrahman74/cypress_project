/// <reference types="cypress"/>

describe("api test with request", () => {
  it("api test", () => {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation with Java",
      isbn: "bcdsss",
      aisle: "22s7",
      author: "Robin Smith"
    }).then(response => {
      expect(response.body).to.have.property("Msg", "successfully added");
      expect(response.status).to.eq(200);
    });
  });
  it("api test with post", () => {
    cy.request("POST", "https://reqres.in/api/users", {
      name: "morpheus",
      job: "leader"
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("job", "leader");
      cy.log(response);
    });
  });
  it("api get call", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("total", 12);
    });
  });
  it.only("api test single user", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then(response => {
      expect(response.status).to.eql(200);
      expect(response.body.data).to.have.property("email", "janet.weaver@reqres.in");
    });
  });
});
