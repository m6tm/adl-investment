import { io, type Socket } from 'socket.io-client'


export async function socketConnection(): Promise<Socket> {
    const socket = io('http://localhost:3000', {
        reconnection:  true,
        reconnectionAttempts: 10, // 10 tentatives de reconnexion maximal
        reconnectionDelay: (1000 * 10), //  10 seconds avant de réessayer
    })
    return new Promise((resolve, reject) => {
        socket.on('connect', () => {
            resolve(socket)
        })

        socket.on('error', (err) => {
            console.log('connection error', err)
            reject(err)
        })
    })
}