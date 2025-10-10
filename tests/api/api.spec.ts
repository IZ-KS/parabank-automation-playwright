import { test, expect,request } from '@playwright/test'
import { parseStringPromise } from 'xml2js'; // Import the parser
import { validAccountID,customerInfo,customerLookup } from '../../utils/constant';


test.describe ('Parabank API Tests', () => {
    test('get successful response from the account lookup API', async ({ request }) =>{

        const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${validAccountID}`);

        //Check status is 200(OK)
        expect(response.status()).toBe(200);

        //Check content type
        expect(response.headers()['content-type']).toContain('application/xml');

    });
    
    test('test to get customerID', async ({ request }) =>{

         // Log the values you are about to use
        const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/login/${customerLookup.userName}/${customerLookup.password}`)

        //Check status is 200(OK)
        expect(response.status()).toBe(200);

        // 2. Get the response body as text
        const responseBody = await response.text();
        console.log('Raw XML response:', responseBody);

        // Note: The parseStringPromise method is asynchronous
        const parsedBody = await parseStringPromise(responseBody, {
            explicitArray: false // To avoid nested arrays for single elements
        });

        // 4. Navigate the JavaScript object to find the customer ID
        // The structure will be `rootElement.customer.id`
        const customerId = parsedBody.customer.id;
        
        // Log the retrieved ID to the console
        console.log('Retrieved Customer ID:', customerId);

        // 5. Assert that the customer ID was successfully retrieved
        expect(customerId).toBeDefined();
        expect(customerId).not.toBeNull();
    })

    test('get successful response from the account lookup API without using fixture', async () => {
        // Create a new isolated request context
        const apiContext = await request.newContext();

        const validAccountID = 13566;
        const response = await apiContext.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${validAccountID}`);

        // Check status
        expect(response.status()).toBe(200);

        // Check content type
        expect(response.headers()['content-type']).toContain('application/xml');

        await apiContext.dispose(); // Cleanup
        });
});