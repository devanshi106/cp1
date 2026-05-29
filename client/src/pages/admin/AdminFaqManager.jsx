import { useEffect, useState, useCallback } from 'react';
import { listFaqs } from '../../api/faq.js';
import { createFaq, updateFaq, setFaqOutdated, deleteFaq } from '../../api/admin.js';

const EMPTY = { category: '', question: '', answer: '', sort_order: 0 };

export default function AdminFaqManager() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setGroups(await listFaqs());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) await updateFaq(editing, form);
      else await createFaq(form);
      setForm(EMPTY);
      setEditing(null);
      await load();
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      category: item.category,
      question: item.question,
      answer: item.answer,
      sort_order: item.sort_order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this FAQ entry?')) return;
    await deleteFaq(id);
    await load();
  };

  const toggleOutdated = async (item) => {
    await setFaqOutdated(item.id, !item.is_outdated);
    await load();
  };

  return (
    <div>
      <form className="form" onSubmit={submit}>
        <h2>{editing ? 'Edit FAQ entry' : 'New FAQ entry'}</h2>
        <div className="grid-2">
          <label>
            Category
            <input name="category" value={form.category} onChange={onChange} required />
          </label>
          <label>
            Sort order
            <input name="sort_order" type="number" value={form.sort_order} onChange={onChange} />
          </label>
        </div>
        <label>
          Question
          <input name="question" value={form.question} onChange={onChange} required />
        </label>
        <label>
          Answer
          <textarea name="answer" value={form.answer} onChange={onChange} rows={4} required />
        </label>
        <div className="row">
          <button className="btn-primary" disabled={busy}>
            {editing ? 'Save changes' : 'Add entry'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                setEditing(null);
                setForm(EMPTY);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {groups.map((g) => (
        <section key={g.category}>
          <h2>{g.category}</h2>
          <table className="admin-table">
            <tbody>
              {g.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.question}
                    {item.is_outdated && <span className="badge flag">outdated</span>}
                    {item.source === 'qa' && <span className="badge">from Q&amp;A</span>}
                  </td>
                  <td className="nowrap">
                    <div className="row">
                      <button className="btn-link" onClick={() => startEdit(item)}>
                        Edit
                      </button>
                      <button className="btn-link" onClick={() => toggleOutdated(item)}>
                        {item.is_outdated ? 'Mark current' : 'Mark outdated'}
                      </button>
                      <button className="btn-link danger" onClick={() => onDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
