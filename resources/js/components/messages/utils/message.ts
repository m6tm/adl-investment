import MessageComponent from "../MessageComponent";



export default class Message {

    constructor(private messageComponent: MessageComponent) {}

    get socket() {
        return this.messageComponent.socket!
    }

    get event() {
        return this.messageComponent.event
    }
}
