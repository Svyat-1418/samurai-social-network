import { create } from "react-test-renderer"
import {ProfileStatus} from "./ProfileStatus";

describe("ProfilStatus Component", () => {
    test("status from props should be in the state", () => {
        const component = create(
            <ProfileStatus status={"IT-INCUBATOR"} updateProfileStatus={status => {}} />)
        const instance = component.getInstance()
        // expect(instance?.state.status).toBe("IT-INCUBATOR")
    })
})