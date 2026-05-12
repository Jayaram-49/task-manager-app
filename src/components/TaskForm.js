import { useState, useEffect } from 'react';

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'General',
  dueDate: '',
};

const CATEGORIES = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Study'];

export default function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        category: editingTask.category,
        dueDate: editingTask.dueDate || '',
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editingTask]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Task title is required.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (editingTask) {
      onUpdate({ ...editingTask, ...form });
    } else {
      onAdd({ ...form, id: Date.now(), completed: false, createdAt: new Date().toISOString() });
    }
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const isEditing = !!editingTask;

  return (
    <div className="form-card">
      <h2>
        <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}
           style={{ color: isEditing ? '#2dd4a7' : '#6c63ff' }}></i>
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          {/* Title */}
          <div className="col-12">
            <label className="form-label fw-500" style={{ fontSize: '0.875rem' }}>
              Task Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label" style={{ fontSize: '0.875rem' }}>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details... (optional)"
              rows={2}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Priority */}
          <div className="col-sm-4">
            <label className="form-label" style={{ fontSize: '0.875rem' }}>Priority</label>
            <select className="form-select" name="priority" value={form.priority} onChange={handleChange}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-sm-4">
            <label className="form-label" style={{ fontSize: '0.875rem' }}>Category</label>
            <select className="form-select" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="col-sm-4">
            <label className="form-label" style={{ fontSize: '0.875rem' }}>Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="col-12 d-flex gap-2 justify-content-end">
            {isEditing && (
              <button type="button" className="btn-cancel" onClick={onCancelEdit}>
                Cancel
              </button>
            )}
            <button type="submit" className={isEditing ? 'btn-update' : 'btn-add'}>
              <i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
