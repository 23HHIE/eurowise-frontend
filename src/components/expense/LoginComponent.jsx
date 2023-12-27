import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
// import { Container } from '@mui/material'
import { Container, Form, Row, Col, Alert, Button, } from 'react-bootstrap';


function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            console.log(authContext.data)
            navigate(`/welcome/${username}`)

        } else {
            setShowErrorMessage(true)
        }

    }

    return (
        <Container className="Login" style={{ marginTop: '100px', maxWidth: '50%' }}>
            {/* <h1>Time to Login!</h1>
            {showErrorMessage && <div className='errorMessage'>Authenticated Failed. Please check your credentials.</div>} */}
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">
                        Time to Login!
                    </h2>
                    {showErrorMessage && (
                        <Alert variant="danger" className="text-center">
                            Authentication Failed. Please check your credentials.
                        </Alert>
                    )}

                    <Form >
                        <Form.Group controlId='formBasicUsername' className="justify-content-left mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder='Enter username'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword' className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder='Enter password'
                                required
                            />
                        </Form.Group>

                        <Button variant='success' type='button' className="w-45" onClick={handleSubmit}>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>



            {/* <div className="justify-content-left mt-5" >
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div>
                    <button type="button" name="login" onClick={handleSubmit} >
                        login
                    </button>
                </div>
            </div> */}
        </Container>


    )
}

export default LoginComponent