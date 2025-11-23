"use client";

import { io } from "socket.io-client";

const socket = io(); // No path parameter needed for default '/socket.io'

// Log the socket object to ensure it's connected
console.log("Socket initialized:", socket);

export default socket;
