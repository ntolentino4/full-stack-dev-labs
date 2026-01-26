import { roles } from "../data/roles";

export function OrganizationPage() {
  return (
    <main className="container">
      <h2>Organization</h2>

      <div>
        {roles.map((r) => (
          <div
            key={`${r.role}-${r.name}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.5rem 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span>{r.name}</span>
            <span>{r.role}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
