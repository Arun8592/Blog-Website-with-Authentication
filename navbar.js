import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>✒</span>
          <span style={styles.logoText}>Inkwell</span>
        </Link>

        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                ...styles.link,
                ...(location.pathname === '/dashboard' ? styles.activeLink : {})
              }}>
                My Posts
              </Link>
              <Link to="/create" style={styles.createBtn}>+ New Post</Link>
              <div style={styles.userBadge}>
                <span style={styles.userName}>{user.username}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Sign Out</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Sign In</Link>
              <Link to="/register" style={styles.registerBtn}>Get Started</Link>
            </>
          )}
        </div>

        <button style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {user ? (
            <>
              <Link to="/dashboard" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>My Posts</Link>
              <Link to="/create" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>+ New Post</Link>
              <span style={{ ...styles.mobileLink, color: 'var(--text-muted)', fontSize: 13 }}>@{user.username}</span>
              <button onClick={handleLogout} style={styles.mobileLogout}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: 'rgba(12,12,12,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  inner: {
    maxWidth: 1100, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: { fontSize: 22, color: 'var(--accent)' },
  logoText: {
    fontFamily: 'var(--font-display)', fontSize: 22,
    fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px',
  },
  links: { display: 'flex', alignItems: 'center', gap: 8 },
  link: {
    color: 'var(--text-muted)', fontSize: 14, padding: '6px 12px',
    borderRadius: 4, transition: 'color 0.2s',
  },
  activeLink: { color: 'var(--accent)' },
  createBtn: {
    background: 'var(--accent)', color: '#0c0c0c',
    padding: '8px 16px', borderRadius: 4, fontSize: 13,
    fontWeight: 500, transition: 'background 0.2s',
  },
  registerBtn: {
    background: 'var(--accent)', color: '#0c0c0c',
    padding: '8px 16px', borderRadius: 4, fontSize: 13, fontWeight: 500,
  },
  userBadge: { display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 },
  userName: { color: 'var(--text-muted)', fontSize: 13 },
  logoutBtn: {
    background: 'transparent', color: 'var(--text-muted)',
    border: '1px solid var(--border)', padding: '6px 12px',
    borderRadius: 4, fontSize: 13, cursor: 'pointer',
  },
  menuBtn: {
    display: 'none', background: 'transparent', color: 'var(--text)',
    border: 'none', fontSize: 20, cursor: 'pointer',
    '@media(max-width:640px)': { display: 'block' },
  },
  mobileMenu: {
    borderTop: '1px solid var(--border)', padding: '16px 24px',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  mobileLink: {
    color: 'var(--text)', fontSize: 15, padding: '8px 0',
    borderBottom: '1px solid var(--border)',
  },
  mobileLogout: {
    background: 'transparent', color: 'var(--danger)',
    border: 'none', fontSize: 15, textAlign: 'left',
    padding: '8px 0', cursor: 'pointer',
  },
};
