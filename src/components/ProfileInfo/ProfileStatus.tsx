import React, {ChangeEvent, useState} from "react";

type PropsType = {
    status: string
    updateProfileStatus: (status: string) => void
}

export const ProfileStatus = ({status, updateProfileStatus}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateProfileStatus(localStatus)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return editMode
        ? <input value={localStatus}
                 onBlur={deactivateEditMode} autoFocus
                 onChange={onChangeStatus}
        />
        : <span onDoubleClick={activateEditMode}>
                {status}
            </span>

}






//=====================================

// state: StateType = {
//     editMode: false,
//     status: this.props.status
// }
//
// activateEditMode = () => {
//     this.setState({
//         editMode: true
//     })
// }
// deactivateEditMode = () => {
//     this.setState({
//         editMode: false,
//     })
//     this.props.updateProfileStatus(this.state.status)
// }
// onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//         status: e.currentTarget.value
//     })
// }
//
// // componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
// //     if (prevProps.status !== this.props.status) {
// //         this.setState({status: this.props.status})
// //     }
// // }
//
// componentDidUpdate(prevProps: PropsType, prevState: StateType) {
//     if (prevProps.status !== this.props.status) {
//         this.setState({status: this.props.status})
//     }
// }