import { useMemo, useState } from "react";
import type { Department, Employee } from "../types/directory";
import { DepartmentSection } from "../components/DepartmentSection";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import * as EmployeeService from "../services/employeeService";

function groupByDepartment(employees: Employee[]): Department[] {
  const map = new Map<string, Department>();

  for (const emp of employees) {
    if (!map.has(emp.department)) {
      map.set(emp.department, { name: emp.department, employees: [] });
    }

    map.get(emp.department)!.employees.push({
      firstName: emp.firstName,
      lastName: emp.lastName,
    });
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function EmployeesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Read from service/repo (single source of truth)
  const employees = useMemo(() => EmployeeService.fetchEmployees(), [refreshKey]);
  const departments = useMemo(() => groupByDepartment(employees), [employees]);

  function refresh() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <main className="container">
      {departments.map((dept) => (
        <DepartmentSection key={dept.name} department={dept} />
      ))}

      <AddEmployeeForm onCreated={refresh} />
    </main>
  );
}