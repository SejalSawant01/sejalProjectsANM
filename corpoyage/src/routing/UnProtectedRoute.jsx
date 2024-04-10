import { Navigate } from 'react-router-dom';
import { useSessionStorage } from '../util/useSessionStorage';

export const UnProtectedRoute = ({ children }) => {

    const [sessionLogin] = useSessionStorage('login', 'false');

    if (sessionLogin === 'true') {
        return <Navigate to='/' />;
    }
    return children;
};