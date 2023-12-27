import { useState, useRef } from 'react';

import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Overlay, OverlayTrigger, Offcanvas, Button } from 'react-bootstrap';
import { useAuth } from './security/AuthContext'
// import SettingsIcon from '@mui/icons-material/Settings';

function SideBarComponent() {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authContext = useAuth()
    if (!authContext.isAuthenticated) {
        return null;
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Admin portal
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>User Management</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column" style={{ textAlign: 'left' }}>
                        <LinkContainer to="/admin">
                            <Nav.Link>User Management</Nav.Link>
                        </LinkContainer>
                        {/* Add other sidebar links as needed */}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    );
}

export default SideBarComponent;