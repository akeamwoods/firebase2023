import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
    {children}
    </AuthContext.Provider>
  );
};
