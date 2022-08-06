import {AppRootStateType} from "./reduxStore";
import {createSelector} from "reselect";

export const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, users =>
    users.filter(user => true)
)
// createSelector() from 'reselect' library allows us to avoid
// unnecessary renderings thanks to caching selectors

export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}
export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getCurrentPortion = (state: AppRootStateType) => {
    return state.usersPage.currentPortion
}