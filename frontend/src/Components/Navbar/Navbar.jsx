import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Auth/authSlice';




function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => "adminz" || state.auth.user?.role); // Using optional chaining to handle null auth state

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={'/'}>
            <span className="text-white font-bold">EventPulse</span>
            
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Upcoming events
              </Link>
              <Link to="/recent" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Recent Events
              </Link>
              

              {
                isLoggedIn ?
                <>
                  <Link to="/mybookings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                My Bookings
              </Link>

              {
                userRole === 'admin' &&  <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
             
                Dashboard
              </Link> 
              }
              <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
  Logout
</button> 
                </>

                :

                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
                </>
              }
              
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Upcoming events
          </Link>
          <Link to="/recent-events" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Recent Events
          </Link>
          <Link to="/my-bookings" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            My Bookings
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Dashboard
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Login
          </Link>
          <Link to="/signup" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
