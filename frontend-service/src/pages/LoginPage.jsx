import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm.jsx";
import { AuthPanel } from "../components/AuthPanel.jsx";
import { StatusMessage } from "../components/StatusMessage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(credentials) {
    setError("");
    setIsSubmitting(true);

    try {
      await login(credentials);
      navigate(location.state?.from?.pathname || "/protected", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPanel
      title="Login"
      footer={
        <p>
          Need an account? <Link to="/register">Register</Link>
        </p>
      }
    >
      <StatusMessage message={error} tone="error" />
      <AuthForm
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Login"
      />
    </AuthPanel>
  );
}
