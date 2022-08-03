import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/fieldValidators";
import {Input} from "../common/FieldControls/FieldControls";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {AppRootStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router-dom";
import {LoginPayloadType} from "../../api/api";

export type MapStateToPropsType = {
    isAuth: boolean
}
type PropsType = {
    isAuth: boolean
    login: (payload: LoginPayloadType) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType =>
    ({isAuth: state.auth.isAuth})

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Input}
                    name={"email"}
                    placeholder={"Type your email"}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    component={Input}
                    type={"password"}
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

export const Login = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
        })
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (<div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default connect(mapStateToProps, {login})(Login)