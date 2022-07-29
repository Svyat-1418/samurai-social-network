import React, {ChangeEvent} from "react";
import styles from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";
import {InitialStateType} from "../../redux/dialogsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
type FormDataType = {
    messageText: string
}

const SendMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.sendMessageForm}>
            <Field
                component={"textarea"}
                name={"messageText"}
                placeholder="Write new message"/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const SendMessageReduxForm = reduxForm<FormDataType>({form: "sendMessage"})(SendMessageForm)

export const Dialogs = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.sendMessage(formData.messageText)
    }

    return (
        <div className={styles.dialogsPage}>
            <div className={styles.dialogsWrapper}>
                <h3 className={styles.title}>Dialogs</h3>
                {props.dialogsPage.dialogs.map(d => <Dialog key={d.id} id={d.id} name={d.name}/>)}
                <SendMessageReduxForm onSubmit={onSubmit} />
            </div>

            <div className={styles.messagesWrapper}>
                <h3 className={styles.title}>Messages</h3>
                {props.dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)}
            </div>
        </div>
    )
}