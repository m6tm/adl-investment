import MessageComponent from "../MessageComponent";
import { type Socket } from 'socket.io-client'
import UserModel from '../../../types/models/User';
import Discussion from "../../../types/models/Discussion";



export default class MessageManager {

    private firstConnection = true;

    constructor(private messageComponent: MessageComponent) { }

    listener = () => {
        this.messageComponent.event.on('socket disonnected', () => {
            this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: false } })
        })
        this.messageComponent.event.on('socket reconnected', () => {
            if (this.firstConnection) return
            this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: true } })
        })
        this.socket.on('get my discussions', (user_data: any) => {
            user_data = JSON.parse(user_data)
            this.messageComponent.setState({ ...this.messageComponent.state, ...{ user: user_data } })
        })
    }

    onConnected = (socket: Socket) => {
        if (!this.messageComponent.socket) this.messageComponent.socket = socket
        this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: true } })
        if (this.firstConnection) this.listener()
        if (this.firstConnection) this.createConnection()
        this.firstConnection = false
    }

    get socket() {
        return this.messageComponent.socket!
    }

    get event() {
        return this.messageComponent.event
    }

    get state() {
        return this.messageComponent.state
    }

    get user(): UserModel | undefined {
        return Object.assign({}, this.messageComponent.state.user)
    }

    get active_discussion() {
        return this.messageComponent.state.activeDiscussion
    }

    set active_discussion(discussion: Discussion | undefined) {
        this.messageComponent.setState({ ...this.messageComponent.state, ...{ activeDiscussion: discussion } })
    }

    createConnection() {
        if (!this.socket) return
        this.socket.emit('connected', {
            user_id: this.messageComponent.props.user_id,
            discussions: this.messageComponent.props.discussions,
            client_socket_id: this.socket.id
        })
    }

    onSocketDisconnect() {
        this.messageComponent.setState({ ...this.messageComponent.state, ...{ connected: false } })
    }
}
