import { useState } from "react";
import axios from "axios";

function ProductAdd({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    affiliateLink: "",
    specialKey: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.imageUrl || !formData.affiliateLink) {
      setErrorMsg("Product name, image URL, and affiliate link are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };

    try {
      await axios.post(
        "https://naatudealsofficialsite.onrender.com/api/products",
        formData,
        config
      );
      onSave();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-6 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>

      {errorMsg && (
        <div className="mb-4 text-red-600 font-medium">{errorMsg}</div>
      )}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name *"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 border p-2 rounded"
        rows={3}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full mb-3 border p-2 rounded"
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
        <option value="Home & Kitchen">Home & Kitchen</option>
        <option value="Beauty">Beauty</option>
        <option value="Fitness">Fitness</option>
        <option value="Toys">Toys</option>
        <option value="Grocery">Grocery</option>
        <option value="Others">Others</option>
      </select>

      <input
        type="url"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL *"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="url"
        name="affiliateLink"
        value={formData.affiliateLink}
        onChange={handleChange}
        placeholder="Affiliate Link *"
        className="w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="text"
        name="specialKey"
        value={formData.specialKey}
        onChange={handleChange}
        placeholder="Special Key (optional)"
        className="w-full mb-4 border p-2 rounded"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductAdd;
