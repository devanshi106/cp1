import { useEffect, useState } from 'react';
import { getMetrics } from '../../api/admin.js';

const CARDS = [
  { key: 'users', label: 'Users' },
  { key: 'banned', label: 'Banned' },
  { key: 'queries', label: 'Questions' },
  { key: 'open', label: 'Open' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'answers', label: 'Answers' },
  { key: 'faqs', label: 'FAQ entries' },
  { key: 'pending_moderation', label: 'Pending moderation' },
];

export default function AdminOverview() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getMetrics().then(setMetrics).catch(() => setMetrics(null));
  }, []);

  if (!metrics) return <p>Loading metrics…</p>;

  return (
    <div className="metric-grid">
      {CARDS.map((c) => (
        <div className="metric-card" key={c.key}>
          <strong>{metrics[c.key] ?? 0}</strong>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  );
}
