import React from 'react';
import { BrowserRouter, useOutlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    const outlet = useOutlet();

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                {outlet}
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default MainLayout;
