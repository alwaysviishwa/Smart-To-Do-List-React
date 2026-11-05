import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { getUsers, saveUsers, ADMIN_ACCOUNT } from "../utils/storage";
 
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
 
  function handleSignup(event) {
    event.preventDefault();
    setMessage("");
 
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
 
    if (!cleanName || !cleanEmail || !password) {
      setMessage("Please fill in all required fields.");
      return;
    }
 
    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }
 
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
 
    if (cleanEmail === ADMIN_ACCOUNT.email) {
      setMessage("This email is reserved for the Admin account.");
      return;
    }
 
    const users = getUsers();
    const alreadyRegistered = users.some(
      (user) => user.email === cleanEmail
    );
 
    if (alreadyRegistered) {
      setMessage("This email is already registered. Please login.");
      return;
    }
 
    const newUser = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
      password: password,
      role: "user"
    };
 
    users.push(newUser);
    saveUsers(users);
    alert("Signup successful. Please login.");
    navigate("/login");
  }
 
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="back-link" to="/">← Home</Link>
        <p className="eyebrow">CREATE YOUR ACCOUNT</p>
        <h1>Sign up</h1>
        <p className="muted-text">Start organizing your day.</p>
 
        <form onSubmit={handleSignup} className="auth-form">
          <label>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" required />
 
          <label>Email address</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" required />
 
          <label>Password</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters" required />
 
          <label>Confirm password</label>
          <input type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password again" required />
 
          {message && <p className="form-message">{message}</p>}
          <button className="primary-button full-button" type="submit">
            Create account
          </button>
        </form>
 
        <p className="auth-switch">Already registered? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}
