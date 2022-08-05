import {usersAPI} from "../api/api";
import {AppThunk} from "./reduxStore";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_CURRENT_PORTION = 'SET_CURRENT_PORTION';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id: number
    name: string
    status?: string
    photos: PhotosType
    followed: boolean
}
const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 4,
    currentPage: 1,
    currentPortion: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}
export type InitialStateType = typeof initialState

export type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetCurrentPortionActionType = {
    type: typeof SET_CURRENT_PORTION
    currentPortion: number
}
export type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export type UsersActionsType =
    FollowActionType |
    UnfollowActionType |
    SetUsersActionType |
    SetTotalUsersCountActionType |
    SetCurrentPageActionType |
    SetCurrentPortionActionType |
    ToggleIsFetchingActionType |
    ToggleIsFollowingProgressActionType

export const usersReducer = (state: InitialStateType = initialState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ?
                    {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ?
                    {...u, followed: false} : u)
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_CURRENT_PORTION:
            return {...state, currentPortion: action.currentPortion}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId: number): FollowActionType =>
    ({type: FOLLOW, userId} as const)
export const unfollowSuccess = (userId: number): UnfollowActionType =>
    ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>): SetUsersActionType =>
    ({type: SET_USERS, users} as const)
export const setTotalCount = (totalCount: number): SetTotalUsersCountActionType =>
    ({type: SET_TOTAL_USERS_COUNT, totalCount} as const)
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType =>
    ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setCurrentPortion = (currentPortion: number): SetCurrentPortionActionType =>
    ({type: SET_CURRENT_PORTION, currentPortion} as const)
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType =>
    ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)

export const fetchUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then((data) => {
            dispatch(setUsers(data.items))
            dispatch(setTotalCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
}
export const follow = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    usersAPI.follow(userId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
}
export const unfollow = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    usersAPI.unfollow(userId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
}

