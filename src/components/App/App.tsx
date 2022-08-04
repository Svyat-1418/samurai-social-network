import React from 'react';
import styles from './App.module.css';
import {Route, withRouter} from "react-router-dom";
import {DialogsContainer} from "../Dialogs/DialogsContainer";
import {UsersContainer} from "../Users/UsersContainer";

import {NavbarContainer} from "../Navbar/NavbarContainer";
import ProfileContainer from "../Profile/ProfileContainer";
import HeaderContainer from '../Header/HeaderContainer';
import Login from '../Login/Login';
import {News} from "../News/News";
import {Music} from "../Music/Music";
import {Settings} from "../Settings/Settings";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/reduxStore";
import {initializeApp} from "../../redux/appReducer";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = {
    initialized: boolean
}
export type MapDispatchToPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType>{
    componentDidMount() {
        this.props.initializeApp()
    }

    preloaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div style={this.preloaderStyle}>
                    <Preloader />
                </div>
            )
        }

        return (
            <div className={styles.appWrapper}>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className={styles.appContentWrapper}>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                    <Route path={"/news"} component={News}/>
                    <Route path={"/music"} component={Music}/>
                    <Route path={"/settings"} component={Settings}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType =>
    ({initialized: state.app.initialized})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)