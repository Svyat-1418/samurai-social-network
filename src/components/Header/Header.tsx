import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export const Header = (props: PropsType) => {
    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src="https://yt3.ggpht.com/ytc/AAUvwngdw4sXdA6kUYDDZZi5df9azFXxNwyV7FBbNcGHSw=s900-c-k-c0x00ffffff-no-rj"
                 alt="logo"/>

            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div>
                        {props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}