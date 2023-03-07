import { configureStore } from "@reduxjs/toolkit";
import charactersData from "./charactersData";
import filterData from "./filterData";


export const store = configureStore({
    reducer: {
        characterDataStore: charactersData,
        filterDataState: filterData,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
