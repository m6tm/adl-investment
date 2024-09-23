import { io, Socket } from "socket.io-client"
import { link } from "../data/socket.io"


export async function getSocketConnection(): Promise<Socket> {
    return new Promise(resolve => {
        let socket = io(link());
        socket.on('connect', () => resolve(socket))
    })
}

export function socketPlace(socket: Socket) {
    socket.on('room-joined', (user: number) => {
        console.log(user, 'joined discussion');
    })
}