import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Context, Layouts, and Pages
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserProfilePage from './pages/UserProfilePage';

// Component to handle redirection from the root path
const HomeRedirect = () => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        // Optional: show a loading spinner while auth state is being determined
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.role === 'ROLE_ADMIN') {
        return <Navigate to="/admin-dashboard" />;
    } else if (user?.role === 'ROLE_EMPLOYEE') {
        return <Navigate to="/employee-dashboard" />;
    } else {
        // Fallback to login if role is unknown or user is not authenticated
        return <Navigate to="/login" />;
    }
};


// A component to protect routes
const PrivateRoute = ({ children, role }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If a specific role is required and the user's role doesn't match
    if (role && user?.role !== role) {
        // Redirect them to their own dashboard, not the one they tried to access
        const dashboardPath = user?.role === 'ROLE_ADMIN' ? '/admin-dashboard' : '/employee-dashboard';
        return <Navigate to={dashboardPath} />;
    }

    return children;
};

const AppRoutes = () => (
    <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
            path="/employee-dashboard"
            element={<PrivateRoute role="ROLE_EMPLOYEE"><EmployeeDashboard /></PrivateRoute>}
        />
        <Route
            path="/admin-dashboard"
            element={<PrivateRoute role="ROLE_ADMIN"><AdminDashboard /></PrivateRoute>}
        />
        <Route
            path="/profile"
            element={<PrivateRoute><UserProfilePage /></PrivateRoute>}
        />

        {/* Default route redirects based on auth status */}
        <Route
            path="/"
            element={<HomeRedirect />}
        />
    </Routes>
);

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;
