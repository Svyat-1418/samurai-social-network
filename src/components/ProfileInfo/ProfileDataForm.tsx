import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {UpdateProfilePayloadType} from "../../api/api";
import {ContactsType, ProfileType} from "../../redux/profileReducer";
import {Input, Textarea} from "../common/FieldControls/FieldControls";
import {Contact} from "./Contact";
import styles from "../common/FieldControls/FieldControls.module.css";

type PropsType = {
  onSubmit: (formData: UpdateProfilePayloadType) => void
  initialValues: ProfileType
  profile: ProfileType
}

export const ProfileDataForm:
  FC<InjectedFormProps<UpdateProfilePayloadType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>Save</button>
      </div>

      <div>
        <strong>Full name</strong>:
        <Field component={Input}
               name={"fullName"}
               placeholder={"Type your full name"}
        />
      </div>

      <div>
        <strong>About me</strong>:
        <Field component={Textarea}
               name={"aboutMe"}
               placeholder={"Tell about yourself..."}
        />
      </div>

      <div>
        <strong>Looking for a job</strong>:
        <Field component={Input}
               type={"checkbox"}
               name={"lookingForAJob"}
        />

        <div>
          <strong>My professional skills</strong>:
          <Field component={Textarea}
                 placeholder={"Type your professional skills"}
                 name={"lookingForAJobDescription"}
          />

          <div>
            <strong>Contacts</strong>: {
            Object.keys(props.profile.contacts).map(key => {
              return (
                <div key={key}>
                  <strong>{key}</strong>
                  <Field name={"contacts." + key}
                         component={Input}
                         placeholder={`Type valid ${key} URL`}
                  />
                </div>
              )

            })
          }
          </div>

          {props.error && <div className={styles.summaryLoginFormError}>
            {props.error}
          </div>}
        </div>

      </div>
    </form>
  )
}


export const ProfileDataReduxForm =
  reduxForm<UpdateProfilePayloadType, PropsType>({form: "editProfile"})(ProfileDataForm)