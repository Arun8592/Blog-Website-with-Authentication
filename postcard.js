import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const excerpt = post.content.replace(/[#*`]/g, '').substring(0, 160) + '...';
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article style={styles.card}>
      <div style={styles.meta}>
        <span style={styles.author}>By {post.author}</span>
        <span style={styles.dot}>·</span>
        <time style={styles.date}>{date}</time>
      </div>
      <Link to={`/post/${post.id}`} style={styles.titleLink}>
        <h2 style={styles.title}>{post.title}</h2>
      </Link>
      <p style={styles.excerpt}>{excerpt}</p>
      {post.tags?.length > 0 && (
        <div style={styles.tags}>
          {post.tags.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      <Link to={`/post/${post.id}`} style={styles.readMore}>
        Read Article →
      </Link>
    </article>
  );
}

const styles = {
  card: {
    padding: '32px 0',
    borderBottom: '1px solid var(--border)',
    animation: 'fadeUp 0.4s ease forwards',
  },
  meta: {
    display: 'flex', alignItems: 'center', gap: 8,
    marginBottom: 12,
  },
  author: { color: 'var(--accent)', fontSize: 13, fontWeight: 500 },
  dot: { color: 'var(--text-dim)' },
  date: { color: 'var(--text-muted)', fontSize: 13 },
  titleLink: { display: 'block', marginBottom: 10 },
  title: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700, lineHeight: 1.3, color: 'var(--text)',
    transition: 'color 0.2s',
  },
  excerpt: { color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15, marginBottom: 16 },
  tags: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  tag: {
    background: 'var(--bg-3)', color: 'var(--text-muted)',
    padding: '3px 10px', borderRadius: 100, fontSize: 12,
    border: '1px solid var(--border)',
  },
  readMore: {
    color: 'var(--accent)', fontSize: 13, fontWeight: 500,
    letterSpacing: '0.3px', transition: 'opacity 0.2s',
  },
};
