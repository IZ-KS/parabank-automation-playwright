// tests/global-setup.ts
import { chromium, FullConfig, request as playwrightRequest } from '@playwright/test';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
    console.log('--- Global setup script is running ---');

    // 🔑 Generate random test user
    const random3Digits = Math.floor(Math.random() * 900) + 100;
    const uniqueUsername = `testuser_${random3Digits}`;
    const password = 'Password123';

    // Paths for saving state and customerId
    const storageStatePath = path.join(config.rootDir, 'storageState.json'); //for UI tests
    const customerInfoPath = path.join(config.rootDir, 'customerId.json'); //for API Test

    // 1️⃣ Register user via UI
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://parabank.parasoft.com/parabank/register.htm');

    // Fill out the registration form using the more resilient locators
    await page.locator('id=customer.firstName').fill('Test');
    await page.locator('id=customer.lastName').fill('User');
    await page.locator('id=customer.address.street').fill('123 Test St');
    await page.locator('id=customer.address.city').fill('Test City');
    await page.locator('id=customer.address.state').fill('TS');
    await page.locator('id=customer.address.zipCode').fill('12345');
    await page.locator('id=customer.phoneNumber').fill('1234567890');
    await page.locator('id=customer.ssn').fill('12345');

    await page.locator('id=customer.username').fill(uniqueUsername);
    await page.locator('id=customer.password').fill(password);
    await page.locator('id=repeatedPassword').fill(password);

    // Click the register button and wait for the new page to load
    await page.getByRole('button', { name: 'Register' }).click();

    // Close the browser after the UI interaction is complete
    await browser.close();

    // 2️⃣ Login via API to retrieve customerId
    const requestContext = await playwrightRequest.newContext();
    const loginResponse = await requestContext.get(
        `https://parabank.parasoft.com/parabank/services/bank/login/${uniqueUsername}/${password}`
    );

    if (loginResponse.status() !== 200) {
        throw new Error(`❌ API Login failed with status: ${loginResponse.status()}`);
    }

    const xmlBody = await loginResponse.text();
    const parsed = await parseStringPromise(xmlBody);
    const customerId = parsed.customer?.id?.[0];

    if (!customerId) {
        throw new Error('❌ Could not extract customerId from login response');
    }

    // 3️⃣ Save customerId + credentials to JSON
    fs.mkdirSync(path.dirname(customerInfoPath), { recursive: true }); // ensure folder exists
    fs.writeFileSync(
        customerInfoPath,
        JSON.stringify({ customerId, username: uniqueUsername, password }, null, 2)
    );


    // 4️⃣ Save Playwright storage state
    await requestContext.storageState({ path: storageStatePath });
    await requestContext.dispose();

    console.log(`✅ Global setup complete: Created user "${uniqueUsername}" with customerId=${customerId}`);
}



export default globalSetup;