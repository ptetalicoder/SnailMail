/// <reference types="cypress"/>

//^Cypress entities won't be recognized without this first line^
//"Entities?" incudes stuff like describe, it, beforeEach, cy, and many more

/* TEST SUITE OVERVIEW 
   
    1) Check that a real, successful GET request to the backend works as expected
    2) Check that a real, successful GET request to the backend works as expected when there is no mail
    3) Check that a real, failed GET request is handled as expected
    4) Check that a fake GET inbox request (with mock data) to the backend works as expected
    5)

*/

//describe() is the wrapper for the overall test suite (all our tests will be nested in here)
describe("Inbox Component Tests", () => {

    //TODO for Ben: restart laptop, change port back to expected one

    //beforeEach lets us set up functionality to run BEFORE EACH test 
    beforeEach(() => {
        //Render App.tsx (which renders our inbox component)
        cy.visit("http://localhost:5176") //your port is probably 5173
    })

    //test 1-------------
    it("Fetches and displays the inbox from the backend", () => {

        //Extract the HTTP response when it comes in, so we can run tests on it
        //note the alias defined in .as()
        cy.intercept("GET", "http://localhost:8080/mail").as("getInbox")

        //make sure the GET request came back, and its status code is 200
        cy.wait("@getInbox").its("response.statusCode").should("eq", 200)

        //check that the inbox elements display as expected 
        cy.get("table").should("exist") //get() gets a specific element
        cy.contains("Subject").should("exist") //contains() gets certain text etc.

        //Test that the first row of the inbox looks like what we expect
        //We'll use first() to get the first element, and within() to check its nested elements
        cy.get("tbody tr").first().within(() => {
            cy.get("td").eq(0).should("not.be.empty")
            cy.get("td").eq(1).should("not.be.empty")
            cy.get("td").eq(2).should("not.be.empty")
        })

        //TODO: we could have an if statment to check if there's any mail BEFORE running tests on the inbox

    })

    //test 2------------
    it("Shows an empty inbox message when there are no emails", () => {

        //This time, we'll manipulate the HTTP Response to have an empty response body
        cy.intercept("GET", "http://localhost:8080/mail", {
            statusCode: 200,
            body: []
        })

        //Check that the "no mail" message is there, and the table isn't 
        cy.contains("No Mail! You're all caught up!").should("be.visible")
        cy.get("table").should("not.exist")
        cy.get("button").contains("Compose Email").should("be.visible")

    })

    //test 3------------
    it("Displays an error alert and shows the 'no mail' message wif fetch inbox request fails", () => {

        //Force an error response after intercepting the HTTP response (note the shorthand for the URL)
        cy.intercept("GET", "/mail", {
            forceNetworkError: true //fail the test, triggering the catch block in the component
        })

        //Stub the alert popup so Cypress doesn't get interrupted
        //"Stub?" we're faking the alert trigger so Cypress can track it, but not actually cause a popup
        cy.on("window:alert", cy.stub().as("alert"))

        //Confirm the alert() got triggered with the appropriate error message
        cy.get("@alert").should("have.been.calledWith", "There was a problem when fetching your inbox! Please try again later")

    })

    //test 4------------------
    

})