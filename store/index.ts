import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/index";
import messageReducer from "./Message/index";
const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
