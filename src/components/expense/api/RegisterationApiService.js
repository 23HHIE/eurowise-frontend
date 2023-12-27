import { apiClient } from './ApiClient'



export const executeRegistrationService = (registrationData) =>
    apiClient.post('/register', registrationData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });