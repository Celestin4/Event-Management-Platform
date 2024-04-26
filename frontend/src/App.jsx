import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import EventList from './Components/EventList/EventList';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import EventDetails from './Components/EventDetails/EventDetails';
import Footer from './Components/Footer/Footer';
import SignInForm from './Components/Login/Login';
import SignUpForm from './Components/Signup/Signup';

import './App.css';

const App = () => {
    const [userRole, setUserRole] = useState('admin');

    const isAdmin = () => {
        return userRole === 'admin';
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<EventList />} />
                    <Route path="/events/:eventId" element={<EventDetails />} />
                    <Route path="/mybookings" element={<UserDashboard />} />
                    {isAdmin() ? (
                        <Route path="/admin" element={<AdminDashboard />} />
                    ) : (
                        <Route path="/admin" element={<Navigate to="/" replace />} />
                    )}
                    <Route path="/login" element={<SignInForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
