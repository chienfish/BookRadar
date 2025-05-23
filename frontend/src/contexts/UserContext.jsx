import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isReady, setIsReady] = useState(false);

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
      .catch((err) => {
        console.warn("尚未登入或無法取得使用者資料", err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser().finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return <div>初始化使用者資料中...</div>;

  return (
    <UserContext.Provider value={{ account, avatarPreview, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
