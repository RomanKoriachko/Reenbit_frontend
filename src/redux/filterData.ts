import {createSlice} from "@reduxjs/toolkit"

const initialState: string = ""

export const filterData = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        changeSearchInput: (state, action) => {
            localStorage.setItem('searchinput', action.payload)
            return action.payload
        }
    },
})

export const {changeSearchInput} = filterData.actions

export default filterData.reducer