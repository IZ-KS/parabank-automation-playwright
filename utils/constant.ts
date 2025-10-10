// Generate a random 3-digit number
const random3Digits = Math.floor(Math.random() * 900) + 100;

export const customerInfo = {

    firstName: 'Jane',
    lastName: 'Drebin',
    street: 'New York',
    city: 'New York',
    state: 'New York',
    zipCode: '12345',
    phoneNumber: '1234567890',
    ssn: '12345',
    userName: `Jane_${random3Digits}`,
    password: 'password'
};

export const customerLookup = {
    firstName: 'John',
    lastName: 'Smith',
    street: '1431 Main St',
    city: 'Beverly Hills',
    state: 'CA',
    zipCode: '90210',
    ssn: '622-11-9999',
    userName: 'john',
    password: 'demo'
}

export const validAccountID = '13566'