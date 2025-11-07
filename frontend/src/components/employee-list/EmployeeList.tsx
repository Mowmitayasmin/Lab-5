import { Link, useNavigate } from "react-router-dom";
import { Edit, TrashIcon } from "lucide-react";
import useEmployeRolse from "../../hooks/useEmployeRolse";

export interface EmployeeDepartment {
  id?: string | number;
  department: string;
  employees: string[];
}

export function EmployeeList() {
  const { setSearchstr, searchStr, filteredDepartments, handleDeleteEmployee } =
    useEmployeRolse([]);
  const navigate = useNavigate();
  return (
    <main className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Employee Directory
      </h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchStr}
          onChange={(e) => setSearchstr(e.target.value)}
          className="flex-grow border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link to="/create-employee">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
            + Add employee
          </button>
        </Link>
      </div>

      <div id="employee-list" className="space-y-4">
        {filteredDepartments?.map((x , i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition"
            onClick={() => navigate(`/employee/${x.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-blue-600">
                {x.department}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/employee/${x.id}/edit`);
                  }}
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEmployee(x?.id);
                  }}
                  className="p-2 rounded-full hover:bg-red-100 transition"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <ul className="pl-4 text-gray-700 space-y-1">
              {x.employees.map((y, i) => (
                <li key={i} className="employee">
                  • {y.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
