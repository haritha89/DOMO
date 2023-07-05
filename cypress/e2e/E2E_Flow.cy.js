import {
  verifyTasks,
  formatString,
  waitToload,
  deleteTasks,
} from "../support/util";
import * as selectors from "../fixtures/selectors";

//E2E Flow
describe("Login", () => {
  let isComment = false;
  const base_url = Cypress.env("BASE_URL");

  before(() => {
    cy.visit(`${base_url}`);
  });

  it("Login with correct credentials and logout ", () => {
    const waittime = 2000
    cy.get(selectors.signUpOrLogin).click();
    cy.get(selectors.loginEmail).type("scarlett37+0@ethereal.email");
    cy.get(selectors.loginPassword).type("UCrVJq29Hx4MaPSdnP");
    cy.get(selectors.loginButton).click();
    waitToload(waittime)
    cy.get('a[href="/logout"]').click();
  });

  it("Login with incorrect credentials ", () => {
    const expectedText = "Your email or password is incorrect!";
    cy.get(selectors.signUpOrLogin).click();
    cy.get(selectors.loginEmail).type("sc!444l@testtt.com");
    cy.get(selectors.loginPassword).type("UCrVJq29Hx4MnP");
    cy.get(selectors.loginButton).click();
    cy.get(selectors.invalidLogin).should("have.text", expectedText);
  });

  it.only("Contact Us Form ", () => {
    const expectedText = "Success! Your details have been submitted successfully.";
    let assertedValue;
    cy.get(selectors.contactUsLink).click();
    cy.get(selectors.contactName).type("test0");
    cy.get(selectors.contactEmail).type("scarlett37+0@ethereal.email");
    cy.get(selectors.contactSubject).type("query");
    cy.get(selectors.contactMessage).type("message 1");
    cy.get(selectors.contactSubmit).click();
    cy.get(selectors.contactsubmitAlert).should("be.visible").and(($div) => {
      assertedValue = $div.text().trim();
      expect(assertedValue).to.eq(expectedText);
    });
  });

  it("Product Functionality by Category", () => {
    cy.get('a[href="/login"] i.fa.fa-lock').click();
    cy.get('input[data-qa="login-email"]').type("scarlett37+0@ethereal.email");
    cy.get('input[data-qa="login-password"]').type("UCrVJq29Hx4MaPSdnP");
    cy.get('button[data-qa="login-button"]').click();
    cy.get('a[href="/products"]').click();
    cy.get('a[data-toggle="collapse"][href="#Women"]').click();
    cy.get('a[href^="/category_products"]').eq(1).click();
    cy.get('a[href="/product_details/7"]').eq(0).click();

    let quantityValue;

    cy.get('input[type="number"][name="quantity"]').then(($input) => {
      quantityValue = $input.val();
    });

    cy.get("button.btn.btn-default.cart").click();
    cy.get('p.text-center a[href="/view_cart"]').click({ multiple: true });

    cy.get("button.disabled")
      .invoke("text")
      .then((buttonText) => {
        expect(buttonText.trim()).to.equal(quantityValue);
      });
    cy.get('a.cart_quantity_delete[data-product-id="7"]').click();
  });

  it("Product Functionality by Brands and review message ", () => {
    cy.get('a[href="/products"]').click();
    cy.get("div.brands_products").find("a").eq(2).click();
    //cy.get(':nth-child(7) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('a[href="/product_details/41"]').click();

    cy.get("input#name").type("test0");

    cy.get("input#email").type("scarlett37+0@ethereal.email");

    cy.get('textarea[name="review"]#review').type("Review Test");

    cy.get("button#button-review.btn.btn-default.pull-right").click();
    cy.contains("span", "Thank you for your review.").should("be.visible");
  });

  it("Product Functionality by Search Product and order flow", () => {
    cy.get('a[href="/products"]').click();
    cy.get('input[type="text"][name="search"]').type("top");
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
    cy.get(".col-sm-6 > .btn").click();
    cy.get(".modal-body > :nth-child(2)").click();
    cy.get('input[data-qa="login-email"]').type("scarlett37+1@ethereal.email");
    cy.get('input[data-qa="login-password"]').type("UCrVJq29Hx4MaPSdnP");
    cy.get('button[data-qa="login-button"]').click();
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.contains("a.btn.btn-default.check_out", "Proceed To Checkout").click();
    cy.get('textarea.form-control[name="message"]').type("comment test");
    cy.get('a.btn.btn-default.check_out[href="/payment"]').click();
    cy.get('[data-qa="name-on-card"]').type("test111");
    cy.get('[data-qa="card-number"]').type("333333333");
    cy.get('[data-qa="cvc"]').type("019");
    cy.get('[data-qa="expiry-month"]').type("01");
    cy.get('[data-qa="expiry-year"]').type("2026");
    cy.get('[data-qa="pay-button"]').click();
    cy.get('p[style="font-size: 20px; font-family: garamond;"]').should(
      "have.text",
      "Congratulations! Your order has been confirmed!"
    );
    cy.wait(2000);

    const fs = require("fs");
    const path = require("path");

    const verifyFile = (fileName) => {
      const filePath = "cypress/downloads/" + fileName;

      fetch(filePath)
        .then((response) => {
          if (response.ok) {
            console.log("File exists");
          } else {
            console.log("File does not exist");
          }
        })
        .catch((error) => {
          console.log("An error occurred while fetching the file:", error);
        });
    };
  });

  it("Registration Flow Remove cart and delete account", () => {
    cy.get('a[href="/login"] i.fa.fa-lock').click();
    cy.get('input[data-qa="signup-name"]').type("test3");
    cy.get('input[data-qa="signup-email"]').type("scarlett37+3@ethereal.email");
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
    cy.contains("b", "Account Created!").should("exist");
    cy.contains(
      'p[style="font-size: 20px; font-family: garamond;"]',
      "Congratulations! Your new account has been successfully created!"
    ).should("exist");
    cy.contains(
      'p[style="font-size: 20px; font-family: garamond;"]',
      "You can now take advantage of member privileges to enhance your online shopping experience with us."
    ).should("exist");
    cy.get('a[href="/products"]').click();
    cy.get('a[data-toggle="collapse"][href="#Kids"]').click();
    cy.get('a[href="/category_products/4"]').eq(0).click();
    cy.get('a[href="/product_details/23"]').click();
    cy.get(":nth-child(5) > .btn").click({ multiple: true });
    cy.get(
      'button.btn.btn-success.close-modal.btn-block[data-dismiss="modal"]'
    ).click();
    cy.get('a[href="/view_cart"]')
      .as("cartLink")
      .then(($cartLink) => {
        if ($cartLink.length > 0) {
          cy.get("@cartLink").first().click();
        }
      });
    cy.get("#product-23 > .cart_delete > .cart_quantity_delete > .fa")
      .eq(0)
      .click();
    cy.get("#empty_cart")
      .invoke("text")
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(
          "Cart is empty! Click here to buy products."
        );
      });

    cy.get('a[href="/delete_account"]').click();
    cy.get("div.col-sm-9.col-sm-offset-1")
      .find("b")
      .should("have.text", "Account Deleted!");

    cy.contains(
      'p[style="font-size: 20px; font-family: garamond;"]',
      "Your account has been permanently deleted!"
    ).should("exist");
    cy.contains(
      "You can create new account to take advantage of member privileges to enhance your online shopping experience with us."
    ).should("have.attr", "style", "font-size: 20px; font-family: garamond;");
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
