
const Navbar = () => {
  return (
    <nav className="bg-white shadow rounded">
      <div className="flex justify-between container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <a href="https://flowbite-react.com" className="flex items-center">
          
            <span className="whitespace-nowrap text-xl font-semibold">EvenPulse</span>
          </a>
          <div className="flex md:order-2">
          
          
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:justify-end md:space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Services</a>
          
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Signup</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
