import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fetchUser = () => {
    return api.get("/api/user/info/")
      .then((res) => {
        setAccount(res.data);
        if (res.data.avatar) {
          setAvatarPreview(`${import.meta.env.VITE_API_URL}${res.data.avatar}`);
        } else {
          setAvatarPreview(null);
        }
      })
      .catch((err) => console.error("取得使用者資訊失敗", err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ account, avatarPreview, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
