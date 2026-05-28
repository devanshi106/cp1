import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>FAQ Platform</h1>
      <p className="lead">
        A self-improving knowledge base: an AI chatbot over a curated FAQ, structured query intake
        with quality gates, and a community Q&amp;A forum whose best answers are promoted back into
        the FAQ.
      </p>
      {user ? (
        <p>Welcome back, {user.name}. The feature pillars land in the next milestones.</p>
      ) : (
        <p>
          Create an account to ask questions, answer the community, and earn reputation.
        </p>
      )}
      <ul className="feature-grid">
        <li>📚 FAQ + AI chatbot</li>
        <li>📝 Ask a query (quality-gated)</li>
        <li>💬 Q&amp;A forum + reputation</li>
        <li>🛡️ Moderation &amp; automated maintenance</li>
      </ul>
    </div>
  );
}
