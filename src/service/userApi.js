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
        getAllSectors: builder.query({
            query: () => ({
                url: `/Sector/get-all-sectors`,
            })
        }),
        postCreateProduct: builder.mutation({
            query: (data) => ({
                url: `/Products/create`,
                method: 'POST',
                body: data
            })
        }),
        postCreateMarket: builder.mutation({
            query: (data) => ({
                url: `/Market/create-store`,
                method: 'POST',
                body: data
            })
        }),
        postCreateCategory: builder.mutation({
            query: (data) => ({
                url: `/Category/create`,
                method: 'POST',
                body: data
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: `/User/get-user`,
            })
        }),
        getAllCollectionsByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Collection/get-all-collections/${marketId}`,
            })
        }),
        getCollectionByMarketId: builder.query({
            query: ({id, marketId}) => ({
                url: `/Collection/get-collection-by-id/${id}/${marketId}`,
            })
        }),
        postCreateCollection: builder.mutation({
            query: (data) => ({
                url: `/Collection/create-collection-and-product-collection`,
                method: 'POST',
                body: data
            })
        }),
        getStoreByName: builder.query({
            query: (name) => ({
                url: `/Market/get-store-by-name/${name}`,
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
    useGetCategoryByMarketIdQuery,
    usePostCreateProductMutation,
    useGetAllSectorsQuery,
    usePostCreateMarketMutation,
    useGetUserQuery,
    usePostCreateCategoryMutation,
    useGetAllCollectionsByMarketIdQuery,
    useGetCollectionByMarketIdQuery,
    usePostCreateCollectionMutation,
    useGetStoreByNameQuery
} = ownerApi