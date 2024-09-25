
import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MessageListComponent from './list/MessageListComponent';
import MessageBoxForgroundComponent from './box/MessageBoxForgroundComponent';
import MessageBoxItemComponent from './box/MessageBoxItemComponent';
import { type Socket } from 'socket.io-client'
import { socketConnection } from '../../tools/socketio';
import AppContext from './utils/context';



class MessageComponent extends Component {
    state: Readonly<{ socket: Socket | null, discussions: Array<any> }>;

    constructor(props: any) {
        super(props);
        this.state  = {
            socket: null,
            discussions: []
        }
    }

    componentDidMount = async () => {
        socketConnection()
            .then((socket: Socket) => {
                this.setState({ ...this.state, ...{ socket } })
            })
            .catch((err) => {
                console.error('socket connection error', err)
            })
    }

    render() {
        if (this.state.socket) {
            return (
                <AppContext.Provider value={{ socket: this.state.socket, discussions: this.state.discussions }}>
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

const messageElement = document.getElementById('message-component');

if (messageElement) createRoot(messageElement).render(<App />);
