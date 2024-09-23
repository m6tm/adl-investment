import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { getHook } from '../functions/tools';
import { CalendarProps } from '../interfaces/calendar';
import { EventEmitter } from 'events'
import SafeRaiseError from '../SafeRaiseError';
import Loading from '../Loading';

const CalendarSideBar = React.lazy(() => import('../CalendarSideBar'))
const Schedule = React.lazy(() => import('./Schedule'))

class Calendar extends Component {

        props!: Readonly<CalendarProps>;
        event: EventEmitter

        constructor(props: Readonly<{}>) {
                super(props);
                this.event = new EventEmitter()
        }

        componentDidMount(): void {
        }

        render() {
                return (
                        <SafeRaiseError>
                                <React.Suspense fallback={<Loading />}>
                                        <>
                                                {/* <!-- calendar sidebar start --> */}
                                                <div className="sidebar">
                                                        <CalendarSideBar {...{ token: this.props.token, event: this.event }} />
                                                </div>
                                                {/* <!-- calendar sidebar end --> */}
                                                {/* <!-- calendar view start  --> */}
                                                <div className="calendar-view">
                                                        {/* <!-- calendar view  --> */}
                                                        <div className="calendar-content scroll-mode h-100" style={{ overflowY: 'auto' }}>
                                                                <Schedule {...{ event: this.event, token: this.props.token }} />
                                                        </div>
                                                </div>
                                                {/* <!-- calendar view end  --> */}
                                        </>
                                </React.Suspense>
                        </SafeRaiseError>
                );
        }
}

let calendar = document.getElementById('calendar'),
        token = getHook()

if (calendar && token) createRoot(calendar).render(<Calendar {...{ token }} />)