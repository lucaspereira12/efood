// src/services/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Restaurante } from '../Pages/Home'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood/'
  }),
  endpoints: (builder) => ({
    getRestaurantes: builder.query<Restaurante[], void>({
      query: () => 'restaurantes'
    }),
    getRestaurantePorId: builder.query<Restaurante | undefined, number>({
      queryFn: async (id, _api, _extraOptions, fetchWithBQ) => {
        const res = await fetchWithBQ('restaurantes')
        if (res.error) return { error: res.error }
        const data = res.data as Restaurante[]
        const restaurante = data.find((r) => r.id === id)
        return { data: restaurante }
      }
    })
  })
})

export const { useGetRestaurantesQuery, useGetRestaurantePorIdQuery } = apiSlice
