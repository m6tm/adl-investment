import { isEmpty, isNull } from "lodash";
import React from "react";
import { AppContext } from "../../data/chat";
import { getURI } from "../../functions/tools";
import { AppContextInterface } from "../../interfaces/chat";


export class UserCard extends React.Component {
    props!: { visible: boolean, toggle: Function }
    context!: AppContextInterface;
    static contextType?: React.Context<any> | undefined = AppContext;

    constructor(props: {} | Readonly<{}>) {
        super(props)
    }

    render(): React.ReactNode {
        return (
            <div className={`chat-user-profile${this.props.visible ? ' show' : ''}`}>
                <header className="chat-user-profile-header text-center border-bottom">
                    <span className="chat-profile-close" onClick={() => this.props.toggle()}>
                        <i className="bx bx-x"></i>
                    </span>
                    <div className="my-2">
                        <div className="avatar">
                            {
                                isNull(this.context.avatar) ?
                                <img src={getURI() + '/avatar/user.png'} alt="user_avatar" height="100" width="100" /> :
                                    <img src={`${getURI()}/${this.context.avatar}`} alt="user_avatar" height="100" width="100" />
                            }
                        </div>
                        <h5 className="mb-0">{this.context.last_name} {this.context.first_name}</h5>
                        <span className="text-capitalize">{this.context.status}</span>
                    </div>
                </header>
                <div className="chat-user-profile-content">
                    <div className="chat-user-profile-scroll">
                        <h6 className="text-uppercase mb-1">Biography</h6>
                        <p className="mb-2">
                            {
                                isEmpty(this.context.bio) ? "Biography not predefined" : this.context.bio
                            }
                        </p>
                        <h6>PERSONAL INFORAMTION</h6>
                        <ul className="list-unstyled mb-2">
                            <li className="mb-25">{this.context.email}</li>
                            <li>
                                {
                                    isEmpty(this.context.phone) ? "Phone no predefine" : this.context.phone
                                }
                            </li>
                        </ul>
                        <h6 className="text-uppercase mb-1">CHANNELS</h6>
                        <ul className="list-unstyled mb-2">
                            <li><a href="#"># Devlopers</a></li>
                            <li><a href="#"># Designers</a></li>
                        </ul>
                        <h6 className="text-uppercase mb-1">SETTINGS</h6>
                        <ul className="list-unstyled">
                            <li className="mb-50 "><a href="#" className="d-flex align-items-center"><i className="bx bx-tag mr-50"></i> Add
                                Tag</a></li>
                            <li className="mb-50 "><a href="#" className="d-flex align-items-center"><i className="bx bx-star mr-50"></i>
                                Important Contact</a>
                            </li>
                            <li className="mb-50 "><a href="#" className="d-flex align-items-center"><i className="bx bx-image-alt mr-50"></i>
                                Shared
                                Documents</a></li>
                            <li className="mb-50 "><a href="#" className="d-flex align-items-center"><i className="bx bx-trash-alt mr-50"></i>
                                Deleted
                                Documents</a></li>
                            <li><a href="#" className="d-flex align-items-center"><i className="bx bx-block mr-50"></i> Blocked
                                Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}