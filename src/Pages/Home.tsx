import React from 'react';
import { useAuth } from '../AuthContext';

const Home: React.FC = () => {
    const { currentUser } = useAuth(); // Use the useAuth hook to get the current user

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {currentUser ? (
                <p>Welcome, {currentUser.displayName || currentUser.email}!</p> // Display user's name or email
            ) : (
                <p>No user is currently logged in.</p>
            )}
        </div>
    );
};

export default Home;
