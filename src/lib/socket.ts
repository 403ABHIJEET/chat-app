import { io } from 'socket.io-client';

const socket = io('192.168.1.2:5000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
});

export default socket;
