import  { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://pbs.twimg.com/profile_images/1834202903189618688/N4J8emeY_400x400.png"
            alt="Starknet Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-xl font-semibold">Starknet Agent</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <a
              href="#features"
              className="hover:text-blue-400 transition"
              onClick={handleMenuClick}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-blue-400 transition"
              onClick={handleMenuClick}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-blue-400 transition"
              onClick={handleMenuClick}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute top-full left-0 w-full shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <a
                href="#features"
                className="hover:text-blue-400 transition"
                onClick={handleMenuClick}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-blue-400 transition"
                onClick={handleMenuClick}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-400 transition"
                onClick={handleMenuClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
