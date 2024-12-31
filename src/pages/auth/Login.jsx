import React, { useState } from "react";
import Input from "../../components/MyInputBox";
import Button from "../../components/MyButton";
import { loginUser } from "../../api/authApi"; // API call function
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      const { token, user } = response;

      // Save token and user details to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(user));

      toast.success("Login successful!");
      //Redirect to home page or dashboard
      window.location.href = "/home"; // Replace with React Router if needed
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Invalid email or password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page auth-wrapper">
      <div className="form-container">
        <h2>Welcome Back</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          toggleVisibility={togglePasswordVisibility}
        />
        <Button
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        <a style={{ width: "100%", textAlign: "end" }} href="/forgot-password">
          Forgot Password?
        </a>
        <p style={{ fontSize: 14 }}>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
