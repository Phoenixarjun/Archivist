import React from 'react';

const StatsCard = ({ title, value, icon, color = 'primary' }) => (
    <div className="col-md-3 mb-4">
        <div className={`card border-${color} shadow-sm h-100`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-muted mb-2">{title}</h6>
                        <h3 className="mb-0">{value}</h3>
                    </div>
                    <div className={`text-${color}`} style={{ fontSize: '2.5rem' }}>
                        <i className={`bi bi-${icon}`}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default StatsCard;
