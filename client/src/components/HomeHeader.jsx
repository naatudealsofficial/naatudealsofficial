import { useState } from "react";
import { Menu } from "lucide-react"; // only the Menu icon now
import { Link } from 'react-router-dom';

function HomeHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-blue-500 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-white-600">NaatuDeals</h1>

        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <button
            className="text-white p-2 rounded hover:bg-red-600 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="p-6">
          <button
            className="text-gray-600 text-right w-full text-2xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar menu"
          >
            ✕
          </button>
          <div className="mt-6">
            <Link
              to="/adminLogin"
              className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
