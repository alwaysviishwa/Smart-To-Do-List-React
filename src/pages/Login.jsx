import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ADMIN_ACCOUNT, getUsers, saveCurrentUser
} from "../utils/storage";
 
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  function handleLogin(event) {
    event.preventDefault();
    setMessage("");
 
    const cleanEmail = email.trim().toLowerCase();
 
    // Check the classroom demo Admin account.
    if (cleanEmail === ADMIN_ACCOUNT.email &&
        password === ADMIN_ACCOUNT.password) {
      const adminUser = {
        name: "Administrator",
        email: ADMIN_ACCOUNT.email,
        role: "admin"
      };
      saveCurrentUser(adminUser);
      navigate("/admin-dashboard");
      return;
    }
 
    // Check a normal account created through Signup.
    const users = getUsers();
    const matchingUser = users.find(
      (user) => user.email === cleanEmail && user.password === password
    );
 
    if (!matchingUser) {
      setMessage("Incorrect email or password.");
      return;
    }
 
    saveCurrentUser(matchingUser);
    navigate("/user-dashboard");
  }
 
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="back-link" to="/">← Home</Link>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        <p className="muted-text">Continue to your dashboard.</p>
 
        <form onSubmit={handleLogin} className="auth-form">
          <label>Email address</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" required />
 
          <label>Password</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" required />
 
          {message && <p className="form-message">{message}</p>}
          <button className="primary-button full-button" type="submit">
            Login
          </button>
        </form>
 
        <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
        <p className="demo-note">Admin demo credentials are provided in the testing section in this guide.
          Do not display credentials on a public login page.</p>
      </section>
    </main>
  );
}
 
export default Login;
