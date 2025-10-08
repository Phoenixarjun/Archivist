import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>My Profile</h1>
            <Card>
                <Card.Header style={{ background: 'var(--accent-gradient)', color: 'var(--white)' }}>User Details</Card.Header>
                <Card.Body>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Employee ID:</strong> {user.employeeId}</p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;