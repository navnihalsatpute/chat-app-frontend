import { useState } from "react";
import Chat from "./Chat";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!token) {
    return (
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 space-y-4 text-gray-900 dark:text-gray-100">
          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {showRegister ? (
            <>
              <Register setToken={setToken} setUsername={setUsername} />
              <button onClick={() => setShowRegister(false)} className="underline text-blue-500 dark:text-blue-300">Go to Login</button>
            </>
          ) : (
            <>
              <Login setToken={setToken} setUsername={setUsername} />
              <button onClick={() => setShowRegister(true)} className="underline text-blue-500 dark:text-blue-300">Register</button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <Chat username={username} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
};

export default App;
