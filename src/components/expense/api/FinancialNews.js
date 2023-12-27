import { apiClient } from './ApiClient'


export const retrieveFinancialNewsApi = () =>
    apiClient.get(`/financial-news`)