import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();
    // const navigate = useNavigate();
    console.log(user,location);

    if(loading){
        return <p className='text-9xl text-center'>...............</p>
    }
    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    
    return children;
};

export default PrivateRoute;