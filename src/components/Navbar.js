export default function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-check2-all" style={{ color: '#ffd166', fontSize: '1.5rem' }}></i>
        <span className="navbar-brand-text">
          Task<span>Manager</span>
        </span>
      </div>
      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginLeft: 'auto' }}>
        Stay organized. Get things done.
      </span>
    </nav>
  );
}
