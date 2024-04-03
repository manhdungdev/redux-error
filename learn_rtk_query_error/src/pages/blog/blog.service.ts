import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.types'
export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: 'Posts' as const,
              id
            })),
            { type: 'Posts', id: 'LIST' }
          ]
        }
        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query: (data) => ({
        url: `posts/${data.id}`,
        method: 'PUT',
        body: data.body
      }),

      invalidatesTags: (result, err, arg) => [{ type: 'Posts', id: arg.id }]
    }),
    deletePost: builder.mutation<{}, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, err, id) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
