import { io } from 'socket.io-client';

const socket = io('https://chat-app-backend-ykcc.onrender.com', {
  transports: ['websocket', 'polling'],
  secure: true,
  reconnection: true,
  rejectUnauthorized: false
});

export default socket;
