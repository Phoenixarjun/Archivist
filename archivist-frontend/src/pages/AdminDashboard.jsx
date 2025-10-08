import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import StatsCard from '../components/StatsCard';
import { apiService } from '../services/apiService';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalAssets: 0, totalEmployees: 0, pendingRequests: 0, assetsUnderService: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // This assumes you have a backend endpoint like '/api/admin/stats'
                const data = await apiService.get('admin/assets');
                setStats(data);
            } catch (err) {
                setError('Failed to fetch dashboard stats.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <MainLayout><div>Loading dashboard...</div></MainLayout>;
    }

    if (error) {
        return <MainLayout><div className="alert alert-danger">{error}</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="container-fluid">
                <h2 className="mb-4">Admin Dashboard</h2>

                <div className="row">
                    <StatsCard title="Total Assets" value={stats.totalAssets} icon="box-seam" color="primary" />
                    <StatsCard title="Total Employees" value={stats.totalEmployees} icon="people-fill" color="info" />
                    <StatsCard title="Pending Requests" value={stats.pendingRequests} icon="hourglass-split" color="warning" />
                    <StatsCard title="Assets Under Service" value={stats.assetsUnderService} icon="tools" color="danger" />
                </div>

                <hr className="my-4" />

                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Quick Actions</h5>
                                <p className="card-text">Manage your assets and employees with ease.</p>
                                {/* Link to a future Asset Management page */}
                                <Link to="/admin/assets" className="btn btn-primary me-2">Manage Assets</Link>
                                <Link to="/admin/employees" className="btn btn-info">Manage Employees</Link>
                            </div>
                        </div>
                    </div>
                    {/* You can add another card for recent activity here */}
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
