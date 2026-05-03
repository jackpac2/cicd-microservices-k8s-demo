import { useEffect, useState } from "react";
import { StatusMessage } from "../components/StatusMessage.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getProtectedResource } from "../services/protectedApi.js";

export function ProtectedPage() {
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProtectedResource() {
      setError("");
      setIsLoading(true);

      try {
        const result = await getProtectedResource(token);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProtectedResource();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <section className="protected-panel" aria-labelledby="protected-title">
      <div>
        <p className="eyebrow">Secured district</p>
        <h1 id="protected-title">Safehouse Route</h1>
      </div>

      {isLoading && <StatusMessage message="Checking access level..." />}
      <StatusMessage message={error} tone="error" />

      {data && (
        <div className="protected-result">
          <span>Dispatch response</span>
          <strong>{data.message}</strong>
        </div>
      )}

      <button className="secondary-button" type="button" onClick={logout}>
        Logout
      </button>
    </section>
  );
}
