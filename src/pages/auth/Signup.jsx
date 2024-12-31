import React, { useState } from "react";
import Input from "../../components/MyInputBox";
import Button from "../../components/MyButton";
import { signupUser } from "../../api/authApi"; // API call
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await signupUser({ name, email, password });
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(user));

      toast.success("Signup Successful! Redirecting to Login...");
      setTimeout(() => {
        window.location.href = "/home"; // Redirect after signup
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page auth-wrapper">
      <div className="form-container">
        <h2>Create an Account</h2>
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          label={loading ? "Signing Up..." : "Signup"}
          onClick={handleSignup}
        />
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignupPage;
