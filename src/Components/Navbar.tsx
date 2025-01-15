

const Navbar = () => (
  <nav className="bg-gray-900 text-white px-4 py-4 shadow-md">
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
      <ul className="flex items-center gap-6">
        <li>
          <a href="#features" className="hover:text-blue-400 transition">
            Features
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
