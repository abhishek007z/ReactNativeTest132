import React, { createContext, useEffect, useState } from "react";
import { loginApi, registerApi, getMeApi } from "../api/auth";
import { saveToken, getToken, removeToken } from "../utils/storage";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      setTOKEN(token);

      const res = await getMeApi(token);
      setUser(res.data.data);
    } catch (e) {
      await removeToken();
      setTOKEN(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await loginApi({ email, password });

    const token = res.data.data.token;
    await saveToken(token);

    setTOKEN(token);
    setUser(res.data.data.user || res.data.data);
  };

  const register = async (data) => {
    const res = await registerApi(data);

    const token = res.data.data.token;
    await saveToken(token);

    setTOKEN(token);
    setUser(res.data.data.user || res.data.data);
  };

  const logout = async () => {
    await removeToken();
    setTOKEN(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, TOKEN, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
