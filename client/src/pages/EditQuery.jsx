import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuery, updateQuery } from '../api/queries.js';

export default function EditQuery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const q = await getQuery(id);
        if (!q.is_owner) {
          navigate(`/queries/${id}`);
          return;
        }
        if (active) {
          setForm({
            title: q.title,
            body: q.body,
            category: q.category ?? 'general',
            tags: (q.tags ?? []).join(', '),
            contact_email: q.contact_email ?? '',
          });
        }
      } catch {
        if (active) setError('Failed to load the question.');
      }
    })();
    return () => {
      active = false;
    };
  }, [id, navigate]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await updateQuery(id, form);
      navigate(`/queries/${id}`);
    } catch (err) {
      const data = err.response?.data;
      if (err.response?.status === 422 && data?.details?.gibberish) {
        setError('This edit looks like gibberish and was blocked.');
      } else {
        setError(data?.error ?? 'Could not save your changes.');
      }
    } finally {
      setBusy(false);
    }
  };

  if (error && !form) return <div className="container"><p className="muted">{error}</p></div>;
  if (!form) return <div className="container">Loading…</div>;

  return (
    <div className="container narrow-wide">
      <h1>Edit question</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <div className="alert">{error}</div>}
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} required minLength={8} />
        </label>
        <label>
          Details
          <textarea name="body" value={form.body} onChange={onChange} rows={8} required />
        </label>
        <div className="grid-2">
          <label>
            Category
            <input name="category" value={form.category} onChange={onChange} />
          </label>
          <label>
            Tags (comma-separated)
            <input name="tags" value={form.tags} onChange={onChange} />
          </label>
        </div>
        <label>
          Contact email (optional)
          <input name="contact_email" type="email" value={form.contact_email} onChange={onChange} />
        </label>
        <div className="row">
          <button className="btn-primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save changes'}
          </button>
          <button type="button" className="btn-link" onClick={() => navigate(`/queries/${id}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
