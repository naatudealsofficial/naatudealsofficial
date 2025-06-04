import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import logo3 from '../assests/logo3.png';
import { FaArrowUp } from "react-icons/fa";

// Category Icons
import { GiHouse, GiCook, GiLipstick, GiWeightLiftingUp, GiToyMallet } from 'react-icons/gi';
import { MdDevices } from 'react-icons/md';
import { FaTshirt } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
// import Footer from "../components/Footer";

const categories = [
  { name: "Electronics", icon: MdDevices },
  { name: "Fashion", icon: FaTshirt },
  { name: "Home", icon: GiHouse },
  { name: "Kitchen", icon: GiCook },
  { name: "Beauty", icon: GiLipstick },
  { name: "Fitness", icon: GiWeightLiftingUp },
  { name: "Toys", icon: GiToyMallet },
  { name: "Others", icon: BiDotsHorizontalRounded },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    axios.get("https://naatudealsofficialsite.onrender.com/api/products").then((res) => {
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sorted);
    });

    // Scroll listener for top button
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-10">
      <HomeHeader />

      <div className="flex flex-col items-center mt-5">

        {/* Logo & Telegram */}
        <div className="logo-div mb-6">
          <img src={logo3} alt="logo" className="mx-auto w-1/2 mt-5" />
          <div className="header-text text-center mt-0">
            <h4>💥Join Our Telegram Channel💥</h4>
            <h4>👇🏻👇🏻👇🏻</h4>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => window.open("https://t.me/NaatuDeals", "_blank")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png"
                alt="Telegram"
                width="20"
                height="20"
              /> Join Our Channel
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 z-50 w-full max-w-md bg-gray-100 p-3 shadow rounded mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded"
          />
        </div>

        {/* Category Buttons */}
        <div className="w-full max-w-6xl mb-6 flex flex-wrap justify-center gap-6">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className="flex flex-col items-center focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow hover:bg-indigo-700 transition">
                <Icon size={20} />
              </div>
              <span className="mt-2 text-sm">{name}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl px-2">
          {[...filtered].reverse().map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow hover:bg-indigo-700 transition"
        >
          <FaArrowUp />
        </button>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
