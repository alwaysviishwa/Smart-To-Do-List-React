import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../components/TempClock";
import { getCurrentUser, getTasks, saveTasks, clearCurrentUser }
  from "../utils/storage";
 
function UserDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [allTasks, setAllTasks] = useState(() => getTasks());
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
 
  const userTasks = allTasks.filter(
    (task) => task.userEmail === currentUser.email
  );
 
  function updateAllTasks(updatedTasks) {
    setAllTasks(updatedTasks);
    saveTasks(updatedTasks);
  }
 
  function handleAddTask(event) {
    event.preventDefault();
    const cleanTitle = taskTitle.trim();
    if (!cleanTitle) return;
 
    const newTask = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      userEmail: currentUser.email,
      title: cleanTitle,
      dueDate: dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
 
    updateAllTasks([...allTasks, newTask]);
    setTaskTitle("");
    setDueDate("");
  }
 
  function handleToggleTask(taskId) {
    const updatedTasks = allTasks.map((task) => {
      if (task.id !== taskId) return task;
      const willBeCompleted = !task.completed;
      return {
        ...task,
        completed: willBeCompleted,
        completedAt: willBeCompleted ? new Date().toISOString() : null
      };
    });
    updateAllTasks(updatedTasks);
  }
 
  function handleDeleteTask(taskId) {
    const updatedTasks = allTasks.filter((task) => task.id !== taskId);
    updateAllTasks(updatedTasks);
  }
 
  function handleLogout() {
    clearCurrentUser();
    navigate("/login");
  }
 
  const completedCount = userTasks.filter((task) => task.completed).length;
  const pendingCount = userTasks.length - completedCount;
  const productivity = userTasks.length === 0
    ? 0
    : Math.round((completedCount / userTasks.length) * 100);
 
  const nextTask = userTasks
    .filter((task) => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
 
  const lastSevenDays = useMemo(() => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 6);
 
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      const count = userTasks.filter((task) => {
        if (!task.completedAt) return false;
        const completedDate = new Date(task.completedAt);
        return completedDate.toDateString() === date.toDateString();
      }).length;
      return {
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        count: count
      };
    });
  }, [userTasks]);
 
  const maximumDailyCount = Math.max(
    1, ...lastSevenDays.map((day) => day.count)
  );
 
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="brand">Smart To-Do</span>
          <p className="header-subtitle">Your personal workspace</p>
        </div>
        <div className="header-actions">
          <span className="welcome-name">Hello, {currentUser.name}</span>
          <button className="outline-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
 
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">USER DASHBOARD</p>
          <h1>Make today count.</h1>
          <p className="muted-text">Add a task and take one step forward.</p>
        </div>
        <Clock />
      </section>
 
      <section className="stats-grid">
        <article className="stat-card"><span>Total tasks</span><strong>{userTasks.length}</strong></article>
        <article className="stat-card"><span>Completed</span><strong>{completedCount}</strong></article>
        <article className="stat-card"><span>Pending</span><strong>{pendingCount}</strong></article>
        <article className="stat-card"><span>Productivity</span><strong>{productivity}%</strong></article>
      </section>
 
      <section className="dashboard-grid">
        <div className="panel task-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">YOUR WORK</p><h2>My tasks</h2></div>
            <span className="count-pill">{userTasks.length} total</span>
          </div>
 
          <form className="add-task-form" onSubmit={handleAddTask}>
            <input value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What do you need to do?" required />
            <input type="datetime-local" value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              aria-label="Task deadline" />
            <button className="primary-button" type="submit">Add task</button>
          </form>
 
          {userTasks.length === 0 ? (
            <div className="empty-state">
              <strong>No tasks yet</strong>
              <p>Add your first task using the box above.</p>
            </div>
          ) : (
            <div className="task-list">
              {userTasks.map((task) => (
                <article className={`task-item ${task.completed ? "task-completed" : ""}`} key={task.id}>
                  <button className="check-button"
                    onClick={() => handleToggleTask(task.id)}
                    aria-label={task.completed ? "Mark as pending" : "Mark as completed"}>
                    {task.completed ? "✓" : "○"}
                  </button>
                  <div className="task-information">
                    <strong>{task.title}</strong>
                    <small>{task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleString()}` : "No deadline added"}</small>
                  </div>
                  <span className={`task-status ${task.completed ? "status-done" : "status-pending"}`}>
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                  <button className="delete-button" onClick={() => handleDeleteTask(task.id)}
                    aria-label="Delete task">Delete</button>
                </article>
              ))}
            </div>
          )}
        </div>
 
        <aside className="side-panels">
          <section className="panel deadline-panel">
            <p className="eyebrow">UP NEXT</p>
            <h2>Next deadline</h2>
            {nextTask ? <DeadlineCountdown task={nextTask} /> :
              <p className="muted-text">Add a deadline to a pending task to see its countdown.</p>}
          </section>
 
          <section className="panel chart-panel">
            <p className="eyebrow">LAST 7 DAYS</p>
            <h2>Weekly progress</h2>
            <div className="weekly-chart">
              {lastSevenDays.map((day) => (
                <div className="chart-column" key={day.label + day.count}>
                  <span className="chart-value">{day.count}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${(day.count / maximumDailyCount) * 100}%` }} />
                  </div>
                  <small>{day.label}</small>
                </div>
              ))}
            </div>
            <p className="chart-note">Tasks are counted on the day you mark them completed.</p>
          </section>
        </aside>
      </section>
    </main>
  );
}
 
function DeadlineCountdown({ task }) {
  const [now, setNow] = useState(Date.now());
 
  useEffect(() => {
    const timerId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timerId);
  }, []);
 
  const difference = new Date(task.dueDate).getTime() - now;
 
  if (difference <= 0) {
    return <div className="countdown"><strong>{task.title}</strong><span className="overdue-text">Deadline reached / overdue</span></div>;
  }
 
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
 
  return (
    <div className="countdown">
      <strong>{task.title}</strong>
      <div className="countdown-values">
        <span><b>{days}</b><small>Days</small></span>
        <span><b>{hours}</b><small>Hours</small></span>
        <span><b>{minutes}</b><small>Minutes</small></span>
        <span><b>{seconds}</b><small>Seconds</small></span>
      </div>
    </div>
  );
}
 
export default UserDashboard;
