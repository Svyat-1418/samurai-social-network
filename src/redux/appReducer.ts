import {AppThunk} from "./reduxStore";
import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';


type InitializeSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
    initialized: boolean
}

export type AppActionsType =
    InitializeSuccessActionType

const initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState

export const appReducer =
    (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

export const initializeSuccessAC =
    (initialized: boolean): InitializeSuccessActionType =>
        ({type: INITIALIZED_SUCCESS, initialized} as const)

export const initializeApp = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    // const promise2 = dispatch(some_action)
    // const promise3 = dispatch(some_action)
        Promise.all([promise])
        .then(() => {
            dispatch(initializeSuccessAC(true))
        })
}
