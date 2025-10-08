import React from 'react';

const AssetCard = ({ asset, onRequest, onService }) => (
    <div className="col-md-4 mb-4">
        <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{asset.name}</h5>
            </div>
            <div className="card-body">
                <p className="text-muted mb-2"><strong>Category:</strong> {asset.category}</p>
                <p className="text-muted mb-2"><strong>Model:</strong> {asset.model}</p>
                <p className="text-muted mb-2"><strong>Asset No:</strong> {asset.assetNo}</p>
                <span className={`badge ${asset.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                    {asset.status}
                </span>
            </div>
            <div className="card-footer bg-transparent">
                {asset.status === 'Available' && (
                    <button className="btn btn-primary btn-sm w-100" onClick={() => onRequest(asset)}>
                        <i className="bi bi-plus-circle me-1"></i>Request Asset
                    </button>
                )}
                {asset.status === 'Allocated' && (
                    <button className="btn btn-warning btn-sm w-100" onClick={() => onService(asset)}>
                        <i className="bi bi-tools me-1"></i>Raise Service Request
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default AssetCard;
