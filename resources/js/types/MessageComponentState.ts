import Discussion from "./models/Discussion"
import UserModel from "./models/User"


export type MessageComponentState = {
    connected: boolean
    discussions: Array<any>
    user?: UserModel
    activeDiscussion?: Discussion
}
