import React from 'react'
import { getURI } from '../functions/tools'
import { AppContextInterface, ConversationLeftSideProps, CustomUser, Discussion } from '../interfaces/chat'
import { v4 as uuid } from "uuid";
import { isEmpty, isNull } from "lodash";
import SafeRaiseError from '../SafeRaiseError';
import Conversation from './Conversation';
import { UserCard } from './cards/UserCard';
import { NewConversation } from './NewConversation';
import { AppContext } from '../data/chat';
import { DISCUSSTION_PERMISSION, DISCUSSTION_TYPE } from '../enums/chat';

export default class ConversationLeftSide extends React.Component {
    props!: ConversationLeftSideProps
    state!: { user_profile_is_visible: boolean, search_component_is_visible: boolean, discussions: Array<Discussion> }
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            user_profile_is_visible: false,
            search_component_is_visible: false,
            discussions: [],
        }
    }

    toggleUserProfile = () => {
        this.setState({ ...this.state, ...{ user_profile_is_visible: !this.state.user_profile_is_visible } })
    }

    toggleSearchComponent = () => {
        this.setState({ ...this.state, ...{ search_component_is_visible: !this.state.search_component_is_visible } })
    }

    extractUsers = (): Array<CustomUser> => {
        let users: Array<CustomUser> = [];
        Object.values(this.props.messages).forEach(chatList => {
            chatList.forEach(chat => {
                users = [...users, chat.participant.you];
            })
        })
        let uniqueUsers = new Set(users)
        users = []
        uniqueUsers.forEach(user => users.push(user))
        return users
    }

    toggleDisscussionState = (e: any, discussion: Discussion) => {
        this.context.event.emit(`scroll-${discussion.token}`)
        // debugge(discussion)
        this.props.toggleConversation(e, discussion)
    }

    displayLastMessage = (discussion: Discussion) => {
        if (discussion.messages.length == 0) return "Not message yet"
        let last_message = discussion.messages.at(-1)!
        if (!('attachments' in last_message)) return "Not message yet"
        if (last_message.attachments.length > 0 && last_message.message.length > 0) return `File shared + ${last_message.message}`
        if (last_message.attachments.length > 0 && last_message.message.length == 0) return 'File shared ...'
        if (last_message.attachments.length == 0 && last_message.message.length > 0) return last_message.message
        return "Empty message"
    }

    displayDiscussions = (discussions: { [category_name: string]: Discussion[]; }) => {
        let discussion_items = Object.values(discussions).map((discussion, index) => {
            return <div key={index}>
                <h6 className="px-2 pt-2 pb-25 mb-0">{discussion[0].category.toUpperCase()}</h6>
                <ul className="chat-sidebar-list" style={{ listStyle: 'none' }}>
                    {
                        Object.values(discussion).map(item => <li key={uuid()} onClick={e => this.toggleDisscussionState(e, item)}>
                            <div className="d-flex align-items-center position-relative">
                                {
                                    item.pin_to_top ?
                                        <i className="bx bx-pin position-absolute" style={{ top: 5, right: 5 }}></i> :
                                        null
                                }
                                {
                                    item.category == DISCUSSTION_TYPE.GROUPS ?
                                    (
                                        item.permission !== DISCUSSTION_PERMISSION.AUTHOR && item.locked_for_all ?
                                            <i className="bx bx-lock-alt text-muted position-absolute" style={{ top: 5, right: item.pin_to_top ? 25 : 5 }}></i> :
                                            null
                                    ) :
                                    item.i_blocked ?
                                        <i className="bx bx-block text-danger position-absolute" style={{ top: 5, right: item.pin_to_top ? 25 : 5 }}></i> :
                                        null
                                }
                                <div className="avatar m-0 mr-50">
                                    {
                                        item.category == DISCUSSTION_TYPE.GROUPS ?
                                            Conversation.getUserImage(isNull(item.avatar) ? 'avatar/user.png' : `groups_avatar/${item.avatar}`, item) :
                                            Conversation.getUserImage(item.participant.you.avatar, item)
                                    }
                                    {
                                        item.category == DISCUSSTION_TYPE.GROUPS ?
                                            null :
                                            <span className={`avatar-status-${item.participant.you.status}`}></span>
                                    }
                                </div>
                                <div className="chat-sidebar-name">
                                    <h6 className="mb-0">
                                        {
                                            item.category == DISCUSSTION_TYPE.GROUPS ?
                                                item.group_name :
                                                item.participant.you.last_name + ' ' + item.participant.you.first_name
                                        }
                                    </h6>
                                    <small>
                                        {
                                            this.displayLastMessage(item)
                                        }
                                    </small>
                                </div>
                            </div>
                        </li>
                        )
                    }
                </ul>
            </div>
        })

        return discussion_items
    }

    render(): React.ReactNode {
        return (
            <SafeRaiseError>
                <div className="sidebar-left">
                    <div className="sidebar">
                        {/* <!-- app chat user profile left sidebar start --> */}
                        <UserCard {...{ visible: this.state.user_profile_is_visible, toggle: this.toggleUserProfile }} />
                        {/* <!-- app chat user profile left sidebar ends --> */}

                        {/* <!-- app chat sidebar start --> */}
                        <div className="chat-sidebar card">
                            <span className="chat-sidebar-close">
                                <i className="bx bx-x"></i>
                            </span>
                            <div className="chat-sidebar-search">
                                <div className="d-flex align-items-center">
                                    <div className="chat-sidebar-profile-toggle">
                                        <div className="avatar">
                                            {
                                                <img onClick={this.toggleUserProfile} src={`${getURI()}/${isNull(this.context.avatar) ? 'avatar/user.png' : this.context.avatar}`} alt="user_avatar" height="36" width="36" />
                                            }
                                        </div>
                                    </div>
                                    <fieldset className="form-group position-relative has-icon-left mx-75 mb-0">
                                        <input type="text" className="form-control round" id="chat-search" placeholder="Search ..." onChange={e => this.props.searchDiscussion(e.target.value)} />
                                        <div className="form-control-position">
                                            <i className="bx bx-search-alt text-dark"></i>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="chat-sidebar-list-wrapper pt-2 scroll-mode" style={{ overflowY: 'auto' }}>
                                {
                                    this.context.more_info.company > 0 ?
                                        <NewConversation {
                                            ...{
                                                is_visible: this.state.search_component_is_visible,
                                                users: this.extractUsers(),
                                                toggleSearchComponent: this.toggleSearchComponent,
                                            }
                                        } /> : null
                                }
                                <h6 className="px-2 pb-25 mb-0">CHANNELS<i className={`bx bx-${this.state.search_component_is_visible ? 'x' : 'plus'} float-right cursor-pointer`} onClick={this.toggleSearchComponent}></i></h6>
                                <ul className="chat-sidebar-list d-none" style={{ listStyle: 'none' }}>
                                    <li>
                                        <h6 className="mb-0"># Devlopers</h6>
                                    </li>
                                    <li>
                                        <h6 className="mb-0"># Designers</h6>
                                    </li>
                                </ul>
                                {
                                    this.displayDiscussions(this.props.messages)
                                }
                            </div>
                        </div>
                        {/* <!-- app chat sidebar ends --> */}
                    </div>
                </div>
            </SafeRaiseError>
        )
    }
}