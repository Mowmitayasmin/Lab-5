import { Role } from "../types/rolesType";
import prisma from "../utils/prisma";

export const fetchAllRoles = async (): Promise<Role[]> => {
  const data = await prisma.role.findMany({});
  return data;
};
export const createRole = async (roleData: Role): Promise<Role> => {
  const data = await prisma.role.create({
    data: roleData,
  });
  return data;
};

export const updateRole = async (id: number, roleData: Role): Promise<Role> => {
  const data = await prisma.role.update({
    where: { id },
    data: {
      ...roleData,
    },
  });

  return data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await prisma.role.delete({
    where: {
      id: id,
    },
  });
};
