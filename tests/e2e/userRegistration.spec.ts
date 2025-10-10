// tests/e2e/userGlobal.spec.ts
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Customer ID Reuse', () => {
  let customerId: string;

  test.beforeAll(() => {
    const customerInfoPath = path.join(__dirname, '../customerId.json');
    console.log('Looking for customerId.json at:', customerInfoPath);

    const customerData = JSON.parse(fs.readFileSync(customerInfoPath, 'utf-8'));
    customerId = customerData.customerId;
  });

  test('should fetch accounts for customerId', async ({ request }) => {
    console.log(customerId);
    const accountsResponse = await request.get(
      `https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`
    );

    expect(accountsResponse.status()).toBe(200);
    console.log('Accounts response:', await accountsResponse.text());
  });

});
