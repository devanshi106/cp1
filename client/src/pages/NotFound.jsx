import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container narrow">
      <h1>404</h1>
      <p>That page doesn’t exist.</p>
      <Link to="/" className="btn-primary">
        Go home
      </Link>
    </div>
  );
}
