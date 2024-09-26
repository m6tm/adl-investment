import { createContext } from "react";
import { type Socket } from 'socket.io-client'
import { type EventEmitter, EventEmitter as Emitter } from 'events';



const AppContext: React.Context<{
    socket: Socket;
    discussions: Array<any>;
    event: EventEmitter;
}> = createContext({
    socket: null as any,
    discussions: [] as any,
    event: new Emitter()
})

export default AppContext