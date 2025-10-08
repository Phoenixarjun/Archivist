import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Nav className="flex-column sidebar">
      <NavLink to="/dashboard" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/profile" className="nav-link">
        Profile
      </NavLink>

      {/* Admin-only links */}
      {user && user.role === 'ADMIN' && (
        <>
          <NavLink to="/admin/assets" className="nav-link">
            Asset Management
          </NavLink>
          <NavLink to="/admin/employees" className="nav-link">
            Employee Management
          </NavLink>
        </>
      )}
    </Nav>
  );
};

export default Sidebar;