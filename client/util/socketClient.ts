import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config/env';

export const socketClient = io('http://localhost:3002');
