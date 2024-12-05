import React, { Component } from "react";
import MessageBoxHeader from "./MessageBoxHeaderComponent";
import MessageBoxListComponent from "./content/MessageBoxListComponent";
import MessageBoxInputComponent from "./content/MessageBoxInputComponent";

export default class MessageBoxItemComponent extends Component {
    render(): React.ReactNode {
        return (
            <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
                <MessageBoxHeader />
                <MessageBoxListComponent />
                <MessageBoxInputComponent />
            </div>
        );
    }
}
