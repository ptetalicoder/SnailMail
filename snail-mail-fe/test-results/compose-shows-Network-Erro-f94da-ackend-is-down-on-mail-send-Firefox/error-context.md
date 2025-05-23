# Test info

- Name: shows Network Error alert is backend is down on mail send
- Location: C:\Users\Pteta\Hexaware\SnailMail\snail-mail-fe\playwright_tests\compose.spec.tsx:96:1

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\Pteta\AppData\Local\ms-playwright\firefox-1482\firefox\firefox.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import {test, expect, request} from '@playwright/test'
   2 |
   3 | //Before each test, go to our main page (render the App.tsx)
   4 | //Then, click open the Compose Component
   5 | test.beforeEach(async ({ page }) => {
   6 |     await page.goto('/') //Playwright goes to the baseURL defined in our config file 
   7 |     await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
   8 |     
   9 |     //an assertion in the beforeEach - make sure compose exists
   10 |     await expect(page.getByTestId("compose-component")).toBeVisible()
   11 | })
   12 |
   13 | //Test 1: Make sure user can compose and send a valid email ----------
   14 | test("user can send email via compose component", async ({page}) => {
   15 |
   16 |     //I like to select elements by the easiest field to access that's still unique
   17 |     await page.getByRole("textbox", {name: "recipient"}).fill("test@snailmail.com")
   18 |     await page.getByRole("textbox", {name: "subject"}).fill("anything")
   19 |     await page.getByRole("textbox", {name: "body"}).fill("anything at all")
   20 |
   21 |     //dialog - an event that gets emitted when a dialog element appears (like our alert()!)
   22 |     page.once('dialog', async (dialog) => {
   23 |         expect(dialog.message()).toEqual("Sent Mail to: test@snailmail.com")
   24 |         await dialog.accept() //.accept() is like hitting "ok" to dismiss the alert
   25 |         //NOTE: we won't see this alert in the GUI, Playwright automatically dismisses them
   26 |     })
   27 |
   28 |     //click the send button (which should trigger our eventListener)
   29 |     await page.getByRole('button', {name: "Send"}).click()
   30 |
   31 |     //Wait for an HTTP response to come back from the /mail URL
   32 |     const response = await page.waitForResponse("http://localhost:8080/mail")
   33 |
   34 |     //Run some assertions on the values of the HTTP Response
   35 |     expect(response.status()).toBe(200) //check that the status code === 200
   36 |
   37 |     //extract the response data to test the fields
   38 |     const jsonResponse = await response.json();
   39 |     expect(jsonResponse.recipient).toBe("test@snailmail.com")
   40 |     
   41 |     //TODO: This doesn't work in Firefox, json parsing issues. 
   42 | })
   43 |
   44 | //Test 2: Check that the appropriate alert is sent when an email is sent with no Subject
   45 | test("shows alert when trying to send mail with no subject", async ({page}) => {
   46 |
   47 |     //Fill only the Recipient and Body, leaving Subject empty
   48 |     //(Note we're using getByPlaceholder this time just to show it)
   49 |     await page.getByPlaceholder("recipient").fill("test@snailmail.com")
   50 |     await page.getByPlaceholder("Write your message here...").fill("This won't send!")
   51 |
   52 |     //Listen for another dialog event - this should be our "no subject" alert()
   53 |     page.once('dialog', async (dialog) => {
   54 |         expect(dialog.message()).toEqual("Subject cannot be empty")
   55 |         //leaving out the accept() since it happens automatically in Playwright
   56 |     })
   57 |
   58 |     //Maybe not necessary but just wanna show some more assertions - make sure subject is empty
   59 |     await expect(page.getByPlaceholder("subject")).toBeEmpty()
   60 |
   61 |     //Click send to trigger the alert
   62 |     await page.getByText("Send").click
   63 |
   64 | }) 
   65 |
   66 | //Test 3: The backend sends an erroneous response when mail is sent with no recipient
   67 | test("backend rejects emails with missing recipient", async () => {
   68 |
   69 |     //Recall that the backend should send a null body and a 400 status code 
   70 |     //IF the recipient field is empty.
   71 |     //Yes, the front end checks for this, but we'll send a manual HTTP request to bypass that check
   72 |
   73 |     //Make a new ApiRequestContext so we can directly send an HTTP request 
   74 |     const requestContext = await request.newContext()
   75 |
   76 |     //Directly send a POST with an email object - this returns an ApiResponse object
   77 |     const response = await requestContext.post("http://localhost:8080/mail", {
   78 |         data:{
   79 |             sender: "me@snailmail.com",
   80 |             recipient: "",
   81 |             subject: "The backend wont allow this",
   82 |             body: "Test test test"
   83 |         }
   84 |     })
   85 |
   86 |     //make sure we get a 400 status code (bad request)
   87 |     expect(response.status()).toBeGreaterThanOrEqual(400)
   88 |
   89 |     //make sure the response body is null
   90 |     const body = await response.text() //turn it into text (can't parse JSON from null)
   91 |     expect(body).toBe("")
   92 |
   93 | })
   94 |
   95 | //Test 4: test for the appropriate alert if the backend is down (mocking this request!!)
