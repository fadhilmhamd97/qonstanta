import { createSlice } from "@reduxjs/toolkit";

const initialRegistrationState = {
    email: '',
    schedule: '',
    packet: '',
    packetDescription: '',
    schoolLocation: '',
    provinceLocation: '',
    cityLocation: ''
}
export const callTypes = {
    list: "list",
    action: "action",
    packetChoice: "packetChoice"
}

export const registrationSlice = createSlice({
    name:"registration",
    initialState: initialRegistrationState,
    reducers: {
        populatePacketChoice: (state, action) => {
            const {name, code} = action.payload;
            state.packetDescription = name;
            state.packet = code;
        }
    }
})