import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Oops! We can't find that page.</h1>
      <p>Whoops! That kind of page doesn't exist around here.</p>
      <Link to="/">← Go back to the homepage</Link>
    </main>
  );
}

export default NotFoundPage;
