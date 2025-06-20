import React from 'react';
// Import the AddVehicleForm component
import  AddVehicleForm from '../../components/Admin/AddVehicleForm/AddVehicleForm'
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function AddVehicle() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddVehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle;