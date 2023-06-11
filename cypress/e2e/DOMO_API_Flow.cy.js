import { validate } from "../support/util";

// Validate API test for Domo

describe("api test", () => {
    let isComment = false;
    it ("API testing", () => {
        
        const expectedResponse = {
            token_type: "Bearer",
            expires_in: "28800",
            mfa_authentication_required: false,
            mfa_setup_required: false,
    
          };

      cy.request({
        method: "POST",
        url: "https://api.signableapi.com/login",
        body: {
          email: "qa.recruitment@wearedomo.com",
          password: "Password1",
        },
      }).then((response) => {
  
        expect(response.status).to.equal(200); // Assert the response status code
        
        // Validate response body
  
        const responseBody = response.body;
        validate(responseBody.data, expectedResponse);
      });

      //Validation for Incorrect request body API 

      cy.request({
        method: "POST",
        url: "https://api.signableapi.com/login",
        body: {
          email: "testtt",
          password: "Password1",
        },
        failOnStatusCode: false, // Include this line to prevent Cypress from failing on non-2xx status codes
      }).then((response) => {
    
        expect(response.status).to.equal(400); // Assert the response status code as 400 for incorrect request body
        
    });

      //Validation for Incorrect API Login URL 

          cy.request({
            method: "POST",
            url: "https://api.signableapi.com/log",
            body: {
              email: "testtt",
              password: "Password1",
            },
            failOnStatusCode: false, // Include this line to prevent Cypress from failing on non-2xx status codes
          }).then((response) => {
        
            expect(response.status).to.equal(404); // Assert the response status code as 400 for incorrect request body
            
        });
})
})

  