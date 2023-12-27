// 原计划将新增用户使用侧边栏，修改用户使用模态框


import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddUserSidebar = ({ onSubmit, onHide }) => {
    const [signupEmail, setSignupEmail] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRole, setSignupRole] = useState('USER');

    const handleSubmitSignup = (e) => {
        e.preventDefault();

        const requestData = {
            email: signupEmail,
            name: signupName,
            password: signupPassword,
            role: signupRole,
        };

        const configuration = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            url: 'http://localhost:8080/register',
            data: requestData,
        };

        axios(configuration)
            .then((result) => {
                console.log(result);
                onSubmit();
                onHide(); // 关闭侧边栏
            })
            .catch((error) => {
                console.log(error);
            });



    };

    return (
        <div>
            <h2>Add a New User</h2>
            <Form onSubmit={handleSubmitSignup}>
                {/* ...（省略其他表单项） */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddUserSidebar;
