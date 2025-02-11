import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
function AdminPrivateRoute() {
    const token = Cookies.get('authToken');

    
    return token ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default AdminPrivateRoute;
