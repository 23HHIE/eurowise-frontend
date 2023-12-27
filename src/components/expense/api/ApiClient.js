import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)


// export const apiClient = axios.create(
//     {
//         baseURL: 'http://eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/tzevkxgw6jnmbcq5'
//     }
// )
