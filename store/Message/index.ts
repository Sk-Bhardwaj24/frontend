// store/messageSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface MessageOptions {
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  autoHideDuration: number;
  message: string;
  variant?: string | null;
}

interface MessageState {
  state: boolean;
  options: MessageOptions;
}

const initialState: MessageState = {
  state: false,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 2000,
    message: "Hi",
    variant: null,
  },
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage(state, action) {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideMessage(state) {
      state.state = false;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;

export const selectFuseMessageState = (state: RootState) => state.message.state;

export const selectFuseMessageOptions = (state: RootState) =>
  state.message.options;

export default messageSlice.reducer;
