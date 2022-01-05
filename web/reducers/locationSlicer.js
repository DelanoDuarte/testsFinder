import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
  address: {},
  draggable: false,
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
    setMarkerAsDraggable: (state) => {
      state.draggable = true;
    },
    setMarkerAsFixed: (state) => {
      state.draggable = false;
    },
  },
});

export const {
  setCurrentLocation,
  setCurrentAddress,
  setMarkerAsDraggable,
  setMarkerAsFixed,
} = locationSlice.actions;
export default locationSlice.reducer;
