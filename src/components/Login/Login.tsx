import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/fieldValidators";
import {Input} from "../common/FieldControls/FieldControls";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {AppRootStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router-dom";
import {LoginPayloadType} from "../../api/api";
import styles from "../common/FieldControls/FieldControls.module.css"

export type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type LoginPropsType = {
  isAuth: boolean
  login: (payload: LoginPayloadType) => void
  captchaUrl: string | null
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType =>
  ({isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl})

type FormDataType = {
  // names Fields must match the keys in this object

  email: string
  password: string
  rememberMe: boolean
  captchaUrl: string | null
}
type PropsType = {
  captchaUrl: string | null
}

const LoginForm = (props: InjectedFormProps<FormDataType, PropsType> & PropsType) => {
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
      {/* view res error on layout */}
      {props.error && <div className={styles.summaryLoginFormError}>
        {props.error}
      </div>}
      <div>
        <Field
          component={"input"}
          type={"checkbox"}
          name={"rememberMe"}
        />
        Remember Me
      </div>

      {props.captchaUrl &&
          <div>
              <img src={props.captchaUrl} alt=""/>
              <Field name="captchaUrl"
                     component={Input}
                     placeholder={"Type symbols from captcha"}
              />
          </div>
      }

      <button>Log in</button>
    </form>
  )
}

const LoginReduxForm = reduxForm<FormDataType, PropsType>({form: 'login'})(LoginForm)

export const Login = (props: LoginPropsType) => {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData)
    props.login({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
      captcha: formData.captchaUrl
    })
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return (<div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

export default connect(mapStateToProps, {login})(Login)