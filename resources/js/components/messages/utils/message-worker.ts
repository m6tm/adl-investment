import MessageComponent from "../MessageComponent";
import { type Socket } from 'socket.io-client'



export default class MessageWorker {

    private firstConnection = true;

    constructor(private messageComponent: MessageComponent) {
        this.listener()
    }

    listener = () => {
        this.messageComponent.event.on('socket disonnected', () => {
            this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: false } })
        })
        this.messageComponent.event.on('socket reconnected', () => {
            if (this.firstConnection) return
            this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: true } })
        })
    }

    onConnected = (socket: Socket) => {
        if (!this.messageComponent.socket) this.messageComponent.socket = socket
        this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: true } })
        if (this.firstConnection) this.createConnection()
        this.firstConnection = false
    }

    get socket() {
        return this.messageComponent.socket!
    }

    get event() {
        return this.messageComponent.event
    }

    createConnection() {
        if (!this.socket) return
        this.socket.emit('connected', {
            user_id: this.messageComponent.props.user,
            discussions: this.messageComponent.props.discussions,
            client_socket_id: this.socket.id
        })
    }

    onSocketDisconnect() {
        this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: false } })
    }
}
