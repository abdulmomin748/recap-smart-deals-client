import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const MainLayout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <h1>Footer</h1>
        </div>
    );
};

export default MainLayout;