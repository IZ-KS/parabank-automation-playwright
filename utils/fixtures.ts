import { test as base, expect, request, Page } from '@playwright/test';
import { customerInfo } from './constant';

type Fixtures = {
    adminPage: Page; //UI login
    registrationPage: Page //UI account creation
};

export const test = base.extend<Fixtures>({

    adminPage: async ({ page }, use) => {

        //Navigate to the base URL
        await page.goto('/')

        //Login to Parabank
        //await page.getByRole('textbox', { name: 'Username' }).fill('playwright_test');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');

        // //Click the login button
        await page.getByRole('button', { name: 'Log In' }).click();

        // Expose this logged-in page as "adminPage"
        await use(page);
    },

    registrationPage: async ({ page }, use) => {
        //Navigate to the base URL
        await page.goto('/')

        //Verify the title
        await expect(page).toHaveTitle(/ParaBank/);

        //Click the register link
        //await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('a[href="register.htm"]').click()
        await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

        await page.locator('#customer.firstName').fill(customerInfo.firstName);
        await page.locator('id=customer.lastName').fill(customerInfo.lastName);
        await page.locator('id=customer.address.street').fill(customerInfo.street);
        await page.locator('id=customer.address.city').fill(customerInfo.city);
        await page.locator('id=customer.address.state').fill(customerInfo.state);
        await page.locator('id=customer.address.zipCode').fill(customerInfo.zipCode);
        await page.locator('id=customer.phoneNumber').fill(customerInfo.phoneNumber);
        await page.locator('id=customer.ssn').fill(customerInfo.ssn);

        await page.locator('id=customer.username').fill(customerInfo.userName);

        const customerUsername = page.locator('id=customer.username');
        //const expectedName = await customerUsername.inputValue();
        //console.log(expectedName);
        await page.locator('id=customer.password').fill(customerInfo.password);
        await page.locator('id=repeatedPassword').fill(customerInfo.password);

        await page.getByRole('button', { name: 'Register' }).click();
        // Assert that the registration was successful by checking the title of the next page
        await expect(page).toHaveTitle('ParaBank | Customer Created');

        // Expose this logged-in page as "registrationPage"
        await use(page);

    },

})

export { expect };

export type { Fixtures };