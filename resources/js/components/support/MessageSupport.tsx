import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
    Bot,
    ChevronDown,
    CircleUserRound,
    MessageCircleQuestion,
    SendHorizonal,
    XIcon,
} from "lucide-react";
import { DiscussionsSupport, Questions } from "../../types/constants";
import { QUESTIONS } from "../../contants";

function MessageSupport() {
    const inputRef = React.createRef<HTMLInputElement>();
    const [isOpen, setIsOpen] = useState(false);
    const [isReduced, setIsReduced] = useState(true);
    const [discussions, setDiscussions] = useState<DiscussionsSupport>([]);

    function search() {
        let userInput = "";
        if (inputRef.current) userInput = inputRef.current.value;
        const response = findBestMatch(userInput);
        if (response !== -1) {
            if (!isOpen) setIsOpen(true);
            setDiscussions([
                ...discussions,
                {
                    type: "user",
                    message: userInput,
                },
                {
                    type: "support",
                    message: QUESTIONS[response].answer,
                },
            ]);
        } else {
            setDiscussions([
                ...discussions,
                {
                    type: "user",
                    message: userInput,
                },
                {
                    type: "support",
                    message: "Désolé, je ne comprends pas votre question.",
                },
            ]);
        }
        inputRef.current!.value = "";
        inputRef.current!.focus();
    }

    function closeDiscussion() {
        inputRef.current!.value = "";
        setIsOpen(false);
        setDiscussions([]);
        setIsReduced(true);
    }

    return (
        <div className="fixed bottom-20 right-[15px] z-9">
            <div
                className={`w-[300px] h-[400px] bg-slate-50 overflow-hidden rounded-lg shadow-6 absolute right-full bottom-full ${
                    !isReduced ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-all duration-300`}
            >
                <div className="w-full h-full flex flex-col">
                    <div className="h-10 bg-[var(--accent-color)] w-full flex items-center justify-between px-2">
                        <button
                            className="size-7 text-white"
                            onClick={() => setIsReduced(true)}
                        >
                            <ChevronDown className="text-white size-7" />
                        </button>
                        <button
                            className="size-7 text-white"
                            onClick={closeDiscussion}
                        >
                            <XIcon className="text-white size-7" />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-2 py-2">
                        {discussions.map((item_discussion, index) => (
                            <div
                                key={index}
                                className={`flex items-center px-2 py-1 ${
                                    item_discussion.type === "user"
                                        ? "bg-slate-100 flex-row-reverse"
                                        : "bg-neutral-200"
                                }`}
                            >
                                <div className="flex justify-center items-center">
                                    {item_discussion.type === "user" ? (
                                        <CircleUserRound className="text-slate-500" />
                                    ) : (
                                        <Bot className="text-slate-500" />
                                    )}
                                </div>
                                <div className="flex-grow px-2">
                                    <div
                                        className={`text-sm font-bold ${
                                            item_discussion.type === "user"
                                                ? "text-right"
                                                : "text-left"
                                        }`}
                                    >
                                        {item_discussion.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-10 bg-slate-100 w-full flex">
                        <div className="h-full flex-grow flex items-center px-2">
                            <input
                                type="text"
                                placeholder="Question ..."
                                ref={inputRef}
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </div>
                        <div className="h-full w-10 flex justify-center items-center">
                            <button onClick={search}>
                                <SendHorizonal className="text-slate-500 size-7" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="size-[44px] rounded-full flex justify-center items-center bg-[var(--accent-color)]"
                onClick={() => {
                    setIsReduced(!isReduced);
                    inputRef.current!.focus();
                }}
            >
                {isReduced ? (
                    <MessageCircleQuestion className="text-white size-7" />
                ) : (
                    <XIcon className="text-white size-7" />
                )}
            </button>
        </div>
    );
}

const element = document.getElementById("client-message");

if (element) createRoot(element).render(<MessageSupport />);

function findBestMatch(userInput: string) {
    const userWords = userInput.toLowerCase().split(" ");
    // let bestMatch: null | string = null;
    let bestIndex = -1;

    for (const qa of QUESTIONS) {
        const questionWords = qa.question.toLowerCase().split(" ");
        const matchCount = userWords.filter((word) =>
            questionWords.includes(word)
        ).length;

        if (matchCount > 0) {
            // bestMatch = qa.answer; // On prend la première correspondance trouvée
            bestIndex = QUESTIONS.indexOf(qa);
            break; // On s'arrête dès qu'on trouve une correspondance
        }
    }

    return bestIndex;
}
