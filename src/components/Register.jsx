import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("https://chat-app-backend-ljlg.onrender.com/register", { email, password, username });
      alert("Registered! Now login.");
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
