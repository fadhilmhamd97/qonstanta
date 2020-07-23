import { registrationSlice, callTypes } from "./registrationSlice";

const {actions} = registrationSlice

export const subscribeRegistration = payload => dispatch => {
    dispatch(actions.populatePacketChoice(payload))
}