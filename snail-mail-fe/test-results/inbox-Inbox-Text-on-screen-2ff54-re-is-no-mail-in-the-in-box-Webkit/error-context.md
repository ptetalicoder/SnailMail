# Test info

- Name: Inbox >> Text on screen when there is no mail in the in box
- Location: C:\Users\Pteta\Hexaware\SnailMail\snail-mail-fe\playwright_tests\inbox.spec.tsx:38:5

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: getByText('No Mail! You\'re all caught up!')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for getByText('No Mail! You\'re all caught up!')

    at C:\Users\Pteta\Hexaware\SnailMail\snail-mail-fe\playwright_tests\inbox.spec.tsx:42:72
```

# Page snapshot

```yaml
- navigation:
  - heading "🐌 SnailMail 🐌" [level=2]
- heading "Inbox" [level=3]
- table:
  - rowgroup:
    - row "Subject Sender Message":
      - cell "Subject"
      - cell "Sender"
      - cell "Message"
  - rowgroup:
    - row "fsd me@snailmail.com fsdf":
      - cell "fsd"
      - cell "me@snailmail.com"
      - cell "fsdf"
    - row "Testing me@snailmail.com Hi":
      - cell "Testing"
      - cell "me@snailmail.com"
      - cell "Hi"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
    - row "anything me@snailmail.com anything at all":
      - cell "anything"
      - cell "me@snailmail.com"
      - cell "anything at all"
- button "Compose Email"
```

# Test source

```ts
   1 | import {test, expect } from '@playwright/test'
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
  13 | //test 1: Successful GET request
  14 | test(" Successful GET request to mail", async ({ request  }) => {
  15 |     const response = await request.get('http://localhost:8080/mail')
  16 |     expect(response.status()).toBe(200)
  17 |     const inbox = await response.json()
  18 |     expect(Array.isArray(inbox)).toBe(true)
  19 |     
  20 | })
  21 |
  22 | //test 2: Successful GET request sent directly to the backend (instead of waiting for inbox.tsx to send it)
  23 | test("Successful GET request sent directly to the backend", async ({ request }) => {
  24 |     const response = await request.get('http://localhost:8080/mail')
  25 |     expect(response.status()).toBe(200)
  26 |     const inbox = await response.json()
  27 |     expect(Array.isArray(inbox)).toBe(true)
  28 | })
  29 |
  30 | //test 3: Failure GET request to /mail (404)
  31 | test("Failure GET request to /mail (404)", async ({ request }) => {
  32 |     const response = await request.get('http://localhost:8080/mail/invalid')
  33 |     expect(response.status()).toBe(404)
  34 | })
  35 |
  36 | //test 4: Text on screen when there is no mail in the inbox
  37 | test.describe('Inbox', () => {
  38 |     test("Text on screen when there is no mail in the in box", async ({ page, request }) => {
  39 |         await request.delete('http://localhost:8080/mail') //Delete all mail in the inbox
  40 |         await page.goto('/') //Go to inbox.tsx
  41 |         console.log(await page.content())
> 42 |         await expect(page.getByText("No Mail! You're all caught up!")).toBeVisible({timeout: 10000})
     |                                                                        ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
  43 |     })
  44 | })
  45 |
  46 | //test 5: Compose component opens when button is clicked
  47 | test("Compose component opens when button is clicked", async ({ page }) => {
  48 |     await page.goto('/') //Go to main page
  49 |     await page.getByRole('button', {name: "Compose Email"}).click() //Open Compose.tsx
  50 |     await expect(page.getByTestId("compose-component")).toBeVisible()
  51 | })
```