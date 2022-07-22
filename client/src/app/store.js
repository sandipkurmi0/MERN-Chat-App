import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { massagesApi } from '../services/massages'

export const store = configureStore({
    reducer: {
        [massagesApi.reducerPath]: massagesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(massagesApi.middleware),
})

setupListeners(store.dispatch)