import React, { Component } from "react";
import MessageListComponentProps from "../../../types/MessageListComponentProps";


export default class SearchDiscussionInput extends Component {
    declare props: Readonly<MessageListComponentProps>;
    search_text = ''

    constructor(props: any) {
        super(props);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.search_text = e.target.value
        this.props.onSearch(this.search_text)
    }

    render(): React.ReactNode {
        return (
            <form className="sticky mb-7" onSubmit={e => e.preventDefault()}>
                <input type="text"
                    className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                    placeholder="Search..." onChange={this.onChange} />
                <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => this.props.onSearch(this.search_text)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                            fill="#637381" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z"
                            fill="#637381" />
                    </svg>
                </button>
            </form>
        )
    }
}