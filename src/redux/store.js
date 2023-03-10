import {configureStore} from "@reduxjs/toolkit"
import {coordinateSlice} from "./coordinate-slice";
import {pointSlice} from "./point-slice";

export default configureStore({
    reducer: {
        coordinateState: coordinateSlice.reducer,
        pointsState: pointSlice.reducer
    }
});