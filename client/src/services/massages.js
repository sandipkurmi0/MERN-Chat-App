import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const massagesApi = createApi({
    reducerPath: 'massagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/"
    }),


    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: 'api/user',
                method: 'GET',
            })
        }),
    })
})


export const { useGetAllUsersQuery } = massagesApi
