import {createSlice} from "@reduxjs/toolkit"

const raw = localStorage.getItem('arrOfPages')
let localArrOfPages = [1,2,3,4,5,6,7,8,9,10]
if (raw) {
    localArrOfPages = JSON.parse(raw)
}

const initialState: number[] = localArrOfPages

export const arrOfPagesReducer = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        setArrOfPages: (state, action) => {
            return action.payload
        }
    },
})

export const {setArrOfPages} = arrOfPagesReducer.actions

export default arrOfPagesReducer.reducer