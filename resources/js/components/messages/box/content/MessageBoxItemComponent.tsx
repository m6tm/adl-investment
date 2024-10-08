import { isUndefined } from "lodash";
import React, { Component } from "react";


export default class MessageBoxContentItemComponent extends Component {
    props: Readonly<any>;
    render(): React.ReactNode {
        let { owner, message } = this.props;
        if (isUndefined(owner)) owner = true;
        if (isUndefined(message)) message = "";
        
        return owner ? this.renderOwner(message) : this.renderNotOwner(message);
    }

    renderOwner(message: string): React.ReactNode {
        return (
            <div className="ml-auto max-w-125">
                <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3">
                    <p className="font-medium text-white">You are welcome!</p>
                </div>
                <p className="text-right text-xs font-medium">1:55pm</p>
            </div>
        )
    }

    renderNotOwner(message: string): React.ReactNode {
        return (
            <div className="max-w-125">
                <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
                <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2">
                    <p className="font-medium">
                        I want to make an appointment tomorrow from 2:00 to
                        5:00pm?
                    </p>
                </div>
                <p className="text-xs font-medium">1:55pm</p>
            </div>
        )
    }
}
