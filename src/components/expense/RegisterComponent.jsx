import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './api/RegisterationApiService'


import './ExpenseListApp.css'




function RegisterComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')


    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleRoleChange(event) {
        setRole(event.target.value)
    }

    const registrationData = {
        email: email,
        name: username,
        password: password,
        role: 'User',
    };


    async function handleSubmit() {




        try {
            // 执行注册操作
            const registrationSuccess = await authContext.register(registrationData);

            if (registrationSuccess) {
                // 注册成功后，执行登录操作
                const loginSuccess = await authContext.login(username, password);

                if (loginSuccess) {
                    // 登录成功，导航到欢迎页面
                    navigate(`/welcome/${username}`);
                } else {
                    // 登录失败
                    setShowErrorMessage(true);
                }
            } else {
                // 注册失败
                setShowErrorMessage(true);
            }
        } catch (error) {
            // 错误处理逻辑
            console.error('Error during registration:', error);
            setShowErrorMessage(true);
        }
    }



    return (
        // <Form noValidate validated={validated} onSubmit={handleSubmit}>
        //     <Row className="mb-3">

        //         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        //             <Form.Label>Username</Form.Label>
        //             <InputGroup hasValidation>
        //                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
        //                 <Form.Control
        //                     type="text"
        //                     placeholder="Username"
        //                     aria-describedby="inputGroupPrepend"
        //                     required
        //                 />
        //                 <Form.Control.Feedback type="invalid">
        //                     Please choose a username.
        //                 </Form.Control.Feedback>
        //             </InputGroup>
        //         </Form.Group>
        //     </Row>
        //     <Row className="mb-3">
        //         <Form.Group as={Col} md="6" controlId="validationCustom03">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="text" placeholder="Password" required />
        //             <Form.Control.Feedback type="invalid">
        //                 Please provide a password.
        //             </Form.Control.Feedback>
        //         </Form.Group>
        //         <Form.Group as={Col} md="3" controlId="validationCustom04">
        //             <Form.Label>State</Form.Label>
        //             <Form.Control type="text" placeholder="State" required />
        //             <Form.Control.Feedback type="invalid">
        //                 Please provide a password.
        //             </Form.Control.Feedback>
        //         </Form.Group>
        //         <Form.Group as={Col} md="3" controlId="validationCustom05">
        //             <Form.Label>Zip</Form.Label>
        //             <Form.Control type="text" placeholder="Zip" required />
        //             <Form.Control.Feedback type="invalid">
        //                 What is the first name of your mother?
        //             </Form.Control.Feedback>
        //         </Form.Group>
        //     </Row>
        //     <Form.Group className="mb-3">
        //         <Form.Check
        //             required
        //             label="Agree to terms and conditions"
        //             feedback="You must agree before submitting."
        //             feedbackType="invalid"
        //         />
        //     </Form.Group>
        //     <Button type="submit">Submit form</Button>
        // </Form>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='FormLabel'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className='FormControl' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='FormLabel'>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" className='FormControl' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='FormLabel'>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" className='FormControl' />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Sign up
            </Button>
        </Form>

        // <div className='Register'>
        //     <div>
        //         Resgister
        //     </div>
        //     <div className='RegisterForm'>
        //         <div>
        //             <label>User Name</label>
        //             <input type='text' name='username' />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input type='password' name='password' />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input type='password' name='password' />
        //         </div>

        //         <div>
        //             <label>Email</label>
        //             <input type='text' name='email' />
        //         </div>
        //         <div>
        //             <button type='submit ' name='submit' onClick={handleSubmit} >Submit</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default RegisterComponent