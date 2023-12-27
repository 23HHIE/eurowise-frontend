import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './UserListComponent';  // 假设有一个显示用户列表的组件

import { retrieveAllUsersApi } from './api/AdminApiService';




const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState(null)

    useEffect(() => {
        // 在组件挂载时获取用户列表数据
        // 可以使用 fetch、axios 等方法从后端获取数据
        // 更新用户列表状态：setUsers(data)

        hanleRetrieveAllUsers()
    }, []);

    const hanleRetrieveAllUsers = async () => {
        // 实现检索所有用户的逻辑
        // 更新用户列表状态：setUsers(data)

        try {
            const response = await retrieveAllUsersApi();
            setUsers(response.data)
        } catch (error) {
            console.error('Fail to fetch users', error)
        }
    }


    return (
        <Container>
            <Row>
                <Col>
                    <h2>Admin User Management</h2>
                    {message && <div className="alert alert-warning">{message}</div>}
                </Col>

            </Row>


            <Row>
                <Col>
                    <UserList users={users} />
                </Col>
            </Row>



            {/* Other components related to admin user management */}
        </Container>
    );
};

export default AdminUserManagementPage;
