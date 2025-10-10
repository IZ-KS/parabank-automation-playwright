import { test, expect, Fixtures } from '../../utils/fixtures';

test.describe('Parabank Account Login', () => {

    test('Test Login', async ({ adminPage }) => {

        //Verify the Account title
        await expect(adminPage).toHaveTitle(/ParaBank | Accounts Overview/);

    })

    test('Test Open New Account', async ({ adminPage }) => {

        await adminPage.getByRole('link', { name: 'Open New Account' }).click();

        await adminPage.locator('#type').selectOption('SAVINGS');

        await adminPage.locator('#fromAccountId').selectOption('13344');

        await adminPage.getByRole('button', { name: 'Open New Account' }).click();

        //Verify the account has been opened
        await expect(adminPage.getByText('Account Opened!')).toBeVisible();

        // 2. Locate the element that contains the new account number.
        // The most reliable locator would be by ID if available, e.g., '#newAccountId'
        // Or you can find the link next to the text "Your new account number:"
        const newAccountNumberElement = adminPage.locator('#newAccountId');

        // 3. Extract the text content of the element.
        const newAccountNumber = await newAccountNumberElement.textContent();

        // 4. Log the number to the console for verification.
        console.log('New Account Number:', newAccountNumber);

        // 5. You can now assert that the number is a valid format or perform other tests.
        // For example, assert that it's a number and has a specific length.
        expect(newAccountNumber).not.toBeNull();
        expect((newAccountNumber as string).length).toBeGreaterThan(0);

    })

});