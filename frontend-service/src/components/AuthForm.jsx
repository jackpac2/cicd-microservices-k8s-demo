import { useState } from "react";

export function AuthForm({ submitLabel, isSubmitting, onSubmit }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(credentials);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          autoComplete="username"
          name="username"
          onChange={handleChange}
          required
          type="text"
          value={credentials.username}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          autoComplete="current-password"
          minLength={1}
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={credentials.password}
        />
      </label>

      <button className="primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Working..." : submitLabel}
      </button>
    </form>
  );
}
