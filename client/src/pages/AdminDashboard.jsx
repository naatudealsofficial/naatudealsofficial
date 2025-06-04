import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductAdd from "../components/ProductAdd";
import ProductForm from "../components/ProductForm";
import logo3 from '../assests/logo3.png';
import Header from "../components/Header";
import { FaArrowUp } from "react-icons/fa";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const config = {
        headers: { Authorization: localStorage.getItem("token") },
      };
      const res = await axios.get("https://naatudealsofficialsite.onrender.com/api/products", config);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: { Authorization: localStorage.getItem("token") },
      };
      await axios.delete(`https://naatudealsofficialsite.onrender.com/api/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = [...products]
    .reverse()
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Logo */}
      <div className="logo-div mb-6">
        <img src={logo3} alt="logo" className="mx-auto w-1/2 mt-5" />
      </div>

      {/* Sticky Search and Controls */}
      <div className="sticky top-0 z-50 bg-gray-50 shadow p-4 mb-6 rounded flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full md:w-72 px-3 py-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setShowAddForm(true);
              setEditingProduct(null);
            }}
          >
            + Add Product
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/adminLogin");
            }}
          >
            Logout
          </button>
        </div>
      

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6">
          <ProductAdd
            onSave={() => {
              fetchProducts();
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl mt-10">
        {filteredProducts.map((p) => (
          <div key ={p._id} className="border border-gray-300 rounded-md overflow-hidden w-full text-center shadow-md bg-white">
            
            {editingProduct?._id === p._id ? (
              <ProductForm
                product={editingProduct}
                onSave={() => {
                  fetchProducts();
                  setEditingProduct(null);
                }}
                onCancel={() => setEditingProduct(null)}
              />
            ) : (
              <>
                <h3 className="font-bold text-md mb-1 truncate">{p.name}</h3>
                <p className="text-gray-700 text-sm mb-2 line-clamp-3">{p.description}</p>

                {p.category && (
                  <p className="text-xs text-indigo-600 mb-1">Category: {p.category}</p>
                )}

                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                )}

                {p.affiliateLink && (
                  <a
                    href={p.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 underline mb-1 inline-block"
                  >
                    View Product
                  </a>
                )}

                {p.specialKey && (
                  <p className="text-sm mt-1 text-gray-800">🔑 {p.specialKey}</p>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Created: {new Date(p.createdTime).toLocaleString()}
                </p>

                <div className="mt-3 flex gap-20">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setShowAddForm(false);
                    }}
                    className="text-blue-600 font-medium hover:underlinen p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default AdminDashboard;
