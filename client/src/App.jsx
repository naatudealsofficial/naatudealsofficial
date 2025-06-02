import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
// import ClientDashboard from "./pages/ClientDashboard";
import AdminRegisterForm from "./components/AdminRegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminClientManagement from "./pages/AdminClientManagement";
import CategoryPage from './components/CategoryPage';

function App() {
  // const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<AdminClientManagement />} />
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/register" element={<AdminRegisterForm />} />
        {/* Protect the admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
