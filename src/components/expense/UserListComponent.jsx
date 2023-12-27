// 新增用户的后台API是与注册共用一个方法，修改用户资料也是一样，只是前置判断不同，且其与新增用户用一个Modal

import { React, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { retrieveAllUsersApi, deleteUserApi, ModifyUserApi } from './api/AdminApiService';




const UserList = () => {

    const [mode, setMode] = useState('add');

    const [message, setMessage] = useState(null)

    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    //注册的状态设置
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');

    // 修改的状态设置
    const [selectedUser, setSelectedUser] = useState(null);


    const handleRetrieveAllUsers = async () => {
        try {
            const response = await retrieveAllUsersApi();
            setUsers(response.data);
        } catch (error) {
            console.error('Fail to fetch users', error);
        }
    };


    const onDeleteUser = async (id) => {
        console.log(`Deleting user with id: ${id}`);
        try {
            const response = await deleteUserApi(id);
            // 在这里处理响应，根据需要返回或执行其他逻辑
            setMessage(`Delete of user with ${id} successful`)
            handleRetrieveAllUsers()
        } catch (error) {
            // 处理错误
            console.error('Error deleting user:', error);
            throw error;  // 可以选择抛出异常或者返回其他错误信息
        }
    };

    const handleModifyUser = (user) => {
        console.log("User Object:", user);
        setMode('modify')
        setSelectedUser(user);


        setEmail(user.email || '');
        setName(user.name || '');
        setPassword(user.password || '');
        setRole(user.role || '');
        setShowModal(true);
    };


    const handleUserAdded = () => {
        // 用户注册成功后关闭模态框，并刷新用户列表
        handleCloseModal();


        handleRetrieveAllUsers();
    };

    const handleAddNewUser = () => {
        // 打开模态框
        setMode('add');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // 关闭模态框
        setShowModal(false);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            email: email,
            name: name,
            password: password,
            role: role,

        }



        const url = selectedUser && selectedUser.id
            ? `http://localhost:8080/edit/users/${selectedUser.id}`
            : 'http://localhost:8080/register';

        console.log("Request URL:", url);

        const method = selectedUser ? 'PUT' : 'POST';

        const configuration = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            url,
            data: requestData,
        };

        axios(configuration)
            .then((result) => {
                console.log(result);
                handleUserAdded(); // 处理成功后刷新用户列表

            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        handleRetrieveAllUsers();
    }, [])

    useEffect(() => {
        console.log("Selected User Updated:", selectedUser);
    }, [selectedUser]);

    return (
        <Container>
            <Row className="mt-3">
                <Col md={12}>
                    {message && <div className="alert alert-warning">{message}</div>}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12} className="overflow-auto">
                    <Table striped bordered hover responsive className="table-borderless">
                        <thead>
                            <tr style={{ fontSize: '25px' }}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Delete</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '20px' }}>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>

                                    <td>
                                        <Button variant="danger" onClick={() => onDeleteUser(user.id)}>
                                            Delete
                                        </Button>
                                    </td>

                                    <td>
                                        <Button variant="success" onClick={() => handleModifyUser(user, user.id)}>
                                            Modify
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12}>
                    <Button variant="success" onClick={() => handleAddNewUser()}>
                        Add New User
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {mode === 'modify' ? 'Modify User' : 'Add a New User'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* ... (之前的表单控件) */}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                // onChange={(e) => setSignupEmail(e.target.value)}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                // onChange={(e) => setSignupName(e.target.value)}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                            />
                        </Form.Group>

                        {/* 如果是modify mode，隐藏此Input */}
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                // value={mode === 'modify' ? modifyPassword : signupPassword}
                                // onChange={(e) => setSignupPassword(e.target.value)}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={role}
                                // onChange={(e) => setSignupRole(e.target.value)}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Role"
                            />
                        </Form.Group>


                        {selectedUser && (
                            <>
                                {/* ... (之前的修改用户的输入字段) */}
                            </>
                        )}

                        <Button variant="success" type="submit" style={{ marginTop: '15px' }}>
                            {mode === 'modify' ? 'Modify User' : 'Add a New User'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>



        </Container>


    );
};

export default UserList;
