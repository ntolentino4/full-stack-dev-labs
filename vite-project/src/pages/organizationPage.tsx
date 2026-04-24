import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as RoleService from "../services/roleService";
import { AddRoleForm } from "../components/AddRoleForm";
import { AuthRequiredMessage } from "../components/AuthRequiredMessage";

export function OrganizationPage() {
  const queryClient = useQueryClient();

  const {
    data: roles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: RoleService.fetchRoles,
  });

  function refreshRoles() {
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  }

  if (isLoading) {
    return <main className="container">Loading organization...</main>;
  }

  if (isError) {
    return <main className="container">Unable to load organization.</main>;
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
        <AddRoleForm onCreated={refreshRoles} />
      </SignedIn>

      <SignedOut>
        <AuthRequiredMessage itemLabel="role" />
      </SignedOut>
    </main>
  );
}