import { useMemo, useState } from "react";
import * as RoleService from "../services/roleService";
import { AddRoleForm } from "../components/AddRoleForm";

export function OrganizationPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const roles = useMemo(() => RoleService.fetchRoles(), [refreshKey]);

  function refresh() {
    setRefreshKey((k) => k + 1);
  }

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

      <AddRoleForm onCreated={refresh} />
    </main>
  );
}