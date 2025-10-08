import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/loginReg.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (passwordStrength < 75) {
      setError('Please choose a stronger password.');
      return;
    }

    setIsLoading(true);

    try {
      // Exclude confirmPassword and add role
      const { confirmPassword, ...registerData } = formData;
      const finalRegisterData = { ...registerData, role: 'EMPLOYEE' };
      console.log(finalRegisterData)
      await register(finalRegisterData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return { text: 'Weak', variant: 'danger' };
    if (passwordStrength < 50) return { text: 'Fair', variant: 'warning' };
    if (passwordStrength < 75) return { text: 'Good', variant: 'info' };
    return { text: 'Strong', variant: 'success' };
  };

  const strengthLabel = getPasswordStrengthLabel();

  return (
    <div className="auth-wrapper">
      <div className="auth-container" style={{ maxWidth: '700px' }}>
        <div className="auth-card animate-slide-up">
          <div className="auth-header">
            <div className="logo-container">
              <div className="logo-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.95-7-5.14-7-9V8.3l7-3.11 7 3.11V11c0 3.86-3.14 8.05-7 9z"/>
                  <path d="M10.5 13.5l-2-2-1.41 1.41L10.5 16.5l6-6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join our asset management system today</p>
          </div>

          <Card className="auth-form-card">
            <Card.Body>
              {error && (
                <Alert variant="danger" className="animate-shake" dismissible onClose={() => setError('')}>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="animate-slide-down">
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">First Name</Form.Label>
                      <InputGroup className="input-group-custom">
                        <InputGroup.Text className="input-icon"><i className="bi bi-person-fill"></i></InputGroup.Text>
                        <Form.Control type="text" name="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} required className="form-control-custom" />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Last Name</Form.Label>
                      <InputGroup className="input-group-custom">
                        <InputGroup.Text className="input-icon"><i className="bi bi-person-fill"></i></InputGroup.Text>
                        <Form.Control type="text" name="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} required className="form-control-custom" />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                   <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Username</Form.Label>
                      <InputGroup className="input-group-custom">
                        <InputGroup.Text className="input-icon"><i className="bi bi-person-badge-fill"></i></InputGroup.Text>
                        <Form.Control type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required className="form-control-custom" />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Email Address</Form.Label>
                      <InputGroup className="input-group-custom">
                        <InputGroup.Text className="input-icon"><i className="bi bi-envelope-fill"></i></InputGroup.Text>
                        <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required className="form-control-custom" />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Password</Form.Label>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text className="input-icon"><i className="bi bi-lock-fill"></i></InputGroup.Text>
                    <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required className="form-control-custom" />
                    <InputGroup.Text className="input-icon password-toggle" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                      {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                    </InputGroup.Text>
                  </InputGroup>
                  {formData.password && (
                    <div className="mt-2">
                      <ProgressBar now={passwordStrength} variant={strengthLabel.variant} className="password-strength-bar" />
                      <small className={`text-${strengthLabel.variant} d-block mt-1`}>Password Strength: {strengthLabel.text}</small>
                    </div>
                  )}
                  <Form.Text className="text-muted d-block mt-1">Min 8 characters with uppercase, number & special character</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label-custom">Confirm Password</Form.Label>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text className="input-icon"><i className="bi bi-lock-fill"></i></InputGroup.Text>
                    <Form.Control type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} required className="form-control-custom" />
                    <InputGroup.Text className="input-icon password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                      {showConfirmPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" className="btn-custom w-100 mb-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Create Account
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Already have an account? 
                  <Link to="/login" className="link-custom ms-2 fw-bold">Sign In</Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          <div className="auth-footer">
            <p className="text-muted text-center mb-0">© 2024 Hexaware Technologies. All rights reserved.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
