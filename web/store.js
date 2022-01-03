import { configureStore } from "@reduxjs/toolkit";
import locationSlicer from "./reducers/locationSlicer";

export const store = configureStore({
  reducer: {
    location: locationSlicer,
  },
});
