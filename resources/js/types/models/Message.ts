import { discussions, message_owners, messages } from "@prisma/client";
import Discussion from './Discussion';
import { MessageOwners } from "./MessageOwner";


type Message = messages & {
    discussions: Discussion
    message_owners: MessageOwners
}

export type Messages = Message[]

export default Message
