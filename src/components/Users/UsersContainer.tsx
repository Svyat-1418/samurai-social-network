import React from 'react';
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/reduxStore";
import {
    follow,
    unfollow,
    InitialStateType,
    setCurrentPortion,
    fetchUsers, UserType
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getCurrentPortion, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";

export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalCount: number
    currentPortion: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPortion: (currentPortion: number) => void
    fetchUsers: (currentPage: number, pageSize: number) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        totalCount: getTotalUsersCount(state),
        currentPortion: getCurrentPortion(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

class UsersAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.fetchUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page: number) => {
        this.props.fetchUsers(page, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       onPageChanged={this.onPageChanged}
                       setCurrentPortion={this.props.setCurrentPortion}
                       currentPortion={this.props.currentPortion}
                       pageSize={this.props.pageSize}
                       totalCount={this.props.totalCount}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

export const UsersContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, fetchUsers, setCurrentPortion
    }))(UsersAPIComponent)