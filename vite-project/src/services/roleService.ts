import * as RoleRepo from "../apis/roleRepo";
import type { Role } from "../types/role";

export type CreateRoleResult =
  | { isValid: true; role: Role }
  | { isValid: false; field: "firstName" | "role"; errors: string[] };


// Get all roles
export function fetchRoles(): Role[] {
  return RoleRepo.fetchRoles();
}

/**
 * Create a role entry
 *  - First name must be at least 3 characters
 *  - Role cannot already be occupied
 */
export function createRole(args: {
  firstName: string;
  lastName?: string;
  role: string;
}): CreateRoleResult {
  const firstName = args.firstName.trim();
  const lastName = args.lastName?.trim() || undefined;
  const role = args.role.trim();

  if (firstName.length < 3) {
    return {
      isValid: false,
      field: "firstName",
      errors: ["First name must be at least 3 characters."],
    };
  }

  if (!role) {
    return {
      isValid: false,
      field: "role",
      errors: ["Role is required."],
    };
  }

  if (RoleRepo.isRoleOccupied(role)) {
    return {
      isValid: false,
      field: "role",
      errors: ["That role is already occupied."],
    };
  }

  const name = lastName ? `${firstName} ${lastName}` : firstName;
  const created = RoleRepo.createRole({ name, role });

  return { isValid: true, role: created };
}