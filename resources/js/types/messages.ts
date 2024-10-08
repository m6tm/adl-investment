import React from "react";
import type MessageManager from "../components/messages/utils/message-worker";
import UserModel from "./models/User";

export type MessageComponentProps = {
    discussions: Array<string>
    user_id: number
}

export type TAppContext = {
    messageManager: MessageManager
    user?: UserModel
}
export type AppContextType = React.Context<TAppContext>

export type MessageListComponentProps = {
}