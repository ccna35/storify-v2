import React, { createContext, useState } from "react";

type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  added: string;
};

interface IUserContext {
  user: null | UserType;
  updateUserInfo: (data: UserType | null) => void;
}

// console.log(
//   localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user") as string)
//     : null
// );

const UserContext = createContext<IUserContext>({
  user: null,
  updateUserInfo: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") as string)
  );

  const updateUserInfo = (data: UserType | null) => {
    setUser(data);
  };
  return (
    <UserContext.Provider value={{ user, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
