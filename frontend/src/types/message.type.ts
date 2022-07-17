export type StateType = {
    messages: Array<AllMessageType>,
};

interface IMessagesType<T extends MessagesType> {
    from: T["from"];
    content: T["content"];
    key: T["key"];
}

type MessagesType = {
    from: number, // 0 for bot, 1 for User(human)
    content: AllContentType | string,
    key: string,
};

type RobotMessage = IMessagesType<{
    from: 0,
    content: AllContentType,
    key: string,
}>

type UserMessage = IMessagesType<{
    from: 1,
    content: string,
    key: string,
}>

type AllMessageType = RobotMessage | UserMessage;

interface IContentType<T extends ContentType> {
    type: T["type"];
    text?: T["text"];
    cards?: T["cards"];
}

type ContentType = {
    type: number, // 1 for text, 10 for card
    text?: string,
    cards?: Array<StandardCardType>,
};

type ContentText = IContentType<{
    type: 1,
    text?: string,
}>

type ContentCard = IContentType<{
    type: 10,
    text?: string,
    cards?: Array<StandardCardType>,
}>

type AllContentType = ContentText | ContentCard;

type StandardCardType = {
    desc?: string,
    title?: string,
    key?: string,
};
