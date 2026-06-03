import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, API } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      login(data.user, data.token);
      navigate('/');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="page-fade">
        <div style={styles.cardHeader}>
          <span style={styles.icon}>✒</span>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.sub}>Start writing your story</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text" placeholder="yourname" required minLength={3}
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email" placeholder="you@example.com" required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password" placeholder="Min. 6 characters" required minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" style={styles.submit} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.footerLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 64px)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
  },
  card: {
    background: 'var(--bg-2)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '48px 40px', width: '100%', maxWidth: 420,
    boxShadow: 'var(--shadow)',
  },
  cardHeader: { textAlign: 'center', marginBottom: 32 },
  icon: { fontSize: 32, display: 'block', marginBottom: 12 },
  title: { fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, marginBottom: 6 },
  sub: { color: 'var(--text-muted)', fontSize: 14 },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.3px' },
  submit: { width: '100%', padding: '14px', fontSize: 15, marginTop: 4 },
  footer: { textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 },
  footerLink: { color: 'var(--accent)', fontWeight: 500 },
};
