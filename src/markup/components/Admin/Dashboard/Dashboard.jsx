import React from "react";
import { Link } from "react-router";


function Dashboard() {
  return (
    <section className="container-fluid main-dashboard">
      <div className="row px-2 admin-pages">
        <div className="col-md-9 admin-right-side">
            <section className="services-section">
              <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
                <p>
                  Welcome to the admin dashboard. Here you can manage all
                  aspects of the application.
                </p>
                <div className="admin-links">
                  <Link to="/admin/vehicles" className="btn btn-primary">
                    Manage Vehicles
                  </Link>
                  <Link to="/admin/steels" className="btn btn-success">
                  {/* <span className="dashboard-icon"><FaWarehouse /></span> */}
                    Manage Steels
                  </Link>
                  <Link to="/admin/admins" className="btn btn-secondary">
                    Manage Admins
                  </Link>
                  <Link to="/admin/add-vehicle" className="btn btn-success">
                    add Vehicle
                  </Link>
                  <Link to="/admin/add-steel" className="btn btn-primary">
                    Add Steel
                  </Link>
                  <Link to="/admin/add-admin" className="btn btn-secondary">
                    Add Admin
                  </Link>
                </div>
              </div>
            </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
