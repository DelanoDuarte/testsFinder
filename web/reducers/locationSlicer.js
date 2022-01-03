import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
  address: {},
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.current = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setCurrentLocation, setCurrentAddress } = locationSlice.actions;
export default locationSlice.reducer;
