
import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MessageListComponent from './list/MessageListComponent';
import MessageBoxForgroundComponent from './box/MessageBoxForgroundComponent';
import MessageBoxItemComponent from './box/MessageBoxItemComponent';



class MessageComponent extends Component {
    render() {
        return (
            <>
                <MessageListComponent />
                <MessageBoxForgroundComponent />
                <MessageBoxItemComponent />
            </>
        );
    }
}

function App() {
    return <StrictMode>
        <MessageComponent />
    </StrictMode>
}

const messageElement = document.getElementById('message-component');

if (messageElement) createRoot(messageElement).render(<App />);
