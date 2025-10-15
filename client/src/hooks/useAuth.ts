import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login/login";
import type { LoginPayload } from "../api/login/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      console.log("Login success:", data);
      login(data.token);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });
};
