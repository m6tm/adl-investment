import React, { Component } from "react";
import MessageBoxContentItemComponent from "./MessageBoxItemComponent";


export default class MessageBoxListComponent extends Component {
    render(): React.ReactNode {
        return (
            <>
                <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
                    <MessageBoxContentItemComponent owner={true} />
                    <MessageBoxContentItemComponent owner={true} />
                    <MessageBoxContentItemComponent owner={false} />
                    <MessageBoxContentItemComponent owner={true} />
                    <MessageBoxContentItemComponent owner={false} />
                    <MessageBoxContentItemComponent owner={false} />
                    <MessageBoxContentItemComponent owner={true} />
                    <MessageBoxContentItemComponent owner={false} />
                    <MessageBoxContentItemComponent owner={true} />
                </div>
            </>
        )
    }
}
