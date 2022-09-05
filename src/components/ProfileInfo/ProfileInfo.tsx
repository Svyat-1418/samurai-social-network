import styles from "./ProfileInfo.module.css"
import React, {ChangeEvent, useRef, useState} from "react";
import {Preloader} from "../common/Preloader/Preloader";
import {ProfileType} from "../../redux/profileReducer";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

import anonymousAva from "./../../assets/images/user-photo.png"

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateProfileStatus: (status: string) => void
    uploadPhotoFile: (photoFile: File) => void
}

export const ProfileInfo = (props: PropsType) => {
     const inputRef = useRef<HTMLInputElement>(null)

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

                <ProfileStatus status={props.status}
                               updateProfileStatus={props.updateProfileStatus}
                />
            </div>
        </div>
    )
}

