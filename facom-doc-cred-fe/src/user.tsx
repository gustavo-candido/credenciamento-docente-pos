import React, { createContext, useContext, useState } from "react";
import api from "./services/api";

type User = {
  id: string;
};

type UserContextData = {
  user: User;
  signUp: (email: string) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextData>({} as UserContextData);

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>({} as User);

  const signUp = async (email: string) => {
    const res = await api.get<User>("user/sign-in", {
      params: {
        email,
      },
    });

    if (res?.data?.id) {
      const fetchedUser = { id: res.data?.id };
      setUser(fetchedUser);
    }
  };

  const logout = () => {
    setUser({} as User);
  };

  return (
    <UserContext.Provider value={{ user, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
