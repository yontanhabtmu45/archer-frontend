import React from "react";
import { Link } from "react-router";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function Dashboard() {
  return (
    <section className="main-cars">
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <section className="services-section">
              <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
                <p>
                  Welcome to the admin dashboard. Here you can manage all
                  aspects of the application.
                </p>
                <div className="admin-links">
                  <Link to="/admin/orders" className="btn btn-primary">
                    Manage Vehicles
                  </Link>
                  <Link to="/admin/customers" className="btn btn-success">
                    Manage Steels
                  </Link>
                  <Link to="/admin/employees" className="btn btn-secondary">
                    Manage Admins
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
