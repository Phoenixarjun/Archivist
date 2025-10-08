import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../Navbar'; // Correctly import the new Navbar component

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar /> {/* Use the new, feature-rich Navbar */}

            <main className="flex-grow-1 p-4 bg-light">
                {children || <Outlet />} 
            </main>

            <footer className="text-center p-3 bg-white border-top">
                &copy; {new Date().getFullYear()} Hexaware Technologies Limited. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
