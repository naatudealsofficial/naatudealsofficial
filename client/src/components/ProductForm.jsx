import { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    };

    try {
      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, config);
      } else {
        await axios.post("http://localhost:5000/api/products", formData, config);
      }
      onSave();
    } catch (err) {
      alert("Error saving product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">{product ? "Edit" : "Add"} Product</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 border p-2 rounded"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {product ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
