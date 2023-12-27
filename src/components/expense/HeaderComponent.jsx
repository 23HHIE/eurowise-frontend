import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

function HeaderComponent() {

    const authContext = useAuth()

    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }


    console.log(authContext)

    return (


        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to='/welcome/:username' >Home</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to='/details' >Details</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to='/news' >Financial News</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to='/admin' >User Management1</Link>}
                                </li>

                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                {isAuthenticated && <Link className='nav-link' to='/logout' onClick={logout} >Logout</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link' to='/login' >Login</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link' to='/register' >Sign Up</Link>}
                            </li>



                        </ul>
                    </nav>

                </div>

            </div>

        </header>
    )
}

export default HeaderComponent