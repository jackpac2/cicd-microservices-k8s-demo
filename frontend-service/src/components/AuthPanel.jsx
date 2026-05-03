export function AuthPanel({ children, footer, title }) {
  return (
    <section className="auth-panel" aria-labelledby="auth-title">
      <div className="panel-header">
        <p className="eyebrow">Crew access terminal</p>
        <h1 id="auth-title">{title}</h1>
      </div>
      {children}
      {footer && <div className="panel-footer">{footer}</div>}
    </section>
  );
}
