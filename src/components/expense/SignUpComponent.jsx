import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Form, Button } from "react-bootstrap";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import axios from "axios";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        const requestData = {
            email,
            name,
            password,
        };

        const configuration = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json', // 指定请求头为 JSON
            },
            url: 'http://localhost:8080/register',
            data: requestData,
        }



        // localStorage.getItem("token");

        axios(configuration).then((result) => {
            setRegister(true)
            console.log(result)

            if (result.data.token) {
                localStorage.setItem("token", result.data.token)
            }

        }).catch((error) => {
            error = new Error();
            console.log(error)
        })

        // e.preventDefault();
        alert("Submitted");
        // navigate(`/welcome/${name}`);
    }


    return (
        <>


            <Container style={{ marginTop: '90px', marginBottom: '10px', maxWidth: '800px' }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} style={{ backgroundColor: '#e9e9e9', borderRadius: '15px' }}>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <h3 className="mb-4 text-center">Create an Account</h3>

                            <Form.Group controlId='formBasicEmail' className="FormGroup">
                                <Form.Label className="FormGroupLabel">Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter email'
                                    required

                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicName' className="FormGroup">
                                <Form.Label className="FormGroupLabel">Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Username'
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword' className="FormGroup">
                                <Form.Label className="FormGroupLabel">Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    required
                                />
                            </Form.Group>

                            <Button variant='primary' type='submit' className="w-30 mt-3 mb-5" >
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}