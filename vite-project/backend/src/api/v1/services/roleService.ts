import type { Role } from "../../../types/role";
import * as RoleModel from "../models/roleModel";

export type CreateRoleResult =
  | { isValid: true; role: Role }
  | { isValid: false; field: "firstName" | "role"; errors: string[] };

export function fetchRoles(): Role[] {
  return RoleModel.fetchRoles();
}

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

  if (RoleModel.isRoleOccupied(role)) {
    return {
      isValid: false,
      field: "role",
      errors: ["That role is already occupied."],
    };
  }

  const name = lastName ? `${firstName} ${lastName}` : firstName;
  const created = RoleModel.createRole({ name, role });

  return { isValid: true, role: created };
}