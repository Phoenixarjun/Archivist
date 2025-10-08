import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import StatsCard from '../components/StatsCard';
import AssetCard from '../components/AssetCard';
import { apiService } from '../services/apiService';

const EmployeeDashboard = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                // Assuming an endpoint '/api/assets' that returns all assets
                // In a real-world scenario, you might have separate endpoints for user assets and available assets
                const data = await apiService.get('assets');
                setAssets(data);
            } catch (err) {
                setError('Failed to fetch assets.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    const handleRequest = async (asset) => {
        try {
            // Assuming an endpoint like '/api/assets/request'
            await apiService.post(`assets/request/${asset.id}`);
            alert(`Asset ${asset.name} requested successfully!`);
            // Optionally, refresh the asset list
        } catch (err) {
            alert(`Failed to request asset: ${err.message}`);
        }
    };

    const handleService = async (asset) => {
        try {
            // Assuming an endpoint like '/api/assets/service'
            await apiService.post(`assets/service/${asset.id}`);
            alert(`Service request for ${asset.name} raised successfully!`);
        } catch (err) {
            alert(`Failed to raise service request: ${err.message}`);
        }
    };

    if (loading) {
        return <MainLayout><div>Loading dashboard...</div></MainLayout>;
    }

    if (error) {
        return <MainLayout><div className="alert alert-danger">{error}</div></MainLayout>;
    }

    const allocatedAssets = assets.filter(a => a.status === 'Allocated').length;
    const availableAssets = assets.filter(a => a.status === 'Available').length;

    return (
        <MainLayout>
            <div className="container-fluid">
                <h2 className="mb-4">Employee Dashboard</h2>

                <div className="row">
                    <StatsCard title="My Assets" value={allocatedAssets} icon="briefcase-fill" color="primary" />
                    <StatsCard title="Available for Request" value={availableAssets} icon="check-circle-fill" color="success" />
                    {/* These would also come from an API */}
                    <StatsCard title="Service Requests" value="0" icon="tools" color="warning" />
                    <StatsCard title="Pending Audits" value="0" icon="patch-question-fill" color="danger" />
                </div>

                <hr className="my-4" />

                <h3 className="mb-3">Assets</h3>
                <div className="row">
                    {assets.length > 0 ? (
                        assets.map(asset => (
                            <AssetCard 
                                key={asset.id} 
                                asset={asset} 
                                onRequest={handleRequest} 
                                onService={handleService} 
                            />
                        ))
                    ) : (
                        <p>No assets found.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default EmployeeDashboard;
