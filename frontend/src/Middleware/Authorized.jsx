import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authorized({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  return user ? children : null;
}

export default Authorized;
