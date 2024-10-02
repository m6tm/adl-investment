import React, { Component } from "react";
import SearchDiscussionInput from "./SearchDiscussionInput";
import MessageListItemComponent from "./MessageListItemComponent";
import AppContext from "../utils/context";
import { TAppContext } from "../../../types/messages";


export default class MessageListComponent extends Component {
    static contextType = AppContext;
    context!: TAppContext;

    render(): React.ReactNode {
        const userConnected = this.context.messageManager.state.connected
        return (
            <div className="hidden h-full flex-col xl:flex xl:w-1/4">
                {/* Chat List Start */}
                <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl flex items-center">
                        Active Conversations
                        <span
                            className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">7</span>
                        <span className={`block size-4 rounded-full border-2 border-gray ms-2${userConnected ? ' bg-success' : ' bg-danger'}`}></span>
                    </h3>
                </div>
                <div className="flex max-h-full flex-col overflow-auto p-5">
                    <SearchDiscussionInput />
                    <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                        <MessageListItemComponent />
                        <MessageListItemComponent />
                        <MessageListItemComponent />
                        <MessageListItemComponent />
                    </div>
                </div>
                {/* Chat List End */}
            </div>
        )
    }
}
