import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm.jsx";
import { AuthPanel } from "../components/AuthPanel.jsx";
import { StatusMessage } from "../components/StatusMessage.jsx";
import { registerUser } from "../services/authApi.js";

export function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(credentials) {
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await registerUser(credentials);
      setMessage("Registration successful. Redirecting to login...");
      window.setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPanel
      title="Register"
      footer={
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      }
    >
      <StatusMessage message={message} tone="success" />
      <StatusMessage message={error} tone="error" />
      <AuthForm
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Create account"
      />
    </AuthPanel>
  );
}
