import { message_owners } from "@prisma/client";
import UserModel from './User';
import Message from "./Message";


type MessageOwner = message_owners & {
    users: UserModel
    messages: Message
}

export type MessageOwners = MessageOwner[]

export default MessageOwner
