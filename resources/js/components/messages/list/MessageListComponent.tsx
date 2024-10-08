import React, { Component } from "react";
import SearchDiscussionInput from "./SearchDiscussionInput";
import MessageListItemComponent from "./MessageListItemComponent";
import AppContext from "../utils/context";
import { TAppContext } from "../../../types/messages";
import DiscussionOwner, { DiscussionOwners } from "../../../types/models/DiscussionOwner";
import { DISCUSSION_TYPE } from "../../../enums/discussion";


export default class MessageListComponent extends Component {
    static contextType = AppContext;
    declare context: TAppContext;
    declare state: Readonly<{discussions: DiscussionOwners}>;
    discussions: DiscussionOwners = [];

    constructor(props: any) {
        super(props);
        this.state = {
            discussions: [],
        }
    }
    
    componentDidMount(): void {
        this.setState({ ...this.state, ...{ discussions: this.context.messageManager.user!.discussion_owners } })
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        this.discussions = this.context.messageManager.user!.discussion_owners as DiscussionOwners
    }

    setDiscussions = (search_text: string) => {
        if (search_text.length == 0) {
            this.setState({ ...this.state, ...{ discussions: this.discussions } })
            return
        }
        
        search_text = search_text.toLowerCase()
        const result = this.discussions.filter((discussion: DiscussionOwner) => {
            let hasDiscussion = false
            if (discussion.discussions.type == DISCUSSION_TYPE.GROUP) {
                hasDiscussion = discussion.discussions.name!.toLowerCase().includes(search_text)
                if (hasDiscussion) return discussion
            } else {
                hasDiscussion = discussion.discussions.discussion_owners.filter((discussion_owner) => discussion_owner.users.pseudo.toLowerCase().includes(search_text)).length > 0
                if (hasDiscussion) return discussion
            }
        })
        
        this.setState({ ...this.state, ...{ discussions: result } })
    }

    render(): React.ReactNode {
        const userConnected = this.context.messageManager.state.connected
        let discussions = this.state.discussions
        
        return (
            <div className="hidden h-full flex-col xl:flex xl:w-1/4">
                {/* Chat List Start */}
                <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl flex items-center">
                        Active Conversations
                        <span
                            className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">{ discussions.length }</span>
                        <span className={`block size-4 rounded-full border-2 border-gray ms-2${userConnected ? ' bg-success' : ' bg-danger'}`}></span>
                    </h3>
                </div>
                <div className="flex max-h-full flex-col overflow-auto p-5">
                    <SearchDiscussionInput onSearch={this.setDiscussions} />
                    <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                        {
                            discussions.length > 0 ? discussions.map(discussion => {
                                return (
                                    <MessageListItemComponent key={discussion.id} discussion={discussion as DiscussionOwner} />
                                )
                            }) : <div className="text-center">
                                <p className="text-gray-500">No discussions</p>
                            </div>
                        }
                    </div>
                </div>
                {/* Chat List End */}
            </div>
        )
    }
}
