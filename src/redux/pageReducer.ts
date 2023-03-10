import {createSlice} from "@reduxjs/toolkit"

const initialState: number = 1

export const pageReducer = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        nextPage: (state) => {
            state += 1
            localStorage.setItem('page', JSON.stringify(state))
            return (state)
        },
        prevPage: (state) => {
            state -= 1
            localStorage.setItem('page', JSON.stringify(state))
            return (state)
        },
        goToPage: (state, action) => {
            localStorage.setItem('page', JSON.stringify(action.payload))
            return action.payload
        }
    },
})

export const {nextPage, prevPage, goToPage} = pageReducer.actions

export default pageReducer.reducer