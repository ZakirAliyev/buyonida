import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const ownerApi = createApi({
    reducerPath: 'ownerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://buyonida-001-site1.anytempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('buyonidaToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postRegisterOwner: builder.mutation({
            query: (data) => ({
                url: `/User/register`,
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        putUpdateOwner: builder.mutation({
            query: (data) => ({
                url: `/User/update-owner`,
                method: 'PUT',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postLoginOwner: builder.mutation({
            query: (data) => ({
                url: `/User/login`,
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postConfirmLoginOwner: builder.mutation({
            query: (data) => ({
                url: `/User/confirm-login`,
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postConfirmEmailOwner: builder.mutation({
            query: (data) => ({
                url: `/User/confirm-email`,
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postCreateNewConfirmEmailCodeOwner: builder.mutation({
            query: (data) => ({
                url: `/User/create-new-confirm-email-code?email=${data}`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        getAllStores: builder.query({
            query: () => ({
                url: `/Market/get-all-store`,
            })
        }),
        getStoreById: builder.query({
            query: (id) => ({
                url: `/Market/get-store-by-id/${id}`,
            })
        }),
        getAllProductsByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Products/all/${marketId}`,
            })
        }),
        getProductById: builder.query({
            query: ({marketId, id}) => ({
                url: `/Products/${marketId}/${id}`,
            })
        }),
        getAllCategoriesByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Category/all/${marketId}`,
            })
        }),
        getCategoryByMarketId: builder.query({
            query: ({marketId, id}) => ({
                url: `/Category/${marketId}/${id}`,
            })
        }),
    }),
})
export const {
    usePostRegisterOwnerMutation,
    usePutUpdateOwnerMutation,
    usePostLoginOwnerMutation,
    usePostConfirmLoginOwnerMutation,
    usePostConfirmEmailOwnerMutation,
    usePostCreateNewConfirmEmailCodeOwnerMutation,
    useGetAllStoresQuery,
    useGetStoreByIdQuery,
    useGetAllProductsByMarketIdQuery,
    useGetProductByIdQuery,
    useGetAllCategoriesByMarketIdQuery,
    useGetCategoryByMarketIdQuery
} = ownerApi