import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <PageHeader title="My Profile" subtitle="View and manage your personal details." />
      <Card className="shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          User Details
          <Badge pill bg={user.role === 'ADMIN' ? 'danger' : 'primary'}>
            {user.role}
          </Badge>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Full Name:</strong> {user.firstName} {user.lastName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email Address:</strong> {user.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Employee ID:</strong> {user.employeeId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Username:</strong> {user.username}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfilePage;