// utils.ts
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';

export const useRedirectLoggedInUser = (redirectTo: string = '/') => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (currentUser) {
            navigate(redirectTo, { replace: true, state: { from: location } });
        }
    }, [currentUser, navigate, redirectTo, location]);
};
