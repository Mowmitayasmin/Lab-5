import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/nav/Nav";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/Header";
import Organization from "./components/organization/Organization";
import CreateRole from "./components/organization/CreateRole";
import { ToastContainer } from "react-toastify";
import UpdateRole from "./components/organization/UpdateRole";
import CreateEmployee from "./components/employee-list/CreateEmployee";
import UpdateEmployee from "./components/employee-list/UpdateEmployee";
import EmployeeDetails from "./components/employee-list/EmployeeDetails";
import { useUser } from "@clerk/clerk-react";

function NotFound() {
  return <h2>Page Not Found</h2>;
}

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Nav />
      <Header />
      {isSignedIn ? (
        <>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/create-role" element={<CreateRole />} />
            <Route path=":id/edit" element={<UpdateRole />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="employee/:id/edit" element={<UpdateEmployee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <h2 className="text-center">
            Please sign in to access the application.
          </h2>
        </>
      )}
      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
