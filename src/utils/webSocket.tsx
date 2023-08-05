import io from 'socket.io-client';

const socket = io(`ws://127.0.0.1:6001`);

export default socket;
