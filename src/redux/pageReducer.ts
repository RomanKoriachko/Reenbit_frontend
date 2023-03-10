import {createSlice} from "@reduxjs/toolkit"

const initialState: number = 1

export const pageReducer = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        nextPage: (state) => {
            return (state + 1)
        },
        prevPage: (state) => {
            return (state - 1)
        },
        goToPage: (state, action) => {
            return action.payload
        }
    },
})

export const {nextPage, prevPage, goToPage} = pageReducer.actions

export default pageReducer.reducer