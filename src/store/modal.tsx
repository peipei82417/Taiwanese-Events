import { createSlice } from "@reduxjs/toolkit";
import SigninList from "components/ui/signin-form/SigninList";

interface ModalState {
    isShow: boolean;
    title: string;
    content: JSX.Element | null;
}

const initialModalState: ModalState = {
    isShow: false,
    title: "",
    content: <div />,
};

const modalSlice = createSlice({
    name: "modalType",
    initialState: initialModalState,
    reducers: {
        signin(state, action: { payload: { providers: any } }) {
            state.title = "Welcome";
            state.content = <SigninList providers={action.payload.providers} />;
            state.isShow = true;
        },
        needsignin(state, action: { payload: { providers: any } }) {
            state.title = "請先登入帳號";
            state.content = <SigninList providers={action.payload.providers} />;
            state.isShow = true;
        },
        cancel(state) {
            state.title = "";
            state.content = <div />;
            state.isShow = false;
        },
    },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
