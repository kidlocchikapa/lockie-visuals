import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
