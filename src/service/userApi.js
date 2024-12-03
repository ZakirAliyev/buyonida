import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://residbabazada-001-site1.jtempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postRegisterViaEmail: builder.mutation({
            query: (newUser) => ({
                url: `/UserAccount/register`,
                method: 'POST',
                body: newUser,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postLogin: builder.mutation({
            query: (newUser) => ({
                url: `/UserAccount/login`,
                method: 'POST',
                body: newUser,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
    }),
})
export const {
    usePostLoginMutation,
    usePostRegisterViaEmailMutation,
} = userApi