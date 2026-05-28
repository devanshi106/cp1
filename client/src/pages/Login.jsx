import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(form);
      navigate(location.state?.from?.pathname ?? '/');
    } catch (err) {
      setError(err.response?.data?.error ?? 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container narrow">
      <h1>Log in</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <div className="alert">{error}</div>}
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </label>
        <button className="btn-primary" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p>
        No account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
