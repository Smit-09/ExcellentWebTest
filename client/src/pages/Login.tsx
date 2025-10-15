import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Login</h2>

        <div className="text-black mb-5">
          <p>Note:</p>
          <p className="text-sm">Email: test@gmail.com</p>
          <p className="text-sm">pass: admin@123</p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full mb-4 p-2 rounded-lg bg-white text-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full mb-6 p-2 rounded-lg bg-white text-gray-700"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <p className="mt-4 text-center text-sm text-red-600">
            {(loginMutation.error as any)?.response?.data?.message || "Login failed"}
          </p>
        )}

        {loginMutation.isSuccess && (
          <p className="mt-4 text-center text-sm text-green-600">
            Login successful
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
