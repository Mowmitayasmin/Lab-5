import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../apis/employeeRepo";
import type { DepartmentEmployee } from "./EmployeeForm";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<DepartmentEmployee>();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const updateResponse: Response = await fetch(
          `${BASE_URL}/employee/${id}`,
          {
            method: "GET",
          }
        );
        const res = await updateResponse.json();
        setEmployee({
          ...res.employee,
          employees: JSON?.parse(res.employee.employees),
        });
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          {employee.department}
        </h2>

        <ul className="space-y-2 text-gray-700">
          {employee?.employees.map((emp, index: number) => (
            <li key={index} className="border-b border-gray-200 py-1">
              • {emp?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDetails;
