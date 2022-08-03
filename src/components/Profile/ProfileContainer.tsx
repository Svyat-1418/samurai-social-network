import React from "react";
import {Profile} from "./Profile";
import {getProfileStatus, getUserProfile, ProfileType, updateProfileStatus} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: string
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
}

type UrlParams = {
    userId: string
}

type PropsType = RouteComponentProps<UrlParams>&MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(+userId)
        this.props.getProfileStatus(+userId)
    }

    render() {
        return <Profile {...this.props}
                        status={this.props.status}
                        updateProfileStatus={this.props.updateProfileStatus}
                        profile={this.props.profile}
        />
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    withRouter,
    // withAuthRedirect,
    connect(mapStateToProps, {getProfileStatus, getUserProfile, updateProfileStatus})
)(ProfileContainer)