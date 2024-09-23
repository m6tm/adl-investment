import { isEmpty, isNull, isUndefined } from "lodash";
import React, { createRef } from "react";
import { createNewConversation, getCompanyMember } from "../API/chat";
import { AppContext } from "../data/chat";
import { DISCUSSTION_TYPE } from "../enums/chat";
import { getURI, in_array, sleep } from "../functions/tools";
import { AppContextInterface, CustomUser, NewConversationProps, NewConversationState, User } from "../interfaces/chat";
import SafeRaiseError from "../SafeRaiseError";


export class NewConversation extends React.Component {
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;
    state!: NewConversationState
    props!: NewConversationProps
    members!: Array<User> | null
    group_members!: Array<User> | null
    container: React.RefObject<HTMLDivElement> = React.createRef()
    selected_group_member = new Set()
    group_avatar: React.RefObject<HTMLImageElement> = createRef()
    group_avatar_input: React.RefObject<HTMLInputElement> = createRef()

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            search_is_pending: true,
            has_error: false,
            error: '',
            results: [],
            group_name: '',
            group_member_results: [],
            selected_group_member: [],
            group_avatar: null,
        }
    }

    async componentDidMount() {
        const { tk: token, company } = this.context.more_info
        const { data: users, response } = await getCompanyMember(token)
        if (isEmpty(users)) {
            this.setState({ ...this.state, ...{ has_error: true, error: response } })
            return
        }

        this.members = users
        this.group_members = users
        this.setState({ ...this.state, ...{ search_is_pending: false } })
    }

    setGroupName = ({ target: input }: any) => this.setState({ ...this.state, ...{ group_name: input.value } })

    searchMember = ({ target: input }: any) => {
        if (input.value.length == 0) {
            this.setState({ ...this.state, ...{ results: [] } });
            return
        }
        const { members, props: { users } } = this;

        const matchingUsers = Object.values(members!)?.filter((user) => {
            const fullName = `${user.last_name} ${user.first_name} ${user.user_name}`.toLowerCase();
            return fullName.includes(input.value.toLowerCase()) && isUndefined(users.find((usr) => usr.id === user.id));
        });

        const results = isUndefined(matchingUsers) ? [] : matchingUsers;
        this.setState({ ...this.state, ...{ results } });
    }

    searchGroupMember = ({ target: input }: any) => {
        if (input.value.length == 0) {
            this.setState({ ...this.state, ...{ group_member_results: [] } })
            return
        }
        const { group_members, props: { users } } = this;

        const matchingUsers = Object.values(group_members!)!.filter(user => {
            const fullName = `${user.last_name} ${user.first_name} ${user.user_name}`.toLowerCase();
            return fullName.includes(input.value.toLowerCase());
        });

        const group_results = isUndefined(matchingUsers) ? [] : matchingUsers;
        this.setState({ ...this.state, ...{ group_member_results: group_results } });
    }

    createConversation = async (user: User) => {
        this.setState({ ...this.state, ...{ search_is_pending: true } })
        const { code } = await createNewConversation(this.context.more_info.tk, [user.id], DISCUSSTION_TYPE.CHATS);
        if (code !== 200) {
            this.setState({ ...this.state, ...{ results: [], search_is_pending: false } })
            return
        }
        this.context.more_info.setupDiscussion();
        await sleep(500)
        this.setState({ ...this.state, ...{ results: [], search_is_pending: false } })
        this.props.toggleSearchComponent()
    }

    createGroup = async () => {
        if (isEmpty(this.state.selected_group_member)) {
            this.setState({ ...this.state, ...{ search_is_pending: false, has_error: true, error: "You're not choose group member" } })
            return
        }
        if (this.state.group_name.length <= 3) {
            this.setState({ ...this.state, ...{ search_is_pending: false, has_error: true, error: "Group name must contain more than 3 characters" } })
            return
        }

        this.setState({ ...this.state, ...{ search_is_pending: true, has_error: false, error: '' } })
        const { code } = await createNewConversation(this.context.more_info.tk, this.state.selected_group_member, DISCUSSTION_TYPE.GROUPS, !isNull(this.state.group_avatar) ? this.state.group_avatar : undefined, this.state.group_name);
        if (code !== 200) {
            this.setState({ ...this.state, ...{ results: [], search_is_pending: false, group_avatar: null } })
            return
        }
        this.context.more_info.setupDiscussion();
        await sleep(500)
        this.setState({ ...this.state, ...{ results: [], search_is_pending: false, group_avatar: null } })
        this.props.toggleSearchComponent()
    }

    changeGroupAvatar = (e: any) => {
        let file: File = e.target.files[0]
        this.group_avatar.current!.setAttribute('src', URL.createObjectURL(file))
        this.setState({ ...this.state, ...{ group_avatar: file } })
    }

    selectUser = (user_id: number) => {
        if (in_array(user_id, this.state.selected_group_member)) {
            this.setState({ ...this.state, ...{ selected_group_member: this.state.selected_group_member.filter(id => id !== user_id) } })
        } else {
            this.setState({ ...this.state, ...{ selected_group_member: [...this.state.selected_group_member, ...[user_id]] } })
        }
    }

    render(): React.ReactNode {
        return !this.props.is_visible ? null : (
            <SafeRaiseError>
                {
                    this.state.search_is_pending ?
                        <div className="d-flex justify-content-center py-1 position-absolute w-100" style={styles.loading}>
                            {
                                !this.state.has_error ?
                                    <div className="spinner-grow" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> :
                                    <div className="p-0">
                                        <i className="text-danger">{this.state.error}</i>
                                    </div>
                            }
                        </div> :
                        <div
                            className={`shadow pt-1 border-top-2 border-top-info`}
                            ref={this.container}
                            style={styles["new-user-container"]}>
                            {/* Search member */}
                            <ul className="nav nav-tabs chat-search-conversation" id="SearchChat" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link" id="group-tab" data-toggle="tab" href="#group" role="tab" aria-controls="group" aria-selected="true">Group</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="conversation-tab" data-toggle="tab" href="#conversation" role="tab" aria-controls="conversation" aria-selected="false">Conversation</a>
                                </li>
                            </ul>
                            <div className="tab-content p-0" id="SearchChatContent">
                                {/* Group Search */}
                                <div className="tab-pane fade" id="group" role="tabpanel" aria-labelledby="group-tab">
                                    <section className="form-group position-relative has-icon-left mx-75 mt-2 mb-0">
                                        <figure>
                                            <img src={`${getURI('avatar/user.png')}`} ref={this.group_avatar} alt="Group avatar" onClick={() => this.group_avatar_input.current!.click()} />
                                            <figcaption className="sr-only">Group avatar</figcaption>
                                        </figure>
                                        <input type="file" hidden ref={this.group_avatar_input} accept=".jpg,.jpeg,.png,.gif" onChange={this.changeGroupAvatar} />
                                    </section>
                                    <section className="form-group position-relative has-icon-left mx-75 mt-2 mb-0">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm round"
                                            placeholder="Group name"
                                            onKeyUp={this.setGroupName} />
                                        <div className="form-control-position">
                                            <i className="bx bx-group text-dark"></i>
                                        </div>
                                    </section>
                                    <section className="form-group position-relative has-icon-left mx-75 mt-2 mb-0">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm round"
                                            placeholder="Add group member"
                                            onKeyUp={this.searchGroupMember} />
                                        <div className="form-control-position">
                                            <i className="bx bx-search-alt text-dark"></i>
                                        </div>
                                    </section>
                                    <section className="form-group position-relative has-icon-left mx-75 mt-2 mb-0 text-right">
                                        <button
                                            className="btn btn-sm btn-outline-primary text-capitalize"
                                            onClick={() => this.createGroup()}>
                                            <i className="bx bx-plus"></i>
                                            Create group
                                        </button>
                                    </section>
                                    <div className="container my-1 scroll-mode" style={styles["contact-list"]}>
                                        <ul className="m-0 p-0 list-group list-group-flush chatgroup-user-list">
                                            {
                                                this.state.group_member_results.length > 0 && !this.state.has_error ?
                                                    this.state.group_member_results.map(user => <li key={user.id} className="list-group-item px-1 mx-0 text-capitalize" onClick={() => false}>
                                                        <input type="checkbox" checked={in_array(user.id, this.state.selected_group_member)} onChange={() => this.selectUser(user.id)} />
                                                        {user.last_name + ' ' + user.first_name}
                                                    </li>) :
                                                    <small className="d-block text-center">
                                                        {
                                                            this.state.has_error ?
                                                                <i className="text-danger">{this.state.error}</i> :
                                                                'Empty'
                                                        }
                                                    </small>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/* Conversation Search */}
                                <div className="tab-pane fade show active" id="conversation" role="tabpanel" aria-labelledby="conversation-tab">
                                    <fieldset className="form-group position-relative has-icon-left mx-75 mt-2 mb-0">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm round"
                                            placeholder="Search member"
                                            onKeyUp={this.searchMember} />
                                        <div className="form-control-position">
                                            <i className="bx bx-search-alt text-dark"></i>
                                        </div>
                                    </fieldset>
                                    <div className="container my-1 scroll-mode" style={styles["contact-list"]}>
                                        <ul className="m-0 p-0 list-group list-group-flush">
                                            {
                                                this.state.results.length > 0 ?
                                                    this.state.results.map(user => <li key={user.id} className="list-group-item px-1 mx-0 text-capitalize" onClick={() => this.createConversation(user)}>{user.last_name + ' ' + user.first_name}</li>) :
                                                    <small className="d-block text-center">Empty</small>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </SafeRaiseError>
        )
    }
}

const styles: {
    'new-user-container': React.CSSProperties,
    'contact-list': React.CSSProperties,
    'loading': React.CSSProperties,
} = {
    'new-user-container': {
        position: 'absolute',
        top: '55px',
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        zIndex: 1,
    },
    "contact-list": {
        maxHeight: '100px',
        overflowY: 'auto'
    },
    loading: {
        top: 0,
        left: 0,
        backgroundColor: 'white'
    }
}