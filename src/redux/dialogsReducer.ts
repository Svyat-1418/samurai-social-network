const SEND_MESSAGE = "SEND-MESSAGE"

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    messageText: string
}
export type DialogsActionsType =
    SendMessageActionType

const initialState = {
    dialogs: [
        {id: 1, name: "Dmitri"},
        {id: 2, name: "Victoria"},
        {id: 3, name: "Igor"},
        {id: 4, name: "Sasha_IT-Patsan"},
        {id: 5, name: "Sveta"}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "How are you, Sasha?"},
        {id: 2, message: "Good. Are you?"},
        {id: 3, message: "Good"}
    ] as Array<MessageType>
}
export type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 15436, message: action.messageText}],
            }
        default:
            return state
    }
}

export const sendMessageAC = (messageText: string): SendMessageActionType => ({type: SEND_MESSAGE, messageText} as const)