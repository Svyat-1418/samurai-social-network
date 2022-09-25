import {ContactsType, ProfileType} from "../../redux/profileReducer";
import React from "react";
import {Contact} from "./Contact";

type ProfileDataPropsType = {
    isOwner: boolean
    setEditMode: (editMode: boolean) => void
    profile: ProfileType
}
export const ProfileData = (props: ProfileDataPropsType) => {
    const handleClickEdit = () => {
        props.setEditMode(true)
    }

    return (
        <div>

            <div>
                {props.isOwner && <button onClick={handleClickEdit}>Edit</button>}
            </div>

            <div>
                <strong>Full name</strong>: {props.profile.fullName}
            </div>

          <div>
            <strong>About me</strong>: {props.profile.aboutMe}
          </div>

            <div>
                <strong>Looking for a job</strong>: {props.profile.lookingForAJob ? "Yes" : "No"}
            </div>
            <div>
                <strong>My professional skills</strong>:
                <div>
                    {props.profile.lookingForAJobDescription}
                </div>

                <div>
                    <strong>Contacts</strong>: {
                    Object.keys(props.profile.contacts).map(key => <Contact
                        key={key}
                        contactName={key}
                        contactValue={props.profile.contacts[key as keyof ContactsType]}
                    />)}
                </div>
            </div>
        </div>
    )
}

