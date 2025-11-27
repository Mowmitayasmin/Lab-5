import * as employeeRepo from "../apis/employeeRepo";
import type { DepartmentEmployee } from "../components/employee-list/EmployeeForm";
export interface Dept {
  id?: number | string | undefined;
  department: string;
  employees: string;
}
export async function fetchEmployee(sessionToken: string) {
  const employee = await employeeRepo.getEmployee(sessionToken);
  return employee;
}

export async function createNewDept(dept: Dept, sessionToken: string) {
  return await employeeRepo.createNewDept(dept, sessionToken);
}

export async function updateDepartment(dept: Dept, sessionToken: string) {
  return await employeeRepo.updateDepartment(dept, sessionToken);
}
export async function deleteEmployee(
  id: string | number,
  sessionToken: string
) {
  return await employeeRepo.deleteDepartment(id, sessionToken);
}

export async function ValidateDept(
  dept: DepartmentEmployee,
  sessionToken: string
) {
  const validationErrors = new Map<string, string>();
  const existingDepartments = await employeeRepo.getEmployee(sessionToken);
  if (dept.department.trim().length < 3) {
    validationErrors.set(
      "department",
      "Department name must be at least 3 characters long"
    );
  }

  if (
    existingDepartments.some(
      (d: DepartmentEmployee) =>
        d.department?.toLowerCase() === dept.department?.trim().toLowerCase()
    )
  ) {
    validationErrors.set("department", "This department already exists");
  }

  const employeeNames = new Set<string>();

  dept.employees?.forEach((emp) => {
    if (!emp.name || emp.name.trim().length < 3) {
      validationErrors.set(
        `employee`,
        `Employee name must be at least 3 characters long`
      );
    }

    const normalized = emp.name.trim().toLowerCase();
    if (employeeNames.has(normalized)) {
      validationErrors.set(`employee`, `Duplicate employee name "${emp.name}"`);
    }
    employeeNames.add(normalized);
  });

  return validationErrors;
}
