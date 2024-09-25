import { createContext } from "react";
import { type Socket } from 'socket.io-client'



const AppContext: React.Context<{
    socket: Socket;
    discussions: Array<any>;
}> = createContext({
    socket: null as any,
    discussions: [] as any,
})

export default AppContext