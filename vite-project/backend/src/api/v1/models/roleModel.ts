import { roles } from "../../../data/roles";
import type { Role } from "../../../types/role";

// mock database
let roleData: Role[] = [...roles];

export function fetchRoles(): Role[] {
  return roleData;
}

export function isRoleOccupied(role: string): boolean {
  const normalized = role.trim().toLowerCase();

  return roleData.some(
    (r) => r.role.trim().toLowerCase() === normalized
  );
}

export function createRole(newRole: Role): Role {
  roleData = [...roleData, newRole];
  return newRole;
}