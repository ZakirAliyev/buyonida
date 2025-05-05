import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://epoint.az/api/1/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('buyonidaToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postRegisterCard: builder.mutation({
            query: (data) => ({
                url: `/card-registration`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
    }),
});

export const {
    usePostRegisterCardMutation,
} = paymentApi;