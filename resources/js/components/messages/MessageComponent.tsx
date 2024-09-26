
import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MessageListComponent from './list/MessageListComponent';
import MessageBoxForgroundComponent from './box/MessageBoxForgroundComponent';
import MessageBoxItemComponent from './box/MessageBoxItemComponent';
import { type Socket } from 'socket.io-client'
import { socketConnection } from '../../tools/socketio';
import AppContext from './utils/context';
import { EventEmitter } from 'events';



export default class MessageComponent extends Component {
    socket: Socket | null = null;
    event: EventEmitter = new EventEmitter();
    state: Readonly<{ connected: boolean, discussions: Array<any> }>;

    constructor(props: any) {
        super(props);
        this.state  = {
            connected: false,
            discussions: []
        }
    }

    componentDidMount = async () => {
        socketConnection()
            .then((socket: Socket) => {
                this.socket = socket
                this.setState({ ...this.state, ...{ connected: true } })

                socket.on('disconnect', () => {
                    this.setState({ ...this.state, ...{ connected: false } })
                })
            })
            .catch((err) => {
                console.error('socket connection error', err)
            })
    }

    render() {
        if (this.socket) {
            const context = {
                socket: this.socket,
                discussions: this.state.discussions,
                event: this.event
            }

            return (
                <AppContext.Provider value={context}>
                    <MessageListComponent />
                    <MessageBoxForgroundComponent />
                    <MessageBoxItemComponent />
                </AppContext.Provider>
            );
        } else {
            return (
                <div className="size-full bg-slate-100 flex justify-center items-center">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            );
        }
    }
}

function App() {
    return (
        <StrictMode>
            <MessageComponent />
        </StrictMode>
    )
}

(() => {
    const messageElement = document.getElementById('message-component');
    if (!messageElement) return;
})();
