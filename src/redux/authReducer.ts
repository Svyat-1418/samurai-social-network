import {authAPI, LoginPayloadType, ResultCode} from "../api/api";
import {AppThunk} from "./reduxStore";
import {FormAction, stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "AUTH/SET_AUTH_USER_DATA"

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: {
        userId: null | number
        email: null | string
        login: null | string
        isAuth: boolean
    }
}

export type AuthActionsType =
    SetAuthUserDataActionType |
    FormAction

const initialState = {
    userId: "" as string,
    email: null as null | string,
    login: null as null | string,
    isAuth: false
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_AUTH_USER_DATA":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData =
    (userId: number | null, email: null | string, login: null | string, isAuth: boolean): SetAuthUserDataActionType =>
        ({type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}} as const)

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.success) {
        const {id, email, login} = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (payload: LoginPayloadType): AppThunk => async (dispatch) => {
    const res = await authAPI.login(payload)
    if (res.data.resultCode === ResultCode.success) {
        dispatch(getAuthUserData())
    } else if (res.data.resultCode === ResultCode.error) {
        // add res error to "login" form
        dispatch(stopSubmit("login", {_error: res.data.messages[0]}))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}