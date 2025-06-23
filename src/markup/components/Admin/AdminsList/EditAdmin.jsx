import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../../../../services/admin.service';

function EditAdmin() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!id) {
        setError('Invalid admin ID.');
        setLoading(false);
        return;
      }
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await adminService.getAdmin(id);
        if (response.status === 'success') {
          setAdmin(response.data);
        } else {
          setError(response.message || 'Failed to fetch admin.');
        }
      } catch (err) {
        setError('Error fetching admin.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await adminService.updateAdmin(id, admin);
      if (response.status === 'success') {
        setSuccess('Admin updated successfully!');
        setTimeout(() => Navigate('/admin/admins'), 1200);
      } else {
        setError(response.message || 'Failed to update admin.');
      }
    } catch (err) {
      setError('Error updating admin.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!admin) return null;

  return (
    <div className="edit-admin-container">
      <h2>Edit Admin</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="edit-admin-form">
        <div className="mb-3">
          <label>User Name</label>
          <input
            name="admin_user_name"
            value={admin.admin_user_name || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>First Name</label>
          <input
            name="admin_first_name"
            value={admin.admin_first_name || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            name="admin_last_name"
            value={admin.admin_last_name || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="admin_email"
            type="email"
            value={admin.admin_email || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <input
            name="admin_role"
            value={admin.admin_role || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Admin</button>
      </form>
    </div>
  );
}

export default EditAdmin;