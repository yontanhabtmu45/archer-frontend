import React from 'react';
import { Link } from 'react-router';

function AdminMenu() {
  return (
    <section>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">Dashboard</Link>
        <Link to="/admin/vehicles" className="list-group-item">Vehicles</Link>
        <Link to="/admin/add-vehicle" className="list-group-item">New Vehicles</Link>
        <Link to="/admin/add-admin" className="list-group-item">Add admin</Link>
        <Link to="/admin/admins" className="list-group-item">Admins</Link>
        <Link to="/admin/add-steel" className="list-group-item">Add steels</Link>
        <Link to="/admin/steels" className="list-group-item">steels</Link>
      </div>
    </section>
  );
}

export default AdminMenu;