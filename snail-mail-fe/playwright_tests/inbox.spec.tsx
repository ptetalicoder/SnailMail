import {test, expect } from '@playwright/test'

//Before each test, go to our main page (render the App.tsx)
//Then, click open the Compose Component
test.beforeEach(async ({ page }) => {
    await page.goto('/') //Playwright goes to the baseURL defined in our config file 
    await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
    
    //an assertion in the beforeEach - make sure compose exists
    await expect(page.getByTestId("compose-component")).toBeVisible()
})

//test 1: Successful GET request
test(" Successful GET request to mail", async ({ request  }) => {
    const response = await request.get('http://localhost:8080/mail')
    expect(response.status()).toBe(200)
    const inbox = await response.json()
    expect(Array.isArray(inbox)).toBe(true)
    
})

//test 2: Successful GET request sent directly to the backend (instead of waiting for inbox.tsx to send it)
test("Successful GET request sent directly to the backend", async ({ request }) => {
    const response = await request.get('http://localhost:8080/mail')
    expect(response.status()).toBe(200)
    const inbox = await response.json()
    expect(Array.isArray(inbox)).toBe(true)
})

//test 3: Failure GET request to /mail (404)
test("Failure GET request to /mail (404)", async ({ request }) => {
    const response = await request.get('http://localhost:8080/mail/invalid')
    expect(response.status()).toBe(404)
})

//test 4: Text on screen when there is no mail in the inbox
test.describe('Inbox', () => {
    test("Text on screen when there is no mail in the in box", async ({ page, request }) => {
        await request.delete('http://localhost:8080/mail') //Delete all mail in the inbox
        await page.goto('/') //Go to inbox.tsx
        console.log(await page.content())
        await expect(page.getByText("No Mail! You're all caught up!")).toBeVisible({timeout: 10000})
    })
})

//test 5: Compose component opens when button is clicked
test("Compose component opens when button is clicked", async ({ page }) => {
    await page.goto('/') //Go to main page
    await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
    await expect(page.getByTestId("compose-component")).toBeVisible()
})