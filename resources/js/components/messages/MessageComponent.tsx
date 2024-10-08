
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
import MessageManager from './utils/message-worker';
import { MessageComponentState } from '../../types/MessageComponentState';



export default class MessageComponent extends Component {
    socket: Socket | null = null;
    event: EventEmitter = new EventEmitter();
    state: Readonly<MessageComponentState>;
    declare props: Readonly<MessageComponentProps>;
    service: MessageManager
    private readyMounted = false;

    constructor(props: any) {
        super(props);
        this.state  = {
            connected: false,
            discussions: [],
            user: undefined,
            activeDiscussion: undefined,
        }
        this.service = new MessageManager(this)
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
        if (this.socket && this.state.user) {
            const context = {
                messageManager: this.service
            }

            return (
                <AppContext.Provider value={context}>
                    <MessageListComponent />
                    {
                        this.state.activeDiscussion ? <MessageBoxItemComponent /> : <MessageBoxForgroundComponent />
                    }
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
    createRoot(messageElement).render(<App {...{ discussions, user_id: user }} />);
})();
