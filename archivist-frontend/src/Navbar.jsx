import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Archivist</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Role-based navigation links */}
                        {user?.role === 'ROLE_ADMIN' && (
                            <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                        )}
                        {user?.role === 'ROLE_EMPLOYEE' && (
                            <Nav.Link as={Link} to="/employee-dashboard">My Dashboard</Nav.Link>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {user ? (
                            <NavDropdown title={user.email || 'Profile'} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
