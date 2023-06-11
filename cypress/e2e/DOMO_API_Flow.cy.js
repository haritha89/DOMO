import { validate } from "../support/util";


describe("api test", () => {
    let isComment = false;
    it.only("api testing", () => {
        
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
    });
})
  