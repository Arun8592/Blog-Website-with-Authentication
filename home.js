import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { API } = useAuth();

  useEffect(() => {
    fetch(`${API}/posts`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => { setError('Failed to load posts.'); setLoading(false); });
  }, []);

  return (
    <main style={styles.main}>
      <div className="container">
        <header style={styles.hero}>
          <p style={styles.eyebrow}>Welcome to</p>
          <h1 style={styles.headline}>Inkwell</h1>
          <p style={styles.sub}>
            Stories, ideas, and thoughts — crafted with purpose.
          </p>
          <div style={styles.divider} />
        </header>

        {loading && <div className="spinner" />}
        {error && <p className="error-msg">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>✒</span>
            <h3 style={styles.emptyTitle}>No stories yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
              Be the first to publish something worth reading.
            </p>
          </div>
        )}

        <div className="page-fade">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: { paddingTop: 64, paddingBottom: 80, minHeight: '100vh' },
  hero: { textAlign: 'center', paddingBottom: 48, paddingTop: 24 },
  eyebrow: {
    color: 'var(--accent)', fontSize: 13, fontWeight: 500,
    letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12,
  },
  headline: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 88px)',
    fontWeight: 700, letterSpacing: '-2px', lineHeight: 1,
    color: 'var(--text)', marginBottom: 20,
  },
  sub: {
    color: 'var(--text-muted)', fontSize: 18, maxWidth: 420,
    margin: '0 auto', lineHeight: 1.6,
  },
  divider: {
    width: 60, height: 2, background: 'var(--accent)',
    margin: '32px auto 0',
  },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: 48, display: 'block', marginBottom: 16 },
  emptyTitle: {
    fontFamily: 'var(--font-display)', fontSize: 24,
    marginBottom: 8, color: 'var(--text)',
  },
};
