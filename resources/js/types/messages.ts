import React from "react";
import type MessageManager from "../components/messages/utils/message-worker";

export type MessageComponentProps = {
    discussions: Array<string>
    user: number
}

export type TAppContext = {
    messageManager: MessageManager
}
export type AppContextType = React.Context<TAppContext>

export type MessageListComponentProps = {
}