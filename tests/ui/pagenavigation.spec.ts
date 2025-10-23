import { test, expect, Browser, Page } from '@playwright/test';
import { chromium,webkit,firefox } from 'playwright';


test.describe( 'Parabank Navigation Page', () => {

    test('Navigate the login page and verify title', async ({ page  }) => {

        // Was learning the basic setup
        // const browser:Browser = await chromium.launch({headless : false});
        // const page:Page = await browser.newPage();

        await page.goto ('https://parabank.parasoft.com/parabank');

        //Verify the title
        await expect(page).toHaveTitle(/ParaBank/);

    })

    test('Navigate the Services page and verify title', async ({ page }) => {

        //Navigate to baseURL (defined in playwright.config.ts)

        await page.goto ('https://parabank.parasoft.com/parabank');

        //Navigate the Menu Options
        await page.locator('#headerPanel').getByRole('link', { name: 'Services' }).click();

        //Verify the title
        await expect(page).toHaveTitle(/ParaBank | Services/);

    })

    test('Navigate the Product page and verify title', async ({ page }) => {

        //Navigate to baseURL (defined in playwright.config.ts)
        await page.goto ('/');

        //Navigate the Menu Options
        await page.locator('#headerPanel').getByRole('link', { name: 'Products' }).click();


        //Get page title & URL
        const pageTitle = await page.title();
        const pageURL =  page.url();

        //Verify the title
        console.log('Page Title: ' , pageTitle);
        console.log('Page URL: ' , pageURL);

        await expect(page).toHaveTitle(/Automated Software Testing Tools - Ensure Quality - Parasoft/);
        await expect(page).toHaveURL('https://www.parasoft.com/products/');
        
    })

    test('Navigate the Location page and verify title', async ({ page }) => {

        //Navigate to baseURL (defined in playwright.config.ts)
        await page.goto ('/');

        //Navigate the Menu Options
        await page.locator('#headerPanel').getByRole('link', { name: 'Locations' }).click();


        //Get page title & URL
        const pageTitle = await page.title();
        const pageURL =  page.url();

        //Verify the title
        console.log('Page Title: ' , pageTitle);
        console.log('Page URL: ' , pageURL);

        await expect(page).toHaveTitle(/Automated Software Testing Solutions For Every Testing Need/);
        await expect(page).toHaveURL('https://www.parasoft.com/solutions/');
        
    })

});

