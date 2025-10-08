import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted p-3 mt-auto">
      <Container>&copy; {new Date().getFullYear()} Archivist - All Rights Reserved</Container>
    </footer>
  );
};

export default Footer;