import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './Layout/MainLayout';
import EventList from './Components/EventList/EventList';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import EventDetails from './Components/EventDetails/EventDetails';
import MostRecentEventList from './Components/MostRecent/MostRecent';
import SignInForm from './Components/Login/Login';
import SignUpForm from './Components/Signup/Signup';

import './App.css';

const App = () => {
    const [userRole, setUserRole] = useState('admin');

    const isAdmin = () => {
        return userRole === 'admin';
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'
                    element={
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<EventList />} />
                                <Route path="/recent" element={<MostRecentEventList />} />
                                <Route path="/events/:eventId" element={<EventDetails />} />
                                <Route path="/mybookings" element={<UserDashboard />} />
                                {isAdmin() ? (
                                    <Route path="/admin" element={<AdminDashboard />} />
                                ) : (
                                    <Route path="/admin" element={<Navigate to="/" replace />} />
                                )}
                            </Routes>
                        </MainLayout>
                    }
                />
                <Route path="/login" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
