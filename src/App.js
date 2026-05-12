import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const SAMPLE_TASKS = [
  {
    id: 1,
    title: 'Review project requirements',
    description: 'Go through all client specifications and make notes.',
    priority: 'high',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables.',
    priority: 'medium',
    category: 'Shopping',
    dueDate: '',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Morning workout',
    description: '30 minutes cardio + stretching.',
    priority: 'low',
    category: 'Health',
    dueDate: '',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = 'taskflow_tasks';
const FILTERS = ['all', 'active', 'completed', 'high'];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : SAMPLE_TASKS;
    } catch {
      return SAMPLE_TASKS;
    }
  });

  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const handleAdd = useCallback((task) => {
    setTasks(prev => [task, ...prev]);
    showToast('✅ Task added!');
  }, [showToast]);

  const handleUpdate = useCallback((updated) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setEditingTask(null);
    showToast('✏️ Task updated!');
  }, [showToast]);

  const handleToggle = useCallback((id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('🗑️ Task deleted.');
  }, [showToast]);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
    showToast('🧹 Completed tasks cleared!');
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <StatsBar tasks={tasks} />

      <div className="main-container">
        <TaskForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />

        {/* Filter + Search Bar */}
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'high' && ' Priority'}
            </button>
          ))}
          <input
            type="text"
            className="search-input"
            placeholder="🔍  Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {tasks.some(t => t.completed) && (
            <button
              className="filter-btn ms-auto"
              onClick={handleClearCompleted}
              style={{ color: '#ef4444', borderColor: '#fecaca' }}
            >
              <i className="bi bi-trash3 me-1"></i> Clear Done
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="tasks-section">
          <h3>
            {filter === 'all' ? 'All Tasks' :
             filter === 'active' ? 'Active Tasks' :
             filter === 'completed' ? 'Completed Tasks' : 'High Priority'}
          </h3>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filter={filter}
            search={search}
          />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className="toast-msg">{toast}</div>
        </div>
      )}
    </div>
  );
}
