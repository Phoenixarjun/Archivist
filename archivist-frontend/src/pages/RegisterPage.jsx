import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'EMPLOYEE', // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(formData);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to register. Please try again.');
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <h2 className="text-center mb-4">Create Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control type="text" name="firstName" required onChange={handleChange} /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control type="text" name="lastName" required onChange={handleChange} /></Form.Group></Col>
          </Row>
          <Form.Group className="mb-3"><Form.Label>Employee ID</Form.Label><Form.Control type="text" name="employeeId" required onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control type="text" name="username" required onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" required onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" required onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-100 mt-3">Register</Button>
        </Form>
        <div className="w-100 text-center mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;