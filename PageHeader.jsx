import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-4">
      <h1>{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;