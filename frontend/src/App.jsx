import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import EventList from './Components/EventList/EventList';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import EventDetails from './Components/EventDetails/EventDetails';
import MostRecentEventList from './Components/MostRecent/MostRecent';
import Footer from './Components/Footer/Footer';
import SignInForm from './Components/Login/Login';
import SignUpForm from './Components/Signup/Signup';


import './App.css';

const App = () => {

    const userRole = useSelector(state => state.auth.user?.userRole);
    
    return (
        <div className="App">
            <BrowserRouter>
               
                <Routes>
                    <Route path="/" element={<EventList />} />
                    <Route path="/recent" element={<MostRecentEventList />} />
                    <Route path="/events/:eventId" element={<EventDetails />} />
                    <Route path="/mybookings" element={<UserDashboard />} />
                    {userRole == 'admin' ? (
                        <Route path="/admin" element={<AdminDashboard />} />
                    ) : (
                        <Route path="/admin" element={<Navigate to="/" replace />} />
                    )}
                    <Route path="/login" element={<SignInForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Routes>
                
            </BrowserRouter>
        </div>
    );
};

export default App;
