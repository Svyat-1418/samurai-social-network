import React from "react";
import s from "./Link.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    path: string
    linkLabel: string
}

const Link = (props: PropsType) => {
    return (
        <div className={s.link}>
            <NavLink to={props.path} className={({ isActive}) => isActive ? s.active : '' }>{props.linkLabel}</NavLink>
        </div>
    )
}
export default Link;