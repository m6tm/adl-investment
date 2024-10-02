import { createContext } from "react";
import { EventEmitter as Emitter } from 'events';
import { AppContextType } from "../../../types/messages";
import type MessageManager from "./message-worker";



const AppContext: AppContextType = createContext({
    messageManager: null as any as MessageManager
})

export default AppContext