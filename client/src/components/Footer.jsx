import { FaTelegramPlane, FaGithub, FaInstagram } from "react-icons/fa";
import logo3 from '../assests/logo3.png';

function Footer() {
  return (
    // <header className="bg-blue-500 shadow-md fixed top-0 left-0 right-0 z-50"></header>
    <footer className="bg-blue-900 text-gray-300 py-10 mt-10 shadow-md  bottom-0 left-0 right-0 w-full">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo3} alt="NaatuDeals" className="w-28 mb-3" />
          <p className="text-sm text-gray-400">Your trusted source for affiliate deals across categories.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/adminLogin" className="hover:underline">Admin Login</a></li>
            <li><a href="https://t.me/NaatuDeals" target="_blank" rel="noopener noreferrer" className="hover:underline">Join Telegram</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Popular Categories</h4>
          <ul className="space-y-1 text-sm">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Books</li>
            <li>Beauty</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://t.me/NaatuDeals" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaTelegramPlane />
            </a>
            <a href="https://github.com/rakeshboyiri/naatudealssite" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-100">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} NaatuDeals. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
