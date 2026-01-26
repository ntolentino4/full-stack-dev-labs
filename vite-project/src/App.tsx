import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { EmployeesPage } from "./pages/EmployeesPage";
import { OrganizationPage } from "./pages/organizationPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
      </Route>
    </Routes>
  );
}
