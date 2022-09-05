import {addPostAC, deletePostAC, InitialStateType, PostType, profileReducer, ProfileType} from "./profileReducer";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        posts: [
            {id: 1, message: "It is my first typescript project", likesCount: 12},
            {id: 2, message: "I like typescript", likesCount: 10},
            {id: 3, message: "I like ReactJS", likesCount: 10}
        ] as Array<PostType>,
        profile: {
            photos: {
                small: '',
                large: ''
            },
            aboutMe: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            },
            fullName: '',
            userId: 0,
            lookingForAJob: false,
            lookingForAJobDescription: ''
        },
        status: ""

    }
})

test("correct post should be added", () => {
    const endState = profileReducer(initialState, addPostAC("IT-INCUBATOR"))

    expect(endState.posts[0].message).toBe("IT-INCUBATOR")
})
test("correct post should be deleted", () => {
    const endState = profileReducer(initialState, deletePostAC(1))

    expect(endState.posts.every(post => post.id !== 1)).toBeTruthy()
})