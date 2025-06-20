import React from 'react';
// Import the AddEmployeeForm component 
import AddAdminForm from '../../components/Admin/AddAdminForm/AddAdminForm';
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function AddAdmin(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddAdminForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;