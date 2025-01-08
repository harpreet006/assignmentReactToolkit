import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Reducers
import AuthReducer from "./reducers/AuthReducer";
import LayoutReducer from "./reducers/LayoutReducer";

//services
import { AuthApi } from "./services/AuthService";
import { TaskApi } from "./services/TaskService";

import { createAction } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

export const logout = createAction("auth/logout");

const appReducer = combineReducers({
  auth: AuthReducer,
  layout: LayoutReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [TaskApi.reducerPath]: TaskApi.reducer,
});

const handleLogout = () => {
  store.dispatch(logout());
  store.dispatch(AuthApi.util.resetApiState());
};

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
    handleLogout();
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(AuthApi.middleware)
      .concat(TaskApi.middleware),
});

setupListeners(store.dispatch);

export default store;
