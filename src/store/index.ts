// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Item{
  id:number
  name:string
  price:number
  imgUrl:string
}

// Define a service using a base URL and expected endpoints
export const getItemInfoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dczjmxgqwf.execute-api.ap-southeast-2.amazonaws.com' }),
  endpoints: (builder) => ({
    getItem: builder.query<Item[], void>({
      query: () => `/Dev`
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetItemQuery } = getItemInfoApi