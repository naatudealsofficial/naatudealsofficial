import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://naatudealsofficialsite.onrender.com/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      alert(`Welcome, ${res.data.name}`);
  
      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");  // route for AdminDashboard
      } else if (res.data.role === "client") {
        navigate("/client"); // assuming you have client dashboard route
      } else {
        navigate("/");       // fallback homepage
      }
    } catch (err) {
      alert("Invalid credentials or held account");
    }
  };
  

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={login} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
