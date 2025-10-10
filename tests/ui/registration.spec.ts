import { test, expect } from '@playwright/test';
import { customerInfo, customerLookup } from '../../utils/constant';


test.describe( 'Parabank Login Page', () => {

    test('User create account in Register page ', async ({ page }) => {

        //Navigate to baseURL (defined in playwright.config.ts)
        await page.goto ('/');

        //Verify the title
        await expect(page).toHaveTitle(/ParaBank/);

        //Click the register link
        //await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('a[href="register.htm"]').click()
        await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

        await page.locator('id=customer.firstName').fill(customerInfo.firstName);
        await page.locator('id=customer.lastName').fill(customerInfo.lastName);
        await page.locator('id=customer.address.street').fill(customerInfo.street);
        await page.locator('id=customer.address.city').fill(customerInfo.city);
        await page.locator('id=customer.address.state').fill(customerInfo.state);
        await page.locator('id=customer.address.zipCode').fill(customerInfo.zipCode);
        await page.locator('id=customer.phoneNumber').fill(customerInfo.phoneNumber);
        await page.locator('id=customer.ssn').fill(customerInfo.ssn);

        await page.locator('id=customer.username').fill(customerInfo.userName);
        const customerUsername = page.locator('id=customer.username');
        const expectedName = await customerUsername.inputValue();
        console.log(expectedName);
        await page.locator('id=customer.password').fill(customerInfo.password);
        await page.locator('#repeatedPassword').fill(customerInfo.password);

        await page.getByRole('button', { name: 'Register' }).click();

        // Check on the heading's full text
        const welcomeHeading = page.getByRole('heading', { name: `Welcome ${expectedName}` });
        await expect(welcomeHeading).toHaveText(`Welcome ${expectedName}`);

        await page.close();
        
    })

    test('User forget account to retrieve username and password ', async ({ page }) => {

        //Navigate to baseURL (defined in playwright.config.ts)
        await page.goto ('/');

        //Verify the title
        await expect(page).toHaveTitle(/ParaBank/);

        //Click the forget login info link
        page.getByRole('link', { name: 'Forgot login info?' }).click();
        await expect(page).toHaveTitle(/ParaBank | Customer Lookup/);

        await page.locator('#firstName').fill(customerLookup.firstName)
        await page.locator('#lastName').fill(customerLookup.lastName)
        await page.locator('id=address.street').fill(customerLookup.street);
        await page.locator('id=address.city').fill(customerLookup.city);
        await page.locator('id=address.state').fill(customerLookup.state);
        await page.locator('id=address.zipCode').fill(customerLookup.zipCode);
        await page.locator('#ssn').fill(customerLookup.ssn)

        await page.getByRole('button', { name: 'Find My Login Info' }).click()

        // Use the data from your constant file in your assertion
        // This locator finds the specific paragraph containing the username and password
        const paragraphLocator = page.locator('p:has-text("Username:")');
        await paragraphLocator.waitFor({ state: 'visible' }); // Wait for the element to appear

        const isVisible = await paragraphLocator.isVisible();
        console.log(`Locator is visible: ${isVisible}`);

        // First, verify that the paragraph contains the username
        await expect(paragraphLocator).toContainText(`Username: ${customerLookup.userName}`);

        // Then, verify that the same paragraph contains the password
        await expect(paragraphLocator).toContainText(`Password: ${customerLookup.password}`);
        
    })

});

