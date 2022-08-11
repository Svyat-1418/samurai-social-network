import styles from "./ProfileInfo.module.css"
import React from "react";
import {Preloader} from "../common/Preloader/Preloader";
import {ProfileType} from "../../redux/profileReducer";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateProfileStatus: (status: string) => void
}

export const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<img className={styles.avatar}
                 src="https://cdnimg.rg.ru/img/content/140/51/49/kinopoisk.ru-Wiedzmin-977505_d_850.jpg"
                 alt="icon"/>*/}
            <div className={styles.description}>
                <img src={props.profile.photos.large} alt=""/>
                <ProfileStatus status={props.status}
                               updateProfileStatus={props.updateProfileStatus}
                />
            </div>
        </div>
    )
}

