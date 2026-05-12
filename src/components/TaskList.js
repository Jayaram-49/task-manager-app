import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onEdit, onDelete, filter, search }) {
  const filtered = tasks.filter(task => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed) ||
      (filter === 'high' && task.priority === 'high');

    const matchSearch =
      !search ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));

    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <i className="bi bi-inbox"></i>
        </div>
        <h4>No tasks found</h4>
        <p style={{ fontSize: '0.9rem' }}>
          {search ? 'Try a different search term.' : 'Add a new task to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {filtered.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
