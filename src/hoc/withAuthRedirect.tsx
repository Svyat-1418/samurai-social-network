import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/reduxStore";

type MapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        const {isAuth, ...restProps} = props

        if (!isAuth) {
            return <Navigate to={'/login'} />
        }
        return <Component {...restProps as T} />
    }

    return connect(mapStateToProps)(RedirectComponent)
}



