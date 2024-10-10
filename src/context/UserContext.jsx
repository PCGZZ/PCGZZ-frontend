// UserContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);

// Create the provider component
export function UserProvider({ children }) {
  // Example user data (you could fetch this from an API or have a dynamic state)
  const [user, setUser] = useState({
    // default user
    id: 'id',
    name: 'No User',
    email: '',
    role: 'student',
  });

  // Use useMemo to prevent the value object from being recreated on every render
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
