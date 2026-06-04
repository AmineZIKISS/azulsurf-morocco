import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('adminUser');
  let isAdmin = false;

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') {
        isAdmin = true;
      }
    } catch (e) {
      isAdmin = false;
    }
  }

  if (!isAdmin) {
    // Clean up any stale values
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
