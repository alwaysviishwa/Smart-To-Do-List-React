import { Link } from "react-router";
 
function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>404</h1>
        <p className="muted-text">The page you are looking for does not exist.</p>
        <Link className="primary-button full-button button-as-link" to="/">Go to Home</Link>
      </section>
    </main>
  );
}
 
export default NotFound;
