import React, {lazy, Suspense} from 'react';

import styles from './App.module.css';

import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";

import {AppRootStateType} from "../../redux/reduxStore";
import {initializeApp} from "../../redux/appReducer";
import {withSuspense} from '../../hoc/withSuspense';

import HeaderContainer from '../Header/HeaderContainer';
import {NavbarContainer} from "../Navbar/NavbarContainer";
import {News} from "../News/News";
import {Music} from "../Music/Music";
import {Settings} from "../Settings/Settings";
import {Preloader} from "../common/Preloader/Preloader";

// lazy imports wrapped Suspense
const DialogsContainer = withSuspense(lazy(() => import('../Dialogs/DialogsContainer')))
const UsersContainer = withSuspense(lazy(() => import('../Users/UsersContainer')))
const Login = withSuspense(lazy(() => import('../Login/Login')))
const ProfileContainer = withSuspense(lazy(() => import('../Profile/ProfileContainer')))

type MapStateToPropsType = {
  initialized: boolean
}
export type MapDispatchToPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
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
          <Preloader/>
        </div>
      )
    }

    return (
      <div className={styles.appWrapper}>
        <HeaderContainer/>
        <NavbarContainer/>
        <div className={styles.appContentWrapper}>
          <Switch>

            <Route path={"/"}
                   render={() => <ProfileContainer/>} />
            <Route path='/dialogs'
                   render={() => <DialogsContainer/>}/>
            <Route path='/profile/:userId?'
                   render={() => <ProfileContainer/>}/>
            <Route path='/users'
                   render={() => <UsersContainer/>}/>
            <Route path='/login' render={() => <Login/>}/>

            <Route path={"/news"} component={News}/>
            <Route path={"/music"}
                     component={Music}/>
            <Route path={"/settings"}
                     component={Settings}/>
            <Route path={"*"}
                   render={() => <div style={{
                     height: "100vh",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                   }}>
                     <h1>Page Not Found :-(</h1>
                   </div>} />
          </Switch>
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