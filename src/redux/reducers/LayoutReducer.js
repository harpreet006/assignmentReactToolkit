import { createSlice } from "@reduxjs/toolkit";

export const LayoutSlice = createSlice({
  name: "layout",
  initialState: {
    isSidebarCollapsed: false,
    navbarFilter: "",
  },
  reducers: {
    setSidebarState: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },

    setNavbarFilter: (state, action) => {
      state.navbarFilter = action.payload;
    },
  },
});

//Actions
export const { setSidebarState, setNavbarFilter } = LayoutSlice.actions;

export default LayoutSlice.reducer;
