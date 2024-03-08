/// <reference types="cypress"/>
/// <reference types="cypress-iframe"/>
import "cypress-iframe";

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
    cy.iframe().get(".blinkingText").scrollIntoView().should("be.visible");
    //cy.iframe().contains("Limited offer - Get Any 4 Courses for FREE by opting into Platinum Mentorship Subscription").should("be.visible");
    cy.iframe()
      .get("#courses-iframe")
      .should($len => {
        expect($len).to.have.length(1);
      });
  });

  it("Alert message", () => {
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
  });

  it("scan from table and find python course and price ", () => {
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
  });

  it("Scan table for selenium", () => {
    cy.visit("/");
    cy.get("tr td:nth-child(2)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("Selenium")) {
        cy.get("tr td:nth-child(1)")
          .eq(index)
          .then(author => {
            const authorName = author.text();
            expect(authorName).to.equal("Rahul Shetty");
          });
      }
    });
  });

  it("scan from table find Resume and price", () => {
    cy.visit("/");
    cy.get("tr td:nth-child(2)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("JMETER")) {
        cy.get("tr td:nth-child(1)")
          .eq(index)
          .then(author => {
            const authorName = author.text();
            expect(authorName).to.equal("Rahul Shetty");
          });
      }
    });
  });

  it("scan from table and find Jack for engineer instructor", () => {
    cy.visit("/");
    cy.contains("Web Table Fixed header").should("be.visible");
    cy.get("tr td:nth-child(1)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("Jack")) {
        cy.get("tr td:nth-child(1)")
          .eq(index)
          .then(author => {
            const authorName = author.text();
            expect(authorName).to.include("Jack");
          });
      }
    });
  });

  it("scan from table and find Ivory for Receptionist name", () => {
    cy.visit("/");
    cy.contains("Web Table Fixed header").should("be.visible");
    cy.get("tr td:nth-child(1)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("Ivory")) {
        cy.get("tr td:nth-child(1)")
          .eq(index)
          .then(name => {
            const nameText = name.text();
            expect(nameText).to.be.equal("Ivory");
          });
      }
    });
  });

  it("scan from table and find Smith Cricketer city", () => {
    cy.visit("/");
    cy.get("tr td:nth-child(1)").each((el, index, list) => {
      const text = el.text();
      if (text.includes("Smith")) {
        cy.get("tr td:nth-child(3)")
          .eq(index)
          .then(city => {
            const cityName = city.text();
            expect(cityName).to.include("Delhi");
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
