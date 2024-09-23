import { isUndefined } from "lodash";
import React, { createRef, Suspense } from "react";
import { AppContext } from "../../data/chat";
import { getURI } from "../../functions/tools";
import { AppContextInterface, GroupAudioCallProps } from "../../interfaces/chat";
import Loading from "../../Loading";
import SafeRaiseError from "../../SafeRaiseError";



export default class GroupAudioCall extends React.Component {
        props!: Readonly<GroupAudioCallProps>;
        context!: AppContextInterface;
        static contextType?: React.Context<any> | undefined = AppContext;
        members: React.RefObject<HTMLDivElement> = createRef()

        constructor(props: Readonly<{}>) {
                super(props)
        }

        componentDidMount(): void {
                this.context.event.on('set members - audio', () => {
                        Array.from(this.members.current!.children).forEach(item_member => {
                                let member_id = parseInt(item_member.getAttribute('data-user')!),
                                        member = this.props.call_members.find(member => member.user.id == member_id)

                                if (isUndefined(member)) return
                                if (member.user.id == this.context.id) return
                                item_member.querySelector('audio')!.srcObject = member.stream
                                item_member.querySelector('audio')!.play()
                        })
                })
        }

        displayMyMicrophoneState = () => {
                let className = 'bx bx-microphone'
                if (!this.props.call_members.some(member_item => member_item.user.id == this.context.id)) return ''
                let addon = this.props.call_members.find(member_item => member_item.user.id == this.context.id)!.audio_muted ? '-off' : ''
                className = `${className}${addon}`
                return className
        }

        render(): React.ReactNode {
                return (
                        <SafeRaiseError>
                                <Suspense fallback={<Loading />}>
                                        {
                                                this.props.is_visible ?
                                                        <section
                                                                className="group-call-modal">
                                                                <section className="contain">
                                                                        <section className="call-center scroll-mode">
                                                                                <div className="row w-100 ml-0" ref={this.members}>
                                                                                        {
                                                                                                this.props.call_members.map(((call_member, index) => (
                                                                                                        <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 call-center-item mb-3" data-user={call_member.user.id}>
                                                                                                                <section key={index} className="call-center-inner">
                                                                                                                        <img src={`${getURI(call_member.user.avatar)}`} alt="User avatar" />
                                                                                                                        <audio src={""} hidden></audio>
                                                                                                                        <div className="call-center-caption d-flex flex-column align-items-center justify-content-center">
                                                                                                                                <span className="text-capitalize text-muted font-weight-bold">{call_member.user.last_name} {call_member.user.first_name}</span>
                                                                                                                                <section>
                                                                                                                                        <i className={`bx bx-microphone${call_member.audio_muted ? '-off' : ''} text-bold`}></i>
                                                                                                                                </section>
                                                                                                                        </div>
                                                                                                                </section>
                                                                                                        </div>
                                                                                                )))
                                                                                        }
                                                                                </div>
                                                                        </section>
                                                                        <section className="call-panel">
                                                                                <strong className="time-recorder" ref={this.props.recorder_time_ref}>00:00:00</strong>
                                                                                <button
                                                                                        className="btn btn-sm btn-light-danger"
                                                                                        onClick={() => this.props.discard(true)}>
                                                                                        <i className="bx bx-phone"></i>
                                                                                </button>
                                                                                {
                                                                                        !this.props.call_picked_up ?
                                                                                                <button
                                                                                                        className="btn btn-sm btn-light-success"
                                                                                                        onClick={() => this.props.acceptCall()}>
                                                                                                        <i className="bx bx-phone"></i>
                                                                                                </button> : null
                                                                                }
                                                                                <button className="btn btn-sm btn-light-secondary" onClick={this.props!.mute_unmute_microphone}>
                                                                                        <i className={this.displayMyMicrophoneState()}></i>
                                                                                </button>
                                                                        </section>
                                                                </section>
                                                        </section> : null
                                        }
                                </Suspense>
                        </SafeRaiseError>
                )
        }
}