import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getQuery, deleteQuery } from '../api/queries.js';

export default function QueryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const q = await getQuery(id);
        if (active) setQuery(q);
      } catch (err) {
        if (active) setError(err.response?.status === 404 ? 'Question not found.' : 'Failed to load.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm('Delete this question?')) return;
    await deleteQuery(id);
    navigate('/queries');
  };

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container"><p className="muted">{error}</p></div>;

  return (
    <div className="container">
      <Link to="/queries" className="back-link">
        ← All questions
      </Link>

      <div className="detail-head">
        <h1>{query.title}</h1>
        {query.is_owner && (
          <div className="row">
            <Link to={`/queries/${id}/edit`} className="btn-link">
              Edit
            </Link>
            <button className="btn-link danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="query-meta">
        <span className={`badge status-${query.status}`}>{query.status}</span>
        <span className="cat">{query.category}</span>
        {query.tags?.map((t) => (
          <span key={t} className="tag">
            #{t}
          </span>
        ))}
        <span className="by">by {query.author?.name ?? 'Unknown'}</span>
      </div>

      {query.is_flagged_duplicate && (
        <div className="alert info">
          Flagged as a possible duplicate{query.similarity_score
            ? ` (${Math.round(query.similarity_score * 100)}% match)`
            : ''}
          {query.duplicate_of && (
            <>
              {' — '}
              <Link to={`/queries/${query.duplicate_of}`}>view the similar question</Link>
            </>
          )}
          . A moderator will review it.
        </div>
      )}

      <article className="query-body">{query.body}</article>

      {query.was_auto_corrected && (
        <p className="hint">This text was grammar-corrected by the author before posting.</p>
      )}

      {query.screenshots?.length > 0 && (
        <div className="screenshots">
          {query.screenshots.map((src) => (
            <a key={src} href={src} target="_blank" rel="noreferrer">
              <img src={src} alt="screenshot" />
            </a>
          ))}
        </div>
      )}

      <hr />
      <p className="muted">Answers and the solution engine arrive in Milestone 3.</p>
    </div>
  );
}
