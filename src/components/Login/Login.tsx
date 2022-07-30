import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/fieldValidators";
import {Input} from "../common/FieldControls/FieldControls";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Input}
                    name={"login"}
                    placeholder={"Type your login"}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    component={Input}
                    name={"password"}
                    placeholder={"Type your password"}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    component={"input"}
                    type={"checkbox"}
                    name={"rememberMe"}
                />
                Remember Me
            </div>
            <button>Log in</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (<div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}