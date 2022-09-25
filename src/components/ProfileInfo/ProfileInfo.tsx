import styles from "./ProfileInfo.module.css"
import React, {ChangeEvent, useRef, useState} from "react";
import {Preloader} from "../common/Preloader/Preloader";
import {ProfileType, RequestStatusType} from "../../redux/profileReducer";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

import anonymousAva from "./../../assets/images/user-photo.png"
import {UpdateProfilePayloadType} from "../../api/api";
import {ProfileData} from "./ProfileData";
import {ProfileDataForm, ProfileDataReduxForm} from "./ProfileDataForm";

type PropsType = {
  isOwner: boolean
  profile: ProfileType
  status: string
  updateProfileStatus: (status: string) => void
  uploadPhotoFile: (photoFile: File) => void
  updateUserProfile: (payload: UpdateProfilePayloadType) => void
  requestStatus: RequestStatusType
}

export const ProfileInfo = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [editMode, setEditMode] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files!.length) {
      props.uploadPhotoFile(event.target.files![0])
    }
  }

  const handleClickUploadPhoto = () => {
    inputRef.current?.click()
  }

  if (!props.profile) {
    return <Preloader/>
  }

  const onSubmit = (formData: UpdateProfilePayloadType) => {
    console.log(formData)
    props.updateUserProfile(formData)
    if (props.requestStatus === "success") {
      setEditMode(false)
    }
  }

  return (
    <div>
      <div className={styles.description}>
        <img
          src={props.profile.photos && props.profile.photos.large || anonymousAva}
          style={{width: "150px", height: "150px", borderRadius: "50%"}}
          alt=""
        />

        {props.isOwner &&
            <label htmlFor={"uploadPhoto"}>
                <input
                    type={"file"}
                    id={"uploadPhoto"}
                    accept={"*/image/*"}
                    ref={inputRef}
                    style={{display: "none"}}
                    onChange={handleChange}
                />
                <button onClick={handleClickUploadPhoto}>Upload photo</button>
            </label>
        }

        {editMode
          ? <ProfileDataReduxForm
            onSubmit={onSubmit}
            initialValues={props.profile}
            profile={props.profile}
          />
          : <ProfileData
            isOwner={props.isOwner}
            setEditMode={setEditMode}
            profile={props.profile}
          />}

        <ProfileStatus status={props.status}
                       updateProfileStatus={props.updateProfileStatus}
        />
      </div>
    </div>
  )
}

