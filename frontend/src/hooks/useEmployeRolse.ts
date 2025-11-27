import { useEffect, useState } from "react";

import * as EmployeeService from "../services/employee";

import { toast } from "react-toastify";
import type { DepartmentEmployee } from "../components/employee-list/EmployeeForm";
import { useAuth } from "@clerk/clerk-react";
const useEmployeRolse = (dependencies: unknown[]) => {
  const { getToken } = useAuth();
  const [searchStr, setSearchstr] = useState("");
  const [error, setError] = useState<string | null>();
  const [departmentEmployee, setDepartmentEmployee] = useState<
    DepartmentEmployee[]
  >([]);
  const filteredDepartments = departmentEmployee
    .map((dept) => {
      const matchesDepartment = dept.department
        .toLowerCase()
        .includes(searchStr.toLowerCase());

      const filteredEmployees = dept.employees.filter((item) =>
        item.name.toLowerCase().includes(searchStr.toLowerCase())
      );

      return {
        id: dept.id,
        department: dept.department,
        employees: filteredEmployees,
        matchesDepartment,
      };
    })
    .filter((dept) => dept.matchesDepartment || dept.employees.length > 0)
    .map(({ ...rest }) => rest);

  const fetchDept = async () => {
    try {
      const sessionToken = (await getToken()) ?? "";
      const result = await EmployeeService.fetchEmployee(sessionToken);
      setDepartmentEmployee([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };
  const handleDeleteEmployee = async (id: number | string | undefined) => {
    if (!id) return;
    const sessionToken = (await getToken()) ?? "";
    const res = await EmployeeService.deleteEmployee(id, sessionToken);
     console.log("🚀 ~ handleDeleteEmployee ~ res:", res)
     
    setDepartmentEmployee((prev) => prev.filter((e) => e.id !== id));
    toast("Successfully deleted Role!", {
      position: "bottom-center",
      theme: "light",
      hideProgressBar: true,
      closeButton: false,
      autoClose: 2500,
    });
  };

  useEffect(() => {
    fetchDept();
  }, [...dependencies]);
  return {
    error,
    departmentEmployee,
    filteredDepartments,
    setSearchstr,
    searchStr,
    setDepartmentEmployee,
    fetchDept,
    handleDeleteEmployee,
  };
};

export default useEmployeRolse;
