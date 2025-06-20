import React from 'react';
// Import the AddSteelForm component
import  AddSteelForm from '../../components/Admin/AddSteelForm/AddSteelForm'
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function AddSteel(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddSteelForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSteel;