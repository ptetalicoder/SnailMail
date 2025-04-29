import {test, expect} from '@playwright/test'

//Before each test, go to our main page (render the App.tsx)
//Then, click open the Compose Component
test.beforeEach(async ({ page }) => {
    await page.goto('/') //Playwright goes to the baseURL defined in our config file 
    await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
    //TODO: Ben will find a preferable way to check for Compose.tsx existence 
})

//Test 1: Make sure user can compose and send a valid email ----------
test("user can send email via compose component", async ({page}) => {

    //I like to select elements by the easiest field to access that's still unique
    await page.getByRole("textbox", {name: "recipient"}).fill("test@snailmail.com")
    await page.getByRole("textbox", {name: "subject"}).fill("anything")
    await page.getByRole("textbox", {name: "body"}).fill("anything at all")

    //dialog - an event that gets emitted when a dialog element appears (like our alert()!)
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toEqual("Sent Mail to: test@snailmail.com")
        await dialog.accept() //.accept() is like hitting "ok" to dismiss the alert
        //NOTE: we won't see this alert in the GUI, Playwright automatically dismisses them
    })

    //click the send button (which should trigger our eventListener)
    await page.getByRole('button', {name: "Send"}).click()

    //Wait for an HTTP response to come back from the /mail URL
    const response = await page.waitForResponse("**/mail")

    //Run some assertions on the values of the HTTP Response
    expect(response.status()).toBe(200) //check that the status code === 200

    //extract the response data to test the fields
    const jsonResponse = await response.json();
    expect(jsonResponse.recipient).toBe("test@snailmail.com")


})