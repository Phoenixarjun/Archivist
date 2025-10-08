import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { apiService } from '../../services/apiService';
import AssetModal from '../../components/admin/AssetModal';
import { Button } from 'react-bootstrap';

const AssetManagementPage = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);

    const fetchAssets = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiService.get('assets');
            setAssets(data);
        } catch (err) {
            setError('Failed to fetch assets.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const handleShowAddModal = () => {
        setEditingAsset(null);
        setShowModal(true);
    };

    const handleShowEditModal = (asset) => {
        setEditingAsset(asset);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAsset(null);
    };

    const handleSaveAsset = async (assetData) => {
        try {
            if (editingAsset) {
                // Update existing asset
                await apiService.put(`assets/${editingAsset.id}`, assetData);
            } else {
                // Create new asset
                await apiService.post('assets', assetData);
            }
            handleCloseModal();
            fetchAssets(); // Refresh the list
        } catch (err) {
            alert(`Failed to save asset: ${err.message}`);
        }
    };

    const handleDeleteAsset = async (assetId) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await apiService.delete(`assets/${assetId}`);
                fetchAssets(); // Refresh the list
            } catch (err) {
                alert(`Failed to delete asset: ${err.message}`);
            }
        }
    };

    if (loading && assets.length === 0) {
        return <MainLayout><div>Loading assets...</div></MainLayout>;
    }

    if (error) {
        return <MainLayout><div className="alert alert-danger">{error}</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Asset Management</h2>
                    <Button variant="primary" onClick={handleShowAddModal}>
                        <i className="bi bi-plus-circle me-2"></i>Add New Asset
                    </Button>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Asset No</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Model</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.length > 0 ? (
                                        assets.map(asset => (
                                            <tr key={asset.id}>
                                                <td>{asset.assetNo}</td>
                                                <td>{asset.name}</td>
                                                <td>{asset.category}</td>
                                                <td>{asset.model}</td>
                                                <td>
                                                    <span className={`badge ${asset.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                                                        {asset.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEditModal(asset)}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAsset(asset.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No assets found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AssetModal 
                show={showModal} 
                onHide={handleCloseModal} 
                onSave={handleSaveAsset} 
                asset={editingAsset} 
            />
        </MainLayout>
    );
};

export default AssetManagementPage;
