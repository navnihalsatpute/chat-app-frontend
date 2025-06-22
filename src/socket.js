import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-ljlg.onrender.com"); // Backend URL

export default socket;
