import { useEffect, useState } from 'react';
import { listJobs, runJob } from '../../api/admin.js';

export default function AdminMaintenance() {
  const [jobs, setJobs] = useState([]);
  const [running, setRunning] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    listJobs().then(setJobs).catch(() => setJobs([]));
  }, []);

  const onRun = async (name) => {
    setRunning(name);
    try {
      const res = await runJob(name);
      setResults((r) => ({ ...r, [name]: res.result }));
    } finally {
      setRunning(null);
    }
  };

  return (
    <div>
      <p className="lead">Trigger scheduled maintenance jobs on demand.</p>
      {jobs.length === 0 ? (
        <p className="muted">No jobs registered.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Schedule</th>
              <th>Description</th>
              <th>Run</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.name}>
                <td><code>{j.name}</code></td>
                <td className="small"><code>{j.schedule}</code></td>
                <td className="small">{j.description}</td>
                <td>
                  <button className="btn-link" disabled={running === j.name} onClick={() => onRun(j.name)}>
                    {running === j.name ? 'Running…' : 'Run now'}
                  </button>
                  {results[j.name] && (
                    <div className="muted small">{JSON.stringify(results[j.name])}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
