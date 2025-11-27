import type { Dept } from "../services/employee";

export const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;
export async function getEmployee(sessionToken: string) {
  const response = await fetch(`${BASE_URL}/employee`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch role");
  }
  const json = await response.json();
  return json;
}

export async function createNewDept(employee: Dept, sessionToken: string) {
  const response = await fetch(`${BASE_URL}/employee/create`, {
    method: "POST",
    body: JSON.stringify({ ...employee }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }
  const json = await response.json();
  return json;
}
export async function updateDepartment(dept: Dept, sessionToken: string) {
  const updateResponse: Response = await fetch(
    `${BASE_URL}/employee/update/${dept.id}`,
    {
      method: "PUT",

      body: JSON.stringify({ ...dept }),
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${sessionToken}`,
      },
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Failed to update Role with id ${dept.id}`);
  }
  const json = await updateResponse.json();
  return json;
}
export async function deleteDepartment(id: string | number, sessionToken: string) {
  const employeeResponse: Response = await fetch(
    `${BASE_URL}/employee/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }
  );

  if (!employeeResponse.ok) {
    throw new Error(`Failed to fetch employee with id ${id}`);
  }
}
