
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import RegisterComponent from './RegisterComponent'
import LoginComponent from './LoginComponent'
import ExpenseComponent from './ExpenseComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import NewListExpenseComponent from './NewListExpenseComponent'
import HomePage from './HomePageComponent'


import AdminUserManagementPage from './AdminComponent'
// import AdminNavbar from './AdminNavBar'

import * as React from 'react';

import './ExpenseListApp.css'
import SignUp from './SignUpComponent'
import FinancialNewsComponent from './FinancialNewsComponent'
import Header from './NavBars'

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()
    if (authContext.isAuthenticated) { //只有当login后isAuthenticated为true时，才能访问相关页面
        return children
    } else {  //未login状态时如果手动输入网址，将导航到login页面
        return <Navigate to="/" />
    }

}


export default function ExpenseListApp() {
    return (
        <div className="ExpenseListApp">
            <AuthProvider>
                <BrowserRouter>
                    {/* <HeaderComponent /> */}
                    <Header />
                    {/* <AdminNavbar /> */}
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/register' element={<SignUp />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/admin' element={
                            <AuthenticatedRoute>
                                <AdminUserManagementPage />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/details' element={
                            <AuthenticatedRoute>
                                <NewListExpenseComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/news' element={
                            <AuthenticatedRoute>
                                <FinancialNewsComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/expense/:id' element={
                            <AuthenticatedRoute>
                                <ExpenseComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/*' element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>

        </div>




    )
}















