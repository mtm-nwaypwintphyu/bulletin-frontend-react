import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/NavBar";

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar />
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
