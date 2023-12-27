import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "./security/AuthContext"

function Header() {


    const authContext = useAuth()

    const isAuthenticated = authContext.isAuthenticated

    const userRole = authContext.role;

    function logout() {
        authContext.logout()
    }
    return (

        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <Image
                            src={process.env.PUBLIC_URL + '/images/logo.png'}
                            alt="Eurowise"
                            style={{ maxWidth: '170px', width: '100%', height: 'auto' }}
                        />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/welcome/:username">Home</Nav.Link>
                                {userRole === 'USER' && (
                                    <Nav.Link as={Link} to="/details">Details</Nav.Link>
                                )}

                                {userRole === 'USER' && (
                                    <Nav.Link as={Link} to="/news">Financial News</Nav.Link>
                                )}

                                {userRole === 'ADMIN' && (
                                    <Nav.Link as={Link} to="/admin">User Management</Nav.Link>
                                )}

                            </>
                        )}
                    </Nav>
                    <Nav >
                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/logout" onClick={logout}>Logout</Nav.Link>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;