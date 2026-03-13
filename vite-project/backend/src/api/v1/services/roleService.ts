import type { Role } from "../../../types/role";
import * as RoleModel from "../models/roleModel";

export type CreateRoleResult =
  | { isValid: true; role: Role }
  | { isValid: false; field: "firstName" | "role"; errors: string[] };

export async function fetchRoles(): Promise<Role[]> {
  return RoleModel.fetchRoles();
}

export async function createRole(args: {
  firstName: string;
  lastName?: string;
  role: string;
}): Promise<CreateRoleResult> {
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

  if (await RoleModel.isRoleOccupied(role)) {
    return {
      isValid: false,
      field: "role",
      errors: ["That role is already occupied."],
    };
  }

  const created = await RoleModel.createRole({
    firstName,
    lastName,
    role,
  });

  return {
    isValid: true,
    role: created,
  };
}