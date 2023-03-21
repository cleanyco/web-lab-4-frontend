import {createStore} from "@reduxjs/toolkit";

const initialState = {
    r: []
}

const SAVE_RADIUS = 'SAVE_RADIUS';

export const saveRadius = (r) => ({
    type: SAVE_RADIUS,
    payload: r
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_RADIUS: return {
         ...state, r: action.payload
        }

        default: return state;
    }
}

const store = createStore(reducer);

export default store;