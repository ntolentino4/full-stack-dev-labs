import type { Role } from "../types/role";
import * as RoleRepo from "../apis/roleRepo";

export async function fetchRoles(): Promise<Role[]> {
  return RoleRepo.fetchRoles();
}

export async function createRole(args: {
  firstName: string;
  lastName?: string;
  role: string;
}) {
  return RoleRepo.createRole({
    firstName: args.firstName.trim(),
    lastName: args.lastName?.trim() || undefined,
    role: args.role.trim(),
  });
}