>  96 | test("shows Network Error alert is backend is down on mail send", async ({page}) => {
      | ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Pteta\AppData\Local\ms-playwright\firefox-1482\firefox\firefox.exe
   97 |
   98 |     //Intercept the HTTP request (route()), and force it to fail (abort())
   99 |     await page.route("**/mail", route => {
  100 |         route.abort() //Simulating the server being down, or something causing the request to fail
  101 |     })
  102 |
  103 |     //Fill out a valid form (we don't want any front end checks to run first)
  104 |     await page.getByRole("textbox", {name: "recipient"}).fill("test@snailmail.com")
  105 |     await page.getByRole("textbox", {name: "subject"}).fill("anything")
  106 |     await page.getByRole("textbox", {name: "body"}).fill("anything at all")
  107 |
  108 |     //Listen for the alert and assert the appropriate message
  109 |     page.once('dialog', async (dialog) => {
  110 |         expect(dialog.message()).toContain("Network Error")
  111 |     })
  112 |
  113 |     //Attempt to send the mail (which should get aborted due to our mocking in the request
  114 |     await page.getByRole('button', {name: "Send"}).click()
  115 |
  116 | })
  117 |
  118 | //Test 5: compose component goes away and "compose email" reappears when "x" is clicked
  119 | test("close compose component, render Compose Email button when X is clicked", async ({page}) => {
  120 |
  121 |     //Click the X button - using locator() directly just to show it
  122 |     await page.locator('.btn-close').click() //selecting by the element with className = "btn-close"
  123 |
  124 |     //Assert that Compose.tsx is no longer in the DOM - note the use of the .not property
  125 |     await expect(page.getByTestId("compose-component")).not.toBeVisible()
  126 |
  127 |     //Assert that the "Compose Email" button reappears
  128 |     await expect(page.getByRole("button", {name:"Compose Email"})).toBeVisible()
  129 |
  130 | })
  131 |
  132 | //Test 6: make sure the error page renders when visiting an invalid URL
  133 | //NOTE: not really a compose component thing... but I'm putting it here anyway
  134 | test("error page component renders when invalid URL is visited", async ({browser}) => {
  135 |
  136 |     //Create a new Browser context - isolated from the actual browser the app is running on
  137 |     const browserContext = await browser.newContext()
  138 |
  139 |     //Create a new page based on this isolated Browser Context
  140 |     const page = await browserContext.newPage()
  141 |
  142 |     //use the page to navigate to an invalid URL!
  143 |     await page.goto("http://localhost:5173/invalidURL")
  144 |
  145 |     //Assert that our error page shows up
  146 |     await expect(page.getByText("Welcome to the Error Page")).toBeVisible()
  147 |
  148 |     //good practice - close your context once you're done with it
  149 |     await browserContext.close()
  150 | })
  151 |
  152 | //Test 7: Tests logs the correct response data - example of using ConsoleMessage
  153 | test("logs correct data from the backend after sending an email", async ({page}) => {
  154 |
  155 |     //Fill out a valid form
  156 |     await page.getByRole("textbox", {name: "recipient"}).fill("test@snailmail.com")
  157 |     await page.getByRole("textbox", {name: "subject"}).fill("anything")
  158 |     await page.getByRole("textbox", {name: "body"}).fill("anything at all")
  159 |
  160 |     //Listen for console messages, and assert the printed data
  161 |     page.on('console', async (message) => {
  162 |
  163 |         //Firefox is strict - gotta convert this value before asserting what it equals
  164 |         const parsedMessage = await message.args()[0].jsonValue()
  165 |
  166 |         expect(parsedMessage).toEqual({
  167 |             sender: "me@snailmail.com", 
  168 |             recipient: "test@snailmail.com", 
  169 |             subject: "anything", 
  170 |             body: "anything at all"})
  171 |     })
  172 |
  173 |     //Click send so that the console event actually trigger
  174 |     await page.getByRole('button', {name: "Send"}).click()
  175 |
  176 | })
  177 |
  178 | //Test 1.5: Make sure user can compose and send a valid email (NOW WITH A .HAR FILE!)
  179 | test("user can send email via compose component... NOW WITH .HAR FILE", async ({browser}) => {
  180 |
  181 |     //Create a new context so we can record a .HAR file
  182 |     const browserContext = await browser.newContext({
  183 |         recordHar: {
  184 |             path: "har-files/sendmail.har", //the folder/file the .HAR file will reside in,
  185 |             content: "embed" //embed the response bodies into the .HAR file
  186 |         }
  187 |     })
  188 |
  189 |     //since the BrowserContext ignores the beforeEach, we have a little setup to do
  190 |     const page = await browserContext.newPage()
  191 |     await page.goto('/') //Playwright goes to the baseURL defined in our config file 
  192 |     await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
  193 |
  194 |     //I like to select elements by the easiest field to access that's still unique
  195 |     await page.getByRole("textbox", {name: "recipient"}).fill("test@snailmail.com")
  196 |     await page.getByRole("textbox", {name: "subject"}).fill("anything")
```