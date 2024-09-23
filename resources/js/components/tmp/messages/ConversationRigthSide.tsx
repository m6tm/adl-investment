import React from "react";
import { ChatCard } from "./cards/ChatCard";
import { AppContext } from "../data/chat";
import { AppContextInterface, Discussion, ConversationRigthSideProps } from "../interfaces/chat";
import SafeRaiseError from "../SafeRaiseError";


export default class ConversationRigthSide extends React.Component {
    props!: ConversationRigthSideProps
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    render(): React.ReactNode {
        return (
            <SafeRaiseError>
                <div className="content-right" ref={this.context.more_info.control_center}>
                    <div className="content-overlay"></div>
                    <div className="content-wrapper">
                        <div className="content-header row"></div>
                        <div className="content-body h-100">
                            {/* <!-- app chat overlay --> */}
                            <div className="chat-overlay"></div>
                            {/* <!-- app chat window start --> */}
                            <section className="chat-window-wrapper h-100">
                                <div className={`chat-start${this.props.current_conversation == '' ? '' : ' d-none'}`}>
                                    <span className="bx bx-message chat-sidebar-toggle chat-start-icon font-large-3 p-3 mb-1"></span>
                                    <h4 className="d-none d-lg-block py-50 text-bold-500">Select a contact to start a chat!</h4>
                                    <button className="btn btn-light-primary chat-start-text chat-sidebar-toggle d-block d-lg-none py-50 px-1">Start Conversation!</button>
                                </div>
                                <div className={`chat-area h-100${this.props.current_conversation == '' ? ' d-none' : ''}`}>
                                    {
                                        this.props.displayConversation(this.props.extractToChatList(Object.values(this.props.messages).map(categ => categ)))
                                    }
                                </div>
                            </section>
                            {/* <!-- app chat window ends --> */}
                            {/* <!-- app chat profile right sidebar start --> */}
                            {
                                this.props.extractToChatList(Object.values(this.props.messages).map(categ => categ)).map((card: Discussion, index: number) =>
                                    <ChatCard key={index} {...{ tchat: card }} />
                                )
                            }
                            {/* <!-- app chat profile right sidebar ends --> */}
                        </div>
                    </div>
                </div>
            </SafeRaiseError>
        )
    }
}