import prisma from "../../../../prisma/client";
import type { Role } from "../../../types/role";

type RoleRecord = {
  title: string;
  occupant: {
    firstName: string;
    lastName: string | null;
  } | null;
};

export async function fetchRoles(): Promise<Role[]> {
  const roles = (await prisma.role.findMany({
    include: {
      occupant: true,
    },
    orderBy: {
      title: "asc",
    },
  })) as RoleRecord[];

  return roles
    .filter((role: RoleRecord) => role.occupant !== null)
    .map((role: RoleRecord) => {
      const occupant = role.occupant!;

      return {
        role: role.title,
        name: occupant.lastName
          ? `${occupant.firstName} ${occupant.lastName}`
          : occupant.firstName,
      };
    });
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

  return prisma.$transaction(async (tx: unknown) => {
    const transaction = tx as typeof prisma;

    const createdRole = await transaction.role.create({
      data: {
        title: newRole.role,
      },
    });

    const occupant = await transaction.roleOccupant.create({
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