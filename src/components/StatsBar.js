export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const high = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const overdue = tasks.filter(
    t => t.dueDate && !t.completed && new Date(t.dueDate) < new Date()
  ).length;

  return (
    <div className="stats-bar">
      <div className="container d-flex justify-content-center flex-wrap">
        <div className="stat-item">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#6c63ff' }}>{active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#2dd4a7' }}>{completed}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#ef4444' }}>{high}</div>
          <div className="stat-label">High Priority</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#f59e0b' }}>{overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>
    </div>
  );
}
