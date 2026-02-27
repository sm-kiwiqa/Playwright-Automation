/**
 * Test Data - Sample data for testing
 */

export const testData = {
    users: {
        admin: {
            username: 'windmillcorporation@mailinator.com',
            password: 'Admin@12345',
            firstName: 'Admin',
            lastName: 'User',
        },
        regularUser: {
            username: 'allprojectmanager@mailinator.com',
            password: 'Admin@12345',
            firstName: 'Regular',
            lastName: 'User',
        },
    },
    projects: {
        project1: {
            name: 'Safety Project',
            description: 'QHSE Management Project',
            type: 'QHSE',
        },
        project2: {
            name: 'Equipment Tracking',
            description: 'Equipment Management Project',
            type: 'Equipment',
        },
    },
    errorMessages: {
        invalidCredentials: 'Invalid email or password',
        requiredField: 'This field is required',
        invalidEmail: 'Please enter a valid email',
        unauthorized: 'You do not have permission',
    },
    timeouts: {
        short: 3000,
        medium: 5000,
        long: 10000,
    },
};
