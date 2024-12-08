import React, { Component } from "react";
import ImageSvg from "./ImageSvg";

export default class MessageBoxForgroundComponent extends Component {
    render(): React.ReactNode {
        return (
            <div className="h-full flex justify-center items-center flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
                <ImageSvg className="size-1/2" />
            </div>
        );
    }
}
