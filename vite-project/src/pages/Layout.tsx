import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

export function Layout() {
  return (
    <>
      <Header
        title="Pixell River Employee Directory"
        message="Welcome! Browse employees and leadership info."
      />

      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
}
