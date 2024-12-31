import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import "./App.css";
import SignupPage from "./pages/auth/Signup";
import LoginPage from "./pages/auth/Login";
import HomePage from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import store from "./redux/store/Store"; // Import your Redux store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
