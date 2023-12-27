import { apiClient } from './ApiClient'

export const retrieveAllUsersApi
    = () => apiClient.get(`/users`)

export const deleteUserApi = (id) =>
    apiClient.delete(`/users/${id}`)

export const ModifyUserApi = (id, user) =>
    apiClient.put(`/edit/users/${id}`, JSON.stringify(user))

