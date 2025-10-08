import React, { useState } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/loginReg.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const user = await login(formData);
      if (user) {
          console.log(user)
        // Redirect based on role
        if (user.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (user.role === 'EMPLOYEE') {
          navigate('/employee-dashboard');
        } else {
          navigate('/');
        }
      } else {
        throw new Error("Login failed: User data not received");
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
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
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to access your asset management dashboard</p>
          </div>

          <Card className="auth-form-card">
            <Card.Body>
              {error && (
                <Alert variant="danger" className="animate-shake" dismissible onClose={() => setError('')}>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Email Address</Form.Label>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text className="input-icon">
                      <i className="bi bi-envelope-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control-custom"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Password</Form.Label>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text className="input-icon">
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control-custom"
                    />
                    <InputGroup.Text 
                      className="input-icon password-toggle" 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    className="custom-checkbox"
                  />
                  <Link to="/forgot-password" className="link-custom">
                    Forgot Password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="btn-custom w-100 mb-3" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Don't have an account? 
                  <Link to="/register" className="link-custom ms-2 fw-bold">
                    Create Account
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          <div className="auth-footer">
            <p className="text-muted text-center mb-0">
              © 2024 Hexaware Technologies. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
