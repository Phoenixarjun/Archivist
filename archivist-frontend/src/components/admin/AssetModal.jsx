import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AssetModal = ({ show, onHide, onSave, asset }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // If an asset is passed, it's an edit, otherwise it's a new asset
        setFormData(asset || { assetNo: '', name: '', category: '', model: '', status: 'Available' });
    }, [asset, show]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{asset ? 'Edit Asset' : 'Add New Asset'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Asset Number</Form.Label>
                        <Form.Control type="text" name="assetNo" value={formData.assetNo} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Asset Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Available">Available</option>
                            <option value="Allocated">Allocated</option>
                            <option value="In Repair">In Repair</option>
                            <option value="Retired">Retired</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Asset</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssetModal;
