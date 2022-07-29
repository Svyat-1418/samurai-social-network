//import React from "react";
import {addPostAC, InitialStateType,} from "../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AllAppActionsType, AppRootStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    profilePage: InitialStateType
}
type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch<AllAppActionsType>): MapDispatchToPropsType => {
    return {
        addPost: (postText: string) => {
            dispatch(addPostAC(postText))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)