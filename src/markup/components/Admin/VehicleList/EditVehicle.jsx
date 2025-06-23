import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import steelService from '../../../../services/steel.service';

function EditSteel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steel, setSteel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Invalid steel ID.');
      setLoading(false);
      return;
    }
    const fetchSteel = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await steelService.getSteel(id);
        if (response.status === 'success') {
          setSteel(response.data);
        } else {
          setError(response.message || 'Failed to fetch steel.');
        }
      } catch (err) {
        setError('Error fetching steel.');
      } finally {
        setLoading(false);
      }
    };
    fetchSteel();
  }, [id]);

  const handleChange = (e) => {
    setSteel({ ...steel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await steelService.updateSteel(id, steel);
      if (response.status === 'success') {
        setSuccess('Steel updated successfully!');
        setTimeout(() => navigate('/admin/steels'), 1200);
      } else {
        setError(response.message || 'Failed to update steel.');
      }
    } catch (err) {
      setError('Error updating steel.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!steel) return null;

  return (
    <div className="edit-steel-container">
      <h2>Edit Steel</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="edit-steel-form">
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            value={steel.name || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Type</label>
          <input
            name="type"
            value={steel.type || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            value={steel.quantity || ''}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {/* Add more fields as needed */}
        <button type="submit" className="btn btn-primary">Update Steel</button>
      </form>
    </div>
  );
}

export default EditSteel;