// Import the AddVehicleForm component
import  Dashboard from '../../components/Admin/Dashboard/Dashboard'
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
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle;