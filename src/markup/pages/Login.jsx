import React from "react";

function Login() {
  return (
    <div className="login-page-container">
      <h2 className="login-header">Login</h2>
      <div className="login-form-container">
        <form className="login-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="login-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
