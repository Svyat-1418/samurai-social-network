import React from "react";
import styles from "./Profile.module.css";
import {ProfileInfo} from "../ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateProfileStatus: (status: string) => void
    uploadPhotoFile: (photoFile: File) => void
}

export const Profile = (props: PropsType) => {
    return (
        <div className={styles.profilePage}>
            <ProfileInfo status={props.status}
                         isOwner={props.isOwner}
                         updateProfileStatus={props.updateProfileStatus}
                         uploadPhotoFile={props.uploadPhotoFile}
                         profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}

