import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default NotFound;
