import React from "react";
import styles from "./MyPosts.module.css"
import {Post} from "../Post/Post";
import {InitialStateType} from "../../redux/profileReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/fieldValidators";
import {Textarea} from "../common/FieldControls/FieldControls";

type PropsType = {
    profilePage: InitialStateType
    addPost: (postText: string) => void
}

type FormDataType = {
    postText: string
}

const validateMaxLength = maxLengthCreator(15)

const AddPostForm = (props: InjectedFormProps<FormDataType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={"postText"}
                    placeholder="Write post text here..."
                    validate={[required, validateMaxLength]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<FormDataType>({form: "addPost"})(AddPostForm)

export const MyPosts = React.memo((props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.addPost(formData.postText)
    }

    return (
        <>
            <AddPostReduxForm onSubmit={onSubmit}/>
            <div className={styles.posts}>
                {props.profilePage.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                        likesCount={p.likesCount}/>)}
            </div>
        </>
    )
})