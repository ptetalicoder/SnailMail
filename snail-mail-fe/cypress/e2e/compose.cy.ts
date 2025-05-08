/// <reference types="cypress"/>

//^Cypress entities won't be recognized without this first line^
//"Entities?" incudes stuff like describe, it, beforeEach, cy, and many more

/* TEST SUITE OVERVIEW 
   
    1) The Compose component opens when the “compose email” button is clicked 
    2) The Compose component closes if the “x” is clicked
    3) An error message appears if the user tries to send mail with missing fields
    4) An error message appears if the HTTP request fails 
    5) A success message appears and the Compose component closes following a successful email send 
    6) An error message appears if the Recipient doesn't look like a valid email address

*/

//describe() is the wrapper for the overall test suite (all our tests will be nested in here)
describe("Inbox Component Tests", () => {

    //TODO for Ben: restart laptop, change port back to expected one

    //beforeEach lets us set up functionality to run BEFORE EACH test 
    beforeEach(() => {
        //Render App.tsx (which renders our inbox component)
        cy.visit("http://localhost:5173") //your port is probably 5173
    })

     //test 1 ----------
     it("The Compose componeent open when the 'compose email' button is clicked", () => {

        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")

        //check that the inputs are empty (as expected)
        cy.get("input[name='recipient']").should("have.value", "")
        cy.get("input[name='subject']").should("have.value", "")
        cy.get("textarea[name='body']").should("have.value", "")

    })

    //test 2 ----------
    it("The Compose component closes if the 'x' button is clicked", () => {

        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")

        //find and click the 'x' button to close the component
        cy.get("button.btn-close").click()

        //Assert that the compose email component is NOT displayed - data attribute
        cy.get("[data-testid='compose-component']").should("not.exist")

    })

    //test 3 ----------
    it("An error message appears if the user tries to send mail with missing fields", () => {

        cy.intercept("POST", "http://localhost:8080/mail", {
            statusCode: 400,
            body: "Some unknown error occurred!",
        }).as("sendEmail");

        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")
        
        cy.on("window:alert", cy.stub().as("alert")) //stub the alert() so it doesn't interrupt the test

        //find and click the send email button
        cy.get("button").contains("Send").click()

    
        cy.get("@alert").should("have.been.calledWith", "Some unknown error occurred!")

    })

    //test 4 ----------
    it("An error meassage appears if the HTTP request fails", () => {

        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")

        //Stub the alert() so it doesn't interrupt the test
        cy.on("window:alert", cy.stub().as("alert"))

        
        cy.intercept("POST", "http://localhost:8080/mail", {
            statusCode: 500,
            body: {error: "Some unknown error occurred!"},
        }).as("sendEmail")

        cy.get("input[name='recipient']").type("test@snailmail.com");
        cy.get("input[name='subject']").type("Test Subject");
        cy.get("textarea[name='body']").type("Test Body");

        //find and click the send email button
        cy.get("button").contains("Send").click()

        //Assert that the alert() was called with the expected message
        cy.get("@alert").should("have.been.calledWith", undefined);

    })

    //test 5 ----------
    it("A success message appears and the Compose component closes following a successful email send", () => {

        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")

        //Stub the alert() so it doesn't interrupt the test
        cy.on("window:alert", cy.stub().as("alert"))

        
        cy.intercept("POST", "http://localhost:8080/mail", {
            statusCode: 200,
            body: {recipient: "beetle@snailmail.com"},
        }).as("sendEmail")

        cy.get("input[name='recipient']").type("beetle@snailmail.com");
        cy.get("input[name='subject']").type("Test Subject");
        cy.get("textarea[name='body']").type("Test Body");

        cy.get("button").contains("Send").click();

        cy.get("@alert").should("have.been.calledWith", "Sent Mail to: beetle@snailmail.com");

        cy.get("[data-testid='compose-component']").should("not.exist");
    })

    //test 6 ----------
    it("An error message appears if the Recipient doesn't look like a valid email address", () => {
        
        //find and click the compose email button
        cy.get("button").contains("Compose Email").click()

        //Assert that the compose email component is displayed - data attribute
        cy.get("[data-testid='compose-component']").should("exist").should("be.visible")

        //Stub the alert() so it doesn't interrupt the test
        cy.on("window:alert", cy.stub().as("alert"))

        cy.get("input[name='recipient']").type("invalid-email-address");

        cy.get("input[name='subject']").type("Test Subject");
        cy.get("textarea[name='body']").type("Test Body");

        //find and click the send email button
        cy.get("button").contains("Send").click()

        //Assert that the alert() was called with the expected message
        cy.get("@alert").should("have.been.calledWith", "Some unknown error occurred!");
        
    })

})