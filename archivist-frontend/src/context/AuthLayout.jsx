import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AuthLayout = ({ children }) => {
  const layoutStyle = {
    minHeight: '100vh',
    background: 'var(--accent-gradient)',
  };

  return (
    <Container fluid style={layoutStyle} className="d-flex align-items-center justify-content-center">
      <Col md={6} lg={4}>{children}</Col>
    </Container>
  );
};

export default AuthLayout;