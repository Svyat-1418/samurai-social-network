import axios from "axios";
import {UserType} from "../redux/usersReducer";
import {ContactsType} from "../redux/profileReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': '8b2c8540-f6dc-42fb-9c8f-b949feae7300'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => {
                return res.data
            })
    },
    follow(userId: number) {
        return instance.post<{ resultCode: number }>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<{ resultCode: number }>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn(`Obsolete method. Please use "profileAPI.getProfile" `)
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    updateProfile(payload: UpdateProfilePayloadType) {
        return instance.put<UpdateProfileResponseType>(`profile`, payload)
    },
    getProfileStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateProfileStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    uploadPhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        return instance.put("/profile/photo", formData, config)
    }
}

export const authAPI = {
    me() {
        return instance.get<{ data: AuthMeResponseType, resultCode: number }>(`auth/me`)
    },
    login(payload: LoginPayloadType) {
        return instance.post(`auth/login`, payload)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type AuthMeResponseType = {
    id: number
    email: string
    login: string
}
export type UpdateProfilePayloadType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
}
type UpdateProfileResponseType = {
    data: {},
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: ResultCode
}
type GetUsersResponseType = {
    error: string | null
    totalCount: number
    items: Array<UserType>
}

export enum ResultCode {
    success = 0,
    error = 1,
    captcha = 10
}