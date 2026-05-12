export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        title="Mark complete"
      />

      {/* Body */}
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        <div className="task-meta">
          <span className={`badge-priority priority-${task.priority}`}>
            {task.priority}
          </span>
          <span className="badge-category">
            <i className="bi bi-tag-fill me-1" style={{ fontSize: '0.65rem' }}></i>
            {task.category}
          </span>
          {task.dueDate && (
            <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
              <i className={`bi ${isOverdue ? 'bi-exclamation-circle' : 'bi-calendar3'} me-1`}></i>
              {isOverdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button className="btn-icon edit" onClick={() => onEdit(task)} title="Edit task">
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(task.id)} title="Delete task">
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
}
