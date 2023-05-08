/// <reference types="cypress"/>
/// <reference types="cypress-iframe"/>
import "cypress-iframe";
import { curry } from "cypress/types/lodash";
/**
 * cypress won't support child window, just go to the child window url
 */

describe("My second test suite", () => {
  it("Child window one ", () => {
    cy.visit("/");
    cy.get("#opentab").then(el => {
      const url = el.prop("href");
      cy.log(url);
      cy.visit(url);
    });
  });
  it("Child window two", () => {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/windows"]').click();
    cy.get('a[href="/windows/new"]').invoke("removeAttr", "target").click();
    cy.url().should("include", "new");
    cy.go("back");
    cy.url().should("contain", "https://the-internet.herokuapp.com/windows");
  });

  it("iFrame test", () => {
    cy.visit("/");
    cy.frameLoaded("#courses-iframe");
    cy.iframe().find('a[href*="mentorship"]').eq(0).click();
    cy.iframe().contains("Limited offer - Get Any 4 Courses for FREE by opting into Platinum Mentorship Subscription").should("be.visible");
    cy.iframe().find('h1[class*="pricing-title"]').should("have.length", 2);
  });

  it("Alert &  child window with target attr", () => {
    cy.visit("/");
    cy.get("#alertbtn").click();
    cy.on("window:alert", str => {
      expect(str).to.equal("Hello , share this practice page and share your knowledge");
      cy.get('[value="Confirm"]').click();
    });
    cy.get('[value="Confirm"]').click();
    cy.on("window:confirm", str => {
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
    cy.get("#opentab").invoke("removeAttr", "target").click();
    cy.url().should("include", "rahulshettyacademy");
    cy.go("back");
    cy.url().should("contain", "https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("scan from table", () => {
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
  });
  it("mouse over", () => {
    cy.visit("/");
    cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Top").click();
    cy.url().should("include", "top");
  });
  it("Force true hidden element", () => {
    cy.visit("/");
    cy.contains("Top").click({ force: true });
    cy.url().should("include", "top");
  });
});
