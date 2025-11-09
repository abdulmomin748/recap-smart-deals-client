import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import RecentProducts from './RecentProducts';

const Home = () => {
    const { user } = use(AuthContext);
    
    console.log(user);
    return (
        <div>
            <RecentProducts  />
        </div>
    );
};

export default Home;