import {
  verifyTasks,
  formatString,
  waitToload,
  deleteTasks,
} from "../support/util";
import * as selectors from "../fixtures/selectors";

//E2E Flow
describe("Login", () => {
  before(() => {
    cy.visit("https://www.automationexercise.com");
  });

  it("Subscription Flow and Register before checkout", () => {
    cy.get('input[type="email"][id="susbscribe_email"]').type(
      "scarlett37+3@ethereal.email"
    );
    cy.get("#subscribe").click();
    cy.contains(
      "div.alert-success.alert",
      "You have been successfully subscribed!"
    ).should("be.visible");

    cy.get('a[href="/products"]').click();
    cy.get('input[type="text"][name="search"]').type("shirt");
    cy.get("i.fa.fa-search").click();
    cy.get(
      ":nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn"
    ).click();
    cy.get(
      'button.btn.btn-success.close-modal.btn-block[data-dismiss="modal"]'
    ).click();
    cy.get(
      ":nth-child(5) > .product-image-wrapper > .choose > .nav > li > a"
    ).click();
    cy.get(":nth-child(5) > .btn").click();
    cy.get('p.text-center a[href="/view_cart"]').click({ multiple: true });
    cy.get('a[href="/product_details/12"]').invoke("text").as("productName1");
    cy.get(".col-sm-6 > .btn").click();
    cy.get(".modal-body > :nth-child(2)").click();
    cy.get('input[data-qa="signup-name"]').type("test4");
    cy.get('input[data-qa="signup-email"]').type("scarlett37+4@ethereal.email");
    cy.get('button[data-qa="signup-button"]').click();
    cy.get('input[name="title"]').eq(1).check();
    cy.get('input[data-qa="password"]').type("test123");
    cy.get('select[data-qa="days"]').select("15");
    cy.get('select[data-qa="months"]').select("12");
    cy.get('select[data-qa="years"]').select("1989");
    cy.get('input[data-qa="first_name"]').type("test3");
    cy.get('input[data-qa="last_name"]').type("test3");
    cy.get('input[data-qa="company"]').type("company1");
    cy.get('input[data-qa="address"]').type("address1");
    cy.get('input[data-qa="address2"]').type("address2");
    cy.get('input[data-qa="state"]').type("teststate");
    cy.get('input[data-qa="city"]').type("testcity");
    cy.get('[data-qa="zipcode"]').type("12222");
    cy.get('input[data-qa="mobile_number"]').type("1212121212");
    cy.get('button[data-qa="create-account"]').click();
    cy.get('a[href="/"][data-qa="continue-button"].btn.btn-primary').click();
    let productName;
    cy.get('a[href="/view_cart"]')
      .as("cartLink")
      .then(($cartLink) => {
        if ($cartLink.length > 0) {
          cy.get("@cartLink").first().click();
          cy.get("h4 > a")
            .contains("Half Sleeves Top Schiffli Detailing - Pink")
            .invoke("text")
            .as("productName2");
        }
      });
    cy.get("@productName1").then((productName1) => {
      cy.get("@productName2").then((productName2) => {
        expect(productName1).to.equal(productName2);
      });
    });
    cy.get('a[href="/delete_account"]').click();
  });
});
