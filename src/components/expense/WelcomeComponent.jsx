import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariableApi } from "./api/HelloWorldApiService"
import { useAuth } from "./security/AuthContext"
import Button from '@mui/material/Button';


function WelcomeComponent() {

    // const { username } = useParams()

    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    const username = authContext.username

    const userRole = authContext.role

    function callHelloWorldRestApi() {
        console.log('called')

        console.log(authContext.token)
        retrieveHelloWorldPathVariableApi(username, authContext.token)
            .then(
                (response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))

    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (

        <div className="custom-wel-bg me-auto">
            <div className="WelcomeComponent">
                <h1 style={{ fontSize: '28px', padding: '20px' }}>Welcome {username}!</h1>

                <div style={{ fontSize: '26px' }}>
                    {
                        userRole === 'USER' && (
                            <>
                                <p>Time to Track Your Expenses</p>
                                <Link to='/details' style={{ textDecoration: 'none' }}>
                                    <Button className="wel-button" variant="primary">
                                        Start
                                    </Button>
                                </Link>
                            </>
                        )
                    }

                </div>

                <div>
                    <Link to='/news' style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="success" style={{ margin: '18px' }}>
                            Financial News Update
                        </Button>
                    </Link>
                </div>




                <div className="text-info">{message}</div>

            </div>
        </div>
    )
}

export default WelcomeComponent