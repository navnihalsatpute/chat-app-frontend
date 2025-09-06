import { useState } from "react";
import axios from "axios";

const Login = ({ setToken, setUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://chat-app-backend-ljlg.onrender.com/login", { email, password });
      setToken(res.data.token);
      setUsername(res.data.username);
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
