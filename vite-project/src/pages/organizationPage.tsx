import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import * as RoleService from "../services/roleService";
import type { Role } from "../types/role";
import { AddRoleForm } from "../components/AddRoleForm";
import { AuthRequiredMessage } from "../components/AuthRequiredMessage";

export function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadRoles() {
      const data = await RoleService.fetchRoles();
      setRoles(data);
    }

    loadRoles();
  }, [refreshKey]);

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

      <SignedIn>
        <AddRoleForm onCreated={refresh} />
      </SignedIn>

      <SignedOut>
        <AuthRequiredMessage itemLabel="role" />
      </SignedOut>
    </main>
  );
}