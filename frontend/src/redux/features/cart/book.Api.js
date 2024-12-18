import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer $(token)`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBook: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Books", id }],
        }),
    })
});


export const { useFetchAllBookQuery } = booksApi;
export default booksApi;