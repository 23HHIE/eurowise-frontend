import axios from 'axios'

//export const apiClient = axios.create(
//    {
//        baseURL: 'http://localhost:8080'
//    }
//)


export const apiClient = axios.create(
    {
         baseURL: 'https://eurowise-98c1d6946202.herokuapp.com/'
     }
 )
