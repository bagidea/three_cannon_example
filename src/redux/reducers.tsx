import { combineReducers } from "@reduxjs/toolkit";

import testSlice from './slices/test'

const rootReducer = combineReducers({
    testSlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer