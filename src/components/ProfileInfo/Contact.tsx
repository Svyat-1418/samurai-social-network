import React from "react";

type ContactPropsType = {
    contactName: string
    contactValue: string
}
export const Contact = (props: ContactPropsType) => {
    return (
        <div>
            <div>
                <strong>
                    {props.contactName}</strong>:
                <span>
                {
                    props.contactValue
                        ? props.contactValue
                        : " Not specified"}
                    </span>
            </div>
        </div>
    )
}