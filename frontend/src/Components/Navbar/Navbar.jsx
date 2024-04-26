import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => "admin" || state.auth.user?.role); // Using optional chaining to handle null auth state

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow rounded">
      <div className="flex justify-between container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="whitespace-nowrap text-xl font-semibold">EvenPulse</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:justify-end md:space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">All Events</Link>
          <Link to="/recent" className="text-gray-700 hover:text-blue-500">Most recent</Link>
         
          {isLoggedIn ? (
            <>
              <Link to="/mybookings" className="text-gray-700 hover:text-blue-500">My Booking</Link>
              {userRole === 'admin' && <Link to="/admin" className="text-gray-700 hover:text-blue-500">Dashboard</Link>}
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Login</button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
