import { createSlice } from '@reduxjs/toolkit'

interface ITest {
    text: string
}

const initialState: ITest = {
    text: "hello redux"
}

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setText: (state, text) => {
            state.text = text.payload
        }
    }
})

export default testSlice.reducer