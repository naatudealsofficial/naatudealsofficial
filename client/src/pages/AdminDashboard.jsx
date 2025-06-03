import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductAdd from "../components/ProductAdd";
import ProductForm from "../components/ProductForm";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setShowAddForm(true);
            setEditingProduct(null);
          }}
        >
          + Add Product
        </button>

        <button
        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/adminLogin"); // redirect after logout
        }}
      >
        Logout
      </button>
      </div>

      {/* Add Product Form */}
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

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {[...products].reverse().map((p) => (
    <div key={p._id} className="p-4 bg-white border rounded-lg shadow-sm">
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
          <h3 className="font-bold text-xl mb-1">{p.name}</h3>
          <p className="text-gray-700 mb-2">{p.description}</p>

          {p.category && (
            <p className="text-sm text-blue-600 mb-1">
              Category: {p.category}
            </p>
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

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => {
                setEditingProduct(p);
                setShowAddForm(false);
              }}
              className="text-blue-600 font-medium hover:underline"
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

    </div>
  );
}

export default AdminDashboard;
