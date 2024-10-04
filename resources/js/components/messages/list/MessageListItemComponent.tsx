import React, { Component } from "react";
import { ORIGIN } from "../../../tools/settings";
import DiscussionOwner from "../../../types/models/DiscussionOwner";
import { DISCUSSION_TYPE } from "../../../enums/discussion";
import { discussions } from "@prisma/client";


export default class MessageListItemComponent extends Component {
    declare props: Readonly<{discussion: DiscussionOwner}>;

    constructor(props: any) {
        super(props);
    }

    static getDiscussionName = (discussion: DiscussionOwner) => {
        let discussion_name = discussion.discussions.name
        if (discussion.discussions.type == DISCUSSION_TYPE.PERSONAL) {
            discussion_name = discussion.discussions.discussion_owners.find(_discussion => _discussion.user_id != discussion.user_id)!.users.pseudo
        }

        return discussion_name
    }

    getLastMessage() {
        const { discussion } = this.props
        const lastMessage = discussion.discussions.messages.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }).at(0)

        if (lastMessage) {
            return lastMessage.message
        }
        return 'Not message yet'
    }

    render(): React.ReactNode {
        const discussion_name = MessageListItemComponent.getDiscussionName(this.props.discussion)
        const lastMessage = this.getLastMessage()
        
        return (
            <>
                {/* List Item */}
                <div className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark">
                    <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img src={`${ORIGIN}/avatars/default_avatar.jpg`} alt="profile" className="h-full w-full object-cover object-center rounded-full" />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                    </div>
                    <div className="w-full">
                        <h5 className="text-sm font-medium text-black dark:text-white">
                            {discussion_name}
                        </h5>
                        <p className="text-sm font-medium">
                            {lastMessage}
                        </p>
                    </div>
                </div>
            </>
        )
    }
}
