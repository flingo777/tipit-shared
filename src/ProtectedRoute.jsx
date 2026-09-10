import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/** Gates a route behind a Supabase session. Redirects to /login otherwise. */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="tipit-app tipit-centered">
        <p className="tipit-muted tipit-mono">loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
