import api from "@/config/api";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    try {
      const res = await api.post("/api/users/login", { email, password });
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);

        setUser(res.data);
      }
      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Failed to login. Please try again.");
    }
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }
    try {
      const res = await api.post("/api/users/register", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        const token = res.data.token;
        localStorage.setItem("token", token);

        setUser(res.data);
      }
      return res.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Failed to register. Please try again.");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
