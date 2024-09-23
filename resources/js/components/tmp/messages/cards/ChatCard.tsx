import { isEmpty, isNull } from "lodash";
import React, { createRef } from "react";
import { setGroupAvatar, setGroupDescription, setGroupName } from "../../API/chat";
import { AppContext } from "../../data/chat";
import { DISCUSSTION_PERMISSION, DISCUSSTION_TYPE } from "../../enums/chat";
import { getURI, in_array } from "../../functions/tools";
import { AppContextInterface, ChatCardState, ChatUserDiscussionParticipant, Discussion, GroupProfileRef } from "../../interfaces/chat";
import SafeRaiseError from "../../SafeRaiseError";


export class ChatCard extends React.Component {
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;
    props!: { tchat: Discussion }
    state: Readonly<ChatCardState>;

    group_profile: GroupProfileRef = {
        avatar: createRef(),
        'avatar-input': createRef(),
        'edit-avatar-btn': createRef(),
    }

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            group_name_editting: false,
            group_name: this.props.tchat.group_name,
            group_description_editting: false,
            group_description: this.props.tchat.group_description || "Empty description for a moment",
        }
    }

    onGroupAvatarChange = async (files: FileList | null) => {
        if (isNull(files) || files.length == 0) return
        const newAvatar = files[0],
            oldAvatar = this.group_profile.avatar.current!.getAttribute('src')!

        this.group_profile.avatar.current!.setAttribute('src', URL.createObjectURL(newAvatar))
        const response = await setGroupAvatar(this.context.more_info.tk, this.props.tchat.discussion_id, newAvatar)

        if (response.code !== 200) {
            this.group_profile.avatar.current!.setAttribute('src', oldAvatar)
            return
        }
        await this.context.more_info.updateMessages()
    }

    onGroupNameChange = (group_name: string) => this.setState({ ...this.state, ...{ group_name } })

    onGroupNameSave = async () => {
        if (this.state.group_name.length < 3) return
        await setGroupName(this.context.more_info.tk, this.props.tchat.discussion_id, this.state.group_name)
        await this.context.more_info.updateMessages()
    }

    onGroupDescriptionSave = async () => {
        if (this.state.group_description.length < 3) return
        await setGroupDescription(this.context.more_info.tk, this.props.tchat.discussion_id, this.state.group_description)
        await this.context.more_info.updateMessages()
    }

    onGroupDescriptionChange = (group_description: string) => this.setState({ ...this.state, ...{ group_description } })

    displayDescription = () => {
        if (this.props.tchat.category == DISCUSSTION_TYPE.GROUPS) {
            return this.state.group_description_editting ?
                <textarea
                    cols={30}
                    rows={10}
                    className="form-control form-control-sm"
                    value={this.state.group_description}
                    onChange={e => this.onGroupDescriptionChange(e.target.value)}
                    placeholder="Group description"></textarea> :
                (
                    this.props.tchat.group_description && this.props.tchat.group_description.length > 0 ?
                        this.props.tchat.group_description : "Empty description for a moment"
                )
        } else {
            return (
                isEmpty(this.props.tchat.participant.you.bio) ? "Biography not predefined" : this.props.tchat.participant.you.bio!
            )
        }
    }

    displayOptions = (user: ChatUserDiscussionParticipant) => {
        if (!in_array(this.props.tchat.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR])) return null
        let permissionInnerText = ''
        permissionInnerText = user.permission == DISCUSSTION_PERMISSION.ADMIN ? 'Remove ad admin' : 'Add as admin'
        return (
            <>
                <button type="button" className="chat-profile-member-option dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Remove</a>
                    <a className="dropdown-item" href="#">Block</a>
                    {
                        user.permission !== DISCUSSTION_PERMISSION.AUTHOR ??
                        <a className="dropdown-item" href="#">{permissionInnerText}</a>
                    }
                </div>
            </>
        )
    }

    render(): React.ReactNode {
        return (
            <SafeRaiseError>
                <section className={`chat-profile d-flex flex-column`} id="chat-profile" style={{ top: '96px' }}>
                    <header className="chat-profile-header text-center border-bottom" style={{ flex: .1 }}>
                        <span className="chat-profile-close" id="chat-profile-close">
                            <i className="bx bx-x"></i>
                        </span>
                        <div className="my-2">
                            {/* Discussion avatar */}
                            <div className="avatar position-relative">
                                {
                                    <img
                                        src={
                                            `${getURI()}/${isNull(this.props.tchat.participant.you.avatar) || isNull(this.props.tchat.avatar) ? 'avatar/user.png' : (
                                                this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                                    `groups_avatar/${this.props.tchat.avatar}` :
                                                    this.props.tchat.participant.you.avatar
                                            )
                                            }`
                                        }
                                        onClick={() => this.group_profile["avatar-input"].current!.click()}
                                        ref={this.group_profile.avatar}
                                        height="100px"
                                        width="100px"
                                        alt="sidebar user image" />
                                }
                                {
                                    this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                        (
                                            (in_array(this.props.tchat.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR])) ?
                                                <>
                                                    <i
                                                        className="bx bx-pencil edit-group-avatar"
                                                        ref={this.group_profile["edit-avatar-btn"]}
                                                        onClick={() => this.group_profile["avatar-input"].current!.click()}></i>
                                                    <input
                                                        type="file"
                                                        hidden
                                                        ref={this.group_profile["avatar-input"]}
                                                        accept=".jpg,.jpeg,.png"
                                                        onChange={e => this.onGroupAvatarChange(e.target.files)} />
                                                </> : null
                                        ) : null
                                }
                            </div>
                            {/* Group name section */}
                            <h5 className="app-chat-user-name mb-0 position-relative mx-2">
                                {
                                    this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                        (
                                            (in_array(this.props.tchat.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR])) ?
                                                <>
                                                    {
                                                        this.state.group_name_editting ?
                                                            <i
                                                                className="bx bx-check edit-group-avatar"
                                                                onClick={() => {
                                                                    this.setState({ ...this.state, ...{ group_name_editting: !this.state.group_name_editting } })
                                                                    this.onGroupNameSave()
                                                                }}></i> :
                                                            <i
                                                                className="bx bx-pencil edit-group-avatar"
                                                                onClick={() => this.setState({ ...this.state, ...{ group_name_editting: !this.state.group_name_editting } })}></i>
                                                    }
                                                </> : null
                                        ) : null
                                }
                                {
                                    this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                        (
                                            this.state.group_name_editting ?
                                                <input type="text" className="form-control form-control-sm" value={this.state.group_name} onChange={e => this.onGroupNameChange(e.target.value)} /> :
                                                this.state.group_name
                                        ) :
                                        this.props.tchat.participant.you.last_name + ' ' + this.props.tchat.participant.you.first_name
                                }
                            </h5>
                            <span className="text-capitalize">
                                {
                                    this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                        null :
                                        this.props.tchat.participant.you.status
                                }
                            </span>
                        </div>
                    </header>
                    <div className="chat-profile-content p-2 position-relative scroll-mode" style={{ flex: .9, overflowY: 'auto' }}>
                        <h6 className="mt-1 text-uppercase">
                            {
                                this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                    'Description ' :
                                    'Biography'
                            }
                        </h6>
                        <p className="position-relative">
                            {
                                this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                    (
                                        (in_array(this.props.tchat.permission, [DISCUSSTION_PERMISSION.ADMIN, DISCUSSTION_PERMISSION.AUTHOR])) ?
                                            <>
                                                {
                                                    this.state.group_description_editting ?
                                                        <i
                                                            className="bx bx-check edit-group-avatar"
                                                            onClick={() => {
                                                                this.setState({ ...this.state, ...{ group_description_editting: !this.state.group_description_editting } })
                                                                this.onGroupDescriptionSave()
                                                            }}></i> :
                                                        <i
                                                            className="bx bx-pencil edit-group-avatar"
                                                            onClick={() => this.setState({ ...this.state, ...{ group_description_editting: !this.state.group_description_editting } })}></i>
                                                }
                                            </> : null
                                    ) : null
                            }
                            {
                                this.displayDescription()
                            }
                        </p>
                        {
                            this.props.tchat.category == DISCUSSTION_TYPE.GROUPS ?
                                <>
                                    <h6 className="mt-2">MEMBERS LIST</h6>
                                    <ul className="list-unstyled chat-profile-member">
                                        {this.props.tchat.group_participant.map((user, index) => (
                                            <li key={index} className="my-2">
                                                <p className="d-flex flex-row align-items-start mb-0">
                                                    <span className={`${user.id == this.context.id ? 'font-weight-bold text-italic ' : ''}mr-1`}>
                                                        {`${user.id == this.context.id ? 'You' : user.user_name}`}
                                                    </span>
                                                    <small className={
                                                        `text-lowercase font-weight-bold badge badge-pill ${user.permission == DISCUSSTION_PERMISSION.AUTHOR ? 'bg-success' : (
                                                            user.permission == DISCUSSTION_PERMISSION.ADMIN ?
                                                            'bg-warning' :
                                                            'bg-secondary'
                                                            )
                                                        } d-flex align-items-center`
                                                    }>
                                                        {`${user.permission}`}
                                                    </small>
                                                </p>
                                                {
                                                    this.displayOptions(user)
                                                }
                                            </li>
                                        ))}
                                        <li className="mb-25">{this.props.tchat.participant.you.email}</li>
                                    </ul>
                                </> : null
                        }
                    </div>
                </section>
            </SafeRaiseError>
        )
    }
}