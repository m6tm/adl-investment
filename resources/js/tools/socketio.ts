import { io, type Socket } from 'socket.io-client'
import { type EventEmitter } from 'events';


export async function socketConnection(event: EventEmitter): Promise<Socket> {
    const socket = io('http://localhost:3000', {
        reconnection:  true,
        reconnectionAttempts: 10, // 10 tentatives de reconnexion maximal
        reconnectionDelay: (1000 * 10), //  10 seconds avant de réessayer
        randomizationFactor: 0.5, // 50% de variation aléatoire
    })
    return new Promise((resolve, reject) => {
        socket.on('connect', () => {
            event.emit('socket reconnected')
            resolve(socket)
        })

        socket.on('disconnect', () => {
            event.emit('socket disonnected')
        })

        socket.on('error', (err) => {
            console.error('connection error', err)
            reject(err)
        })
    })
}