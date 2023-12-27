import { createContext, useContext, useState } from "react"
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient"


// 匿名函数或者lambda函数是为了定义简单的函数或回调函数

// 1-Create a context创建一个上下文对象
export const AuthContext = createContext() //创建context对象


export const useAuth = () => useContext(AuthContext) //创建钩子去获取context里的值



// 创建一个提供器组件
// 3-Share the created context with other components
export default function AuthProvider({ children }) { //创建context.Provider组件

    // 2-Put some state in the context

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsename] = useState(null)
    const [role, setRole] = useState(null)

    const [token, setToken] = useState(null)



    async function login(username, password) {
        try {
            const response = await executeJwtAuthenticationService(username, password)
            await response.data;
            console.log(response)
            // if (response.status === 200) {
            if (response.status === 200 && response.data.data && response.data.data.token) {
                // console.log(response.data.token)
                const jwtToken = 'Bearer ' + response.data.data.token
                const role = response.data.data.role

                setAuthenticated(true)
                setUsename(username)
                setRole(role)
                setToken(jwtToken)

                // 存储Token到localstorage
                localStorage.setItem("token", jwtToken);

                localStorage.getItem("token");

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token ')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                console.log(jwtToken)
                return true

            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsename(null)
        setRole(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, role, token }}>
            {children}
        </AuthContext.Provider>
    )
}
