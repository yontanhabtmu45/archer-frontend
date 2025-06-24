import React from 'react';
import { Link } from 'react-router-dom';

function Four04() {
  return (
    <section className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", background: "#f7f4e7" }}>
      <div className="text-center p-4 rounded shadow-sm bg-white" style={{ maxWidth: 420 }}>
        <h1 className="fw-bold text-primary mb-2" style={{ fontSize: "4rem" }}>404</h1>
        <h3 className="text-danger fw-bold mb-3">Page Not Found</h3>
        <p className="mb-4 text-secondary">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary fw-bold">
          Go to Home
        </Link>
      </div>
    </section>
  );
}

export default Four04;