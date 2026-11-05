import { useNavigate } from "react-router";
import Clock from "../components/Clock";
import { clearCurrentUser, getTasks, getUsers } from "../utils/storage";
 
function AdminDashboard() {
  const navigate = useNavigate();
  const users = getUsers();
  const tasks = getTasks();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
 
  function handleLogout() {
    clearCurrentUser();
    navigate("/login");
  }
 
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="brand">Smart To-Do</span>
          <p className="header-subtitle">Administration area</p>
        </div>
        <div className="header-actions">
          <span className="admin-badge">ADMIN</span>
          <button className="outline-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
 
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">ADMIN DASHBOARD</p>
          <h1>Project overview</h1>
          <p className="muted-text">View registered users and task activity.</p>
        </div>
        <Clock />
      </section>
 
      <section className="stats-grid">
        <article className="stat-card"><span>Registered users</span><strong>{users.length}</strong></article>
        <article className="stat-card"><span>Total tasks</span><strong>{tasks.length}</strong></article>
        <article className="stat-card"><span>Completed tasks</span><strong>{completedTasks}</strong></article>
        <article className="stat-card"><span>Pending tasks</span><strong>{pendingTasks}</strong></article>
      </section>
 
      <section className="admin-tables">
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">ACCOUNTS</p><h2>Registered users</h2></div></div>
          {users.length === 0 ? <p className="muted-text">No users have signed up yet.</p> :
            <div className="table-scroll"><table>
              <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
              <tbody>{users.map((user) => (
                <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>
              ))}</tbody>
            </table></div>}
        </div>
 
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">ACTIVITY</p><h2>All tasks</h2></div></div>
          {tasks.length === 0 ? <p className="muted-text">No tasks have been created yet.</p> :
            <div className="table-scroll"><table>
              <thead><tr><th>Task</th><th>Created by</th><th>Status</th><th>Deadline</th></tr></thead>
              <tbody>{tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td><td>{task.userEmail}</td>
                  <td>{task.completed ? "Completed" : "Pending"}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleString() : "Not set"}</td>
                </tr>
              ))}</tbody>
            </table></div>}
        </div>
      </section>
    </main>
  );
}
 
export default AdminDashboard;
