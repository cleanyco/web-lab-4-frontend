import {createSlice} from "@reduxjs/toolkit";

export const coordinateSlice = createSlice({
    name: "coordinateState",
    initialState: {
        point: {
            x: [], //массив
            y: null,
            r: [] //массив
        }
    },

    reducers: {
        setX: (state, action) => {
            state.point.x.push(action.payload);
        },
        setY: (state, action) => {
            state.point.y = action.payload;
        },
        setR: (state, action) => {
            state.point.r.push(action.payload);
        },
        unsetX: (state, action) => {

        }
    }
})

// export const {setX, setY, setR} = coordinateSlice.actions;
//в r будет передаваться массив отмеченных радиусов
//в x будет передаваться массив отмеченных иксов
export const getX = state => state.coordinateState.point.x;
export const getY = state => state.coordinateState.point.y;
export const getR = state => state.coordinateState.point.r;

export default coordinateSlice.reducer