import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
