
export type Question = {
    question: string;
    answer: string;
}

export type Questions = Question[];

export type DiscussionSupport = {
    type: "user" | "support";
    message: string;
}

export type DiscussionsSupport = DiscussionSupport[];