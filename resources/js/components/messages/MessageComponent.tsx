
import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MessageListComponent from './list/MessageListComponent';
import MessageBoxForgroundComponent from './box/MessageBoxForgroundComponent';
import MessageBoxItemComponent from './box/MessageBoxItemComponent';
import { type Socket } from 'socket.io-client'
import { socketConnection } from '../../tools/socketio';
import AppContext from './utils/context';
import { EventEmitter } from 'events';
import { MessageComponentProps } from '../../types/messages';
import MessageWorker from './utils/message-worker';



export default class MessageComponent extends Component {
    socket: Socket | null = null;
    event: EventEmitter = new EventEmitter();
    state: Readonly<{ connected: boolean, discussions: Array<any> }>;
    props: Readonly<MessageComponentProps>;
    service: MessageWorker
    private readyMounted = false;

    constructor(props: any) {
        super(props);
        this.state  = {
            connected: false,
            discussions: []
        }
        this.service = new MessageWorker(this)
    }

    componentDidMount = async () => {
        if (this.readyMounted) return
        socketConnection(this.event)
            .then(this.service.onConnected)
            .catch((err) => {
                console.error('socket connection error', err)
            })
        this.readyMounted = true;
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

function App(props: MessageComponentProps) {
    return (
        <StrictMode>
            <MessageComponent {...props} />
        </StrictMode>
    )
}

(() => {
    const messageElement = document.getElementById('message-component');
    if (!messageElement) return;
    const discussions: Array<string> = JSON.parse(messageElement.getAttribute('data-discussions') ?? '[]');
    const user = parseInt(messageElement.getAttribute('data-usr') ?? '0');
    if (user === 0) return;
    createRoot(messageElement).render(<App {...{ discussions, user }} />);
})();
