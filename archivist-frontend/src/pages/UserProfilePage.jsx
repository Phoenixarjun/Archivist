import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { apiService } from '../services/apiService';

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assuming your backend has an endpoint like '/api/users/me' or '/api/profile'
                const data = await apiService.get('users/me'); 
                setUserProfile(data);
            } catch (err) {
                setError('Failed to fetch user profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <MainLayout><div>Loading profile...</div></MainLayout>;
    }

    if (error) {
        return <MainLayout><div className="alert alert-danger">{error}</div></MainLayout>;
    }

    if (!userProfile) {
        return <MainLayout><div>User profile not found.</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="container">
                <h2 className="mb-4">User Profile</h2>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img 
                                    src={userProfile.imageUrl || 'https://via.placeholder.com/150'} 
                                    className="img-fluid rounded-circle mb-3" 
                                    alt="User Profile"
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <h4>{userProfile.name}</h4>
                                <p className="text-muted">{userProfile.role}</p>
                            </div>
                            <div className="col-md-8">
                                <h3>Profile Details</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Full Name:</strong> {userProfile.name}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email Address:</strong> {userProfile.email}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone Number:</strong> {userProfile.phone || 'N/A'}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Employee ID:</strong> {userProfile.employeeId || 'N/A'}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Role:</strong> 
                                        <span className="badge bg-primary ms-2">{userProfile.role}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserProfilePage;
