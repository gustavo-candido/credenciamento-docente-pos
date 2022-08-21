import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

type User = {
  id: string;
  isAdm: boolean;
  professorId?: string;
  professorLattes?: string;
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
  const navigate = useNavigate();

  const signUp = async (email: string) => {
    const queryUser = await api.post("user/sign-in", {
      email,
    });

    const userId = queryUser?.data?.id;
    const userAdmin = queryUser?.data?.is_adm;

    if (userId && userAdmin) {
      try {
        const queryProfessor = await api.get(`/professor/user/${userId}`);

        const fetchedUser = {
          id: userId,
          professorId: queryProfessor?.data?.id,
          professorLattes: queryProfessor?.data?.lattes_id,
          isAdm: userAdmin,
        };

        setUser(fetchedUser);
        navigate("/");
      } catch (e) {}
    } else {
      const fetchedUser = {
        id: userId,
        isAdm: userAdmin,
      };
      setUser(fetchedUser);
      navigate("/");
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
