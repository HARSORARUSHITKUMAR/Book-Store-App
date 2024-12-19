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
        // get all book data
        fetchAllBook: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        // get single book data
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Books", id }],
        }),
        // add a new book data
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        // update a book data
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        // delete a book 
        deleteBook: builder.mutation({
            query: (id) => ({
                query: (id) => ({
                    url: `/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["Books"]
            })
        })
    })
});


export const
    { useFetchAllBookQuery, useFetchBookByIdQuery,
        useAddBookMutation, useUpdateBookMutation,
        useDeleteBookMutation
    } = booksApi;
export default booksApi;