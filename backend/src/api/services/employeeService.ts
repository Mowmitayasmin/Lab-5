import { Prisma } from "@prisma/client";
import { Employee } from "../types/rolesType";
import prisma from "../utils/prisma";

export const fetchAllEmployee = async (): Promise<Employee[]> => {
  const data = await prisma.department.findMany({});
  return data;
};
export const createEmployee = async (
  employeeData: Employee,
  userId: string
): Promise<Employee> => {
  const data = await prisma.department.create({
    data: {
      department: employeeData.department,
      employees: employeeData.employees as unknown as Prisma.JsonArray,
      userId: userId,
    },
  });
  return data;
};
export const getEmploeeById = async (id: number) => {
  try {
    const data = await prisma.department.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch Department with id ${id}`);
  }
};
export const updateEmployee = async (
  id: number,
  employeeData: Employee
): Promise<Employee> => {
  const updatedData = await prisma.department.update({
    where: { id },
    data: {
      department: employeeData.department,
      employees: employeeData.employees as unknown as Prisma.JsonArray,
    },
  });

  return updatedData;
};

export const deleteRole = async (id: number): Promise<void> => {
  await prisma.department.delete({
    where: {
      id: id,
    },
  });
};
