import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";

function ClientDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMyProducts = async () => {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const res = await axios.get("https://naatudealsofficialsite.onrender.com/api/products/my", config);
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    await axios.delete(`https://naatudealsofficialsite.onrender.com/api/products/${id}`, config);
    fetchMyProducts();
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        + Add Product
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={() => {
            fetchMyProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-green-700 font-semibold">₹ {p.price}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(p);
                  setShowForm(true);
                }}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientDashboard;
