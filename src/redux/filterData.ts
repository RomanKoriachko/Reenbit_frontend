import {createSlice} from "@reduxjs/toolkit"

const initialState: string = ""

export const filterData = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        changeSearchInput: (state, action) => {
            return action.payload
        }
    },
})

export const {changeSearchInput} = filterData.actions

export default filterData.reducer