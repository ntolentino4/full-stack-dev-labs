import prisma from "../../../../prisma/client";
import type { Role } from "../../../types/role";

export async function fetchRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany({
    include: {
      occupant: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return roles
    .filter((role) => role.occupant)
    .map((role) => ({
      role: role.title,
      name: role.occupant?.lastName
        ? `${role.occupant.firstName} ${role.occupant.lastName}`
        : role.occupant!.firstName,
    }));
}

export async function isRoleOccupied(roleTitle: string): Promise<boolean> {
  const role = await prisma.role.findUnique({
    where: { title: roleTitle },
    include: {
      occupant: true,
    },
  });

  return Boolean(role?.occupant);
}

export async function createRole(newRole: {
  firstName: string;
  lastName?: string;
  role: string;
}): Promise<Role> {
  const existingRole = await prisma.role.findUnique({
    where: { title: newRole.role },
    include: {
      occupant: true,
    },
  });

  if (existingRole?.occupant) {
    throw new Error("Role already occupied");
  }

  if (existingRole && !existingRole.occupant) {
    const occupant = await prisma.roleOccupant.create({
      data: {
        firstName: newRole.firstName,
        lastName: newRole.lastName,
        roleId: existingRole.id,
      },
    });

    return {
      role: existingRole.title,
      name: occupant.lastName
        ? `${occupant.firstName} ${occupant.lastName}`
        : occupant.firstName,
    };
  }

  return prisma.$transaction(async (tx) => {
    const createdRole = await tx.role.create({
      data: {
        title: newRole.role,
      },
    });

    const occupant = await tx.roleOccupant.create({
      data: {
        firstName: newRole.firstName,
        lastName: newRole.lastName,
        roleId: createdRole.id,
      },
    });

    return {
      role: createdRole.title,
      name: occupant.lastName
        ? `${occupant.firstName} ${occupant.lastName}`
        : occupant.firstName,
    };
  });
}