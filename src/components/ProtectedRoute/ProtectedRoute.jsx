import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router';

const ProtectedRoute = ({ isAuth, redirectPath = '/articles' }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate(redirectPath);
            return
        }
// eslint-disable-next-line        
    }, [isAuth])

    return <Outlet />;
};


export default ProtectedRoute;