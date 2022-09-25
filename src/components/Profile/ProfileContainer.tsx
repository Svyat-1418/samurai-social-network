import React from "react";
import {Profile} from "./Profile";
import {
  getProfileStatus,
  getUserProfile,
  ProfileType, RequestStatusType,
  updateProfileStatus, updateUserProfile,
  uploadPhotoFile,
} from "../../redux/profileReducer";
import {AppRootStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {UpdateProfilePayloadType} from "../../api/api";

type MapStateToPropsType = {
  profile: ProfileType
  status: string
  authorizedUserId: string
  isAuth: boolean
  requestStatus: RequestStatusType
}
type MapDispatchToPropsType = {
  getUserProfile: (userId: number) => void
  getProfileStatus: (userId: number) => void
  updateProfileStatus: (status: string) => void
  uploadPhotoFile: (photoFile: File) => void
  updateUserProfile: (payload: UpdateProfilePayloadType) => void
}

type UrlParams = {
  userId: string
}

type PropsType = RouteComponentProps<UrlParams> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.PureComponent<PropsType> {
  updateProfileDataFlow = () => {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    this.props.getUserProfile(+userId)
    this.props.getProfileStatus(+userId)
  }

  componentDidMount() {
    this.updateProfileDataFlow()
  }

  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.updateProfileDataFlow()
    }
  }

  render() {
    return <Profile {...this.props}
                    status={this.props.status}
                    isOwner={!this.props.match.params.userId}
                    updateProfileStatus={this.props.updateProfileStatus}
                    uploadPhotoFile={this.props.uploadPhotoFile}
                    profile={this.props.profile}
                    updateUserProfile={this.props.updateUserProfile}
                    requestStatus={this.props.requestStatus}
    />
  }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  requestStatus: state.profilePage.requestStatus
})

export default compose<React.ComponentType>(
  withRouter,
  // withAuthRedirect,
  connect(mapStateToProps, {
    getProfileStatus,
    getUserProfile,
    updateUserProfile,
    updateProfileStatus,
    uploadPhotoFile
  })
)(ProfileContainer)