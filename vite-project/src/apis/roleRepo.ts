import { roles } from "../data/roles";
import type { Role } from "../types/role";

// mock database
let roleData: Role[] = [...roles];

// Get all roles
export function fetchRoles(): Role[] {
  return roleData;
}

// Checks role if already occupied
export function isRoleOccupied(role: string): boolean {
  const normalized = role.trim().toLowerCase();
  return roleData.some((r) => r.role.trim().toLowerCase() === normalized);
}

// Creates a new role entry
export function createRole(newRole: Role): Role {
  roleData = [...roleData, newRole];
  return newRole;
}