import { Link } from "react-router";
 
function Home() {
  return (
    <main className="home-page">
      <nav className="top-nav">
        <Link className="brand" to="/">Smart To-Do</Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link className="button-link" to="/signup">Create account</Link>
        </div>
      </nav>
 
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PLAN • FOCUS • COMPLETE</p>
          <h1>Make every day more productive.</h1>
          <p className="hero-text">
            Organize your tasks, track deadlines and understand your
            progress with one simple dashboard.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/signup">Get started</Link>
            <Link className="secondary-button" to="/login">I already have an account</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-top">
            <span>Daily focus</span><span className="status-dot">●</span>
          </div>
          <h2>Small steps add up.</h2>
          <div className="sample-task done">✓ Complete assignment</div>
          <div className="sample-task">○ Review class notes</div>
          <div className="sample-task">○ Plan tomorrow</div>
          <div className="sample-progress"><span /></div>
          <small>Keep moving forward</small>
        </div>
      </section>
 
      <section className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>Manage tasks</h3>
          <p>Add tasks, set deadlines and mark work as completed.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">◷</div>
          <h3>Track time</h3>
          <p>See a live clock and countdown for your next deadline.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">▥</div>
          <h3>View progress</h3>
          <p>Check task statistics and your recent productivity graph.</p>
        </article>
      </section>
 
      <footer className="site-footer">Smart To-Do List • Student project</footer>
    </main>
  );
}
 
export default Home;
