import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        FAQ&nbsp;Platform
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/queries">Questions</Link>
        {user && <Link to="/ask">Ask</Link>}
        {isAdmin && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn-link" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn-primary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
