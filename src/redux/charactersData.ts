import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type CharacterData = {
    info: {
        count: number,
        next: null | string,
        pages: number,
        prev: null | string
    },
    results: CharactersArr[]
}
type CharactersArr = {
    id: number,
    image: string,
    name: string,
    gender: string,
    status: string,
    species: string,
    origin: {
        name: string,
    },
    type: string
}

export const fetchCharacters = createAsyncThunk(
    'charactersData/fetchCharacters',
    async function(link: string){
        const response = await fetch(link)
        const data = await response.json();
        return data
    }
)

const initialState: CharacterData[] = []

export const charactersData = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
        clearCharacterDataState: (state)=> {
            return []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCharacters.fulfilled, (state, action) => {
            state.push(action.payload)
        })
    }
})

export const {clearCharacterDataState} = charactersData.actions

export default charactersData.reducer