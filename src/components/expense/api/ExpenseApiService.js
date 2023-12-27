
import { apiClient } from './ApiClient'



export const retrieveAllExpensesForTypeApi
    = (type) => apiClient.get(`/${type}/expenses`)

// type?需要确定编写类型，是否是type=type
export const retrieveAllExpensesForUsernameApi
    = (username, type, currency) => apiClient.get(`/${username}/expenses/${currency}?type=${type}`);
// http://localhost:8080/users/hui/expenses


export const deleteExpenseApi = (username, id) =>
    apiClient.delete(`/users/${username}/expenses/${id}`)

// /users/{username}/expenses/{id}

export const retrieveExpenseApi = (username, id) =>
    apiClient.get(`/users/${username}/expenses/${id}`)
// http://localhost:8080/users/hui/expenses/

export const updateExpenseApi = (username, id, expense) =>
    apiClient.put(`/users/${username}/expenses/${id}`, expense)

// export const createExpenseApi = (expense, username) =>
//     apiClient.post(`/users/${username}/expense`, expense)

export const createExpenseApi = (username, expense) => {
    apiClient.post(`/users/${username}/expense`, expense)
}


// export const signUpApi = (email, username, password) =>
//     apiClient.post('/register', email, username, password)