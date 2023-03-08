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
    async function(){
        const response = await fetch(`https://rickandmortyapi.com/api/character`)
        const data = await response.json();
        return data
    }
)

const initialState: CharacterData[] = []

export const charactersData = createSlice({
    name:"charactersData",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCharacters.fulfilled, (state, action) => {
            state.push(action.payload)
        })
    }
})

export const {} = charactersData.actions

export default charactersData.reducer