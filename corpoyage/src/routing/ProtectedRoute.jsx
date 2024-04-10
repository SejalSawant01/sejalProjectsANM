import { Navigate } from 'react-router-dom';
import { useSessionStorage } from '../util/useSessionStorage';

export const ProtectedRoute = ({ children }) => {

    const [sessionLogin] = useSessionStorage('login', 'false');

    if (sessionLogin === 'false') {
        return <Navigate to='/login' />;
    }
    return children;
};