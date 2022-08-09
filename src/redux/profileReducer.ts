import {profileAPI, usersAPI} from "../api/api";
import {AppThunk} from "./reduxStore";

const ADD_POST = "PROFILE/ADD_POST"
const DELETE_POST = "PROFILE/DELETE_POST"
const SET_USER_PROFILE = "PROFILE/SET_USER_PROFILE"
const SET_PROFILE_STATUS = "PROFILE/SET_PROFILE_STATUS"
const UPDATE_PROFILE_STATUS = "PROFILE/UPDATE_PROFILE_STATUS"

export type AddPostActionType = {
    type: typeof ADD_POST
    postText: string
}
export type DeletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
export type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export type UpdateProfileStatusActionType = {
    type: typeof UPDATE_PROFILE_STATUS
    status: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
type ContactsType = {
    facebook: string | null
    website: string | null,
    vk: string | null,
    twitter: string | null
    instagram: string | null
    youtube: string | null,
    github: string | null
    mainLink: string | null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ProfileActionsType =
    AddPostActionType |
    DeletePostActionType |
    SetUserProfileActionType |
    SetProfileStatusActionType |
    UpdateProfileStatusActionType

const initialState = {
    posts: [
        {id: 1, message: "It is my first typescript project", likesCount: 12},
        {id: 2, message: "I like typescript", likesCount: 10},
        {id: 3, message: "I like ReactJS", likesCount: 10}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""

}
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/ADD_POST":
            return {
                ...state,
                posts: [{id: 11111, message: action.postText, likesCount: 0}, ...state.posts],
            }
        case "PROFILE/DELETE_POST":
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        case "PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "PROFILE/SET_PROFILE_STATUS":
            return {...state, status: action.status}
        case "PROFILE/UPDATE_PROFILE_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

export const addPostAC = (postText: string): AddPostActionType => ({type: ADD_POST, postText} as const)
export const deletePostAC = (id: number): DeletePostActionType => ({type: DELETE_POST, id} as const)
const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile} as const)
const setProfileStatusSuccess = (status: string): SetProfileStatusActionType =>
    ({type: SET_PROFILE_STATUS, status} as const)
const updateProfileStatusSuccess = (status: string): UpdateProfileStatusActionType =>
    ({type: UPDATE_PROFILE_STATUS, status} as const)

export const getUserProfile = (userId: number): AppThunk => async (dispatch) => {
    const res = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(res.data))
}
export const getProfileStatus = (userId: number): AppThunk => async (dispatch) => {
    const res = await profileAPI.getProfileStatus(userId)
    dispatch(setProfileStatusSuccess(res.data))
}
export const updateProfileStatus = (status: string): AppThunk => async (dispatch) => {
    const res = await profileAPI.updateProfileStatus(status)
    dispatch(updateProfileStatusSuccess(status))
}