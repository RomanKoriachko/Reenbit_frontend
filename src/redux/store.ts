import { configureStore } from "@reduxjs/toolkit";
import charactersData from "./charactersData";
import filterData from "./filterData";
import pageReducer from "./pageReducer";


export const store = configureStore({
    reducer: {
        characterDataStore: charactersData,
        filterDataState: filterData,
        pageState: pageReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
