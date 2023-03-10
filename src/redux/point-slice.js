import { createSlice } from '@reduxjs/toolkit'

export const pointSlice = createSlice({
    name: "pointsState",
    initialState: {
        points: []
    },
    reducers: {
        setPoints: (state, action) => {
            state.points = action.payload;
        },
        addPoint: (state, action) => {
            state.points.push(action.payload);
        }
    }
})

export const {setPoints, addPoint} = pointSlice.actions;
export const getPoints = state => state.pointsState.points;

export default pointSlice.reducer;