import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const ownerApi = createApi({
    reducerPath: 'ownerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://buyonida-bnf5dbgxhegwd8ay.canadacentral-01.azurewebsites.net/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('buyonidaToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Store', 'Products', 'Categories', 'Collections', 'Basket', 'Orders', 'Analytics', 'StoreWithSections', 'Palettes'], // Define tag types
    endpoints: (builder) => ({
        postRegisterOwner: builder.mutation({
            query: (data) => ({
                url: `/User/register`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        putUpdateOwner: builder.mutation({
            query: (data) => ({
                url: `/User/update-owner`,
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        postLoginOwner: builder.mutation({
            query: (data) => ({
                url: `/User/login`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        postConfirmLoginOwner: builder.mutation({
            query: (data) => ({
                url: `/User/confirm-login`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        postConfirmEmailOwner: builder.mutation({
            query: (data) => ({
                url: `/User/confirm-email`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        postCreateNewConfirmEmailCodeOwner: builder.mutation({
            query: (data) => ({
                url: `/User/create-new-confirm-email-code?email=${data}`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        getAllStores: builder.query({
            query: () => ({
                url: `/Market/get-all-store`,
            }),
            providesTags: ['Store'], // Tag for store data
        }),
        getStoreById: builder.query({
            query: (id) => ({
                url: `/Market/get-store-by-id/${id}`,
            }),
            providesTags: ['Store'], // Tag for store data
        }),
        getAllProductsByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Products/all/${marketId}`,
            }),
            providesTags: ['Products'], // Tag for product data
        }),
        getProductById: builder.query({
            query: ({ marketId, id }) => ({
                url: `/Products/${marketId}/${id}`,
            }),
            providesTags: ['Products'], // Tag for product data
        }),
        getAllCategoriesByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Category/all/${marketId}`,
            }),
            providesTags: ['Categories'], // Tag for category data
        }),
        getCategoryByMarketId: builder.query({
            query: ({ marketId, id }) => ({
                url: `/Category/${marketId}/${id}`,
            }),
            providesTags: ['Categories'], // Tag for category data
        }),
        getAllSectors: builder.query({
            query: () => ({
                url: `/Sector/get-all-sectors`,
            }),
        }),
        postCreateProduct: builder.mutation({
            query: (data) => ({
                url: `/Products/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'], // Invalidate product data after creating a product
        }),
        postEditProduct: builder.mutation({
            query: (data) => ({
                url: `/Products/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'], // Invalidate product data after editing a product
        }),
        postCreateMarket: builder.mutation({
            query: (data) => ({
                url: `/Market/create-store`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Store'], // Invalidate store data after creating a market
        }),
        postCreateCategory: builder.mutation({
            query: (data) => ({
                url: `/Category/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Categories'], // Invalidate category data after creating a category
        }),
        getUser: builder.query({
            query: () => ({
                url: `/User/get-user`,
            }),
        }),
        getAllCollectionsByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Collection/get-all-collections/${marketId}`,
            }),
            providesTags: ['Collections'], // Tag for collection data
        }),
        getCollectionByMarketId: builder.query({
            query: ({ id, marketId }) => ({
                url: `/Collection/get-collection-by-id/${id}/${marketId}`,
            }),
            providesTags: ['Collections'], // Tag for collection data
        }),
        postCreateCollection: builder.mutation({
            query: (data) => ({
                url: `/Collection/create-collection-and-product-collection`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Collections'], // Invalidate collection data after creating a collection
        }),
        getStoreByName: builder.query({
            query: (name) => ({
                url: `/Market/get-store-by-name/${name}`,
            }),
            providesTags: ['Store'], // Tag for store data
        }),
        /* BASKET */
        postAddProduct: builder.mutation({
            query: (data) => ({
                url: `/Basket/add-product`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Basket'], // Invalidate basket data after adding a product
        }),
        getBasketGetOrCreate: builder.query({
            query: ({ marketId, uniqueCode }) => ({
                url: `/Basket/get-or-create/${marketId}/${uniqueCode}`,
            }),
            providesTags: ['Basket'], // Tag for basket data
        }),
        getBasket: builder.query({
            query: (basketId) => ({
                url: `/Basket/${basketId}`,
            }),
            providesTags: ['Basket'], // Tag for basket data
        }),
        postBasketCheckout: builder.mutation({
            query: ({ uniqueCode, marketId }) => ({
                url: `/Basket/checkout/${uniqueCode}/${marketId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Basket'], // Invalidate basket data after checkout
        }),
        postBasketConfirm: builder.mutation({
            query: (data) => ({
                url: `/Basket/confirm`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Basket'], // Invalidate basket data after confirmation
        }),
        deleteBasketItem: builder.mutation({
            query: ({ basketItemId, marketId, uniqueCode }) => ({
                url: `/Basket/${basketItemId}/${marketId}/${uniqueCode}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Basket'], // Invalidate basket data after deleting an item
        }),
        /* ORDER */
        postOrder: builder.mutation({
            query: (data) => ({
                url: `/Order`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Orders'], // Invalidate order data after creating an order
        }),
        getOrdersByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Order/market?marketId=${marketId}`,
            }),
            providesTags: ['Orders'], // Tag for order data
        }),
        getOrderByOrderId: builder.query({
            query: ({ orderId, marketId }) => ({
                url: `/Order/${orderId}?marketId=${marketId}`,
            }),
            providesTags: ['Orders'], // Tag for order data
        }),
        /* ANALYTICS */
        getAdminDashboard: builder.query({
            query: ({ startDate, endDate, marketId }) => ({
                url: `/Analytics/get-dashboard?startDate=${startDate}&endDate=${endDate}&marketId=${marketId}`,
            }),
            providesTags: ['Analytics'], // Tag for analytics data
        }),
        /* MARKET */
        getStoreWithSections: builder.query({
            query: (marketId) => ({
                url: `/Market/get-store-with-sections/${marketId}`,
            }),
            providesTags: ['StoreWithSections'], // Tag for store sections data
        }),
        getStoreWithSectionsByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Market/get-store-with-sections/${marketId}`,
            }),
            providesTags: ['StoreWithSections'], // Same as getStoreWithSections, since they are duplicates
        }),
        /* SECTION */
        postBannerItem: builder.mutation({
            query: (data) => ({
                url: `/Section/bannerItem`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['StoreWithSections'], // Invalidate store sections after adding a banner
        }),
        putSections: builder.mutation({
            query: ({ marketId, data }) => ({
                url: `/Section/bulk-update-sections/${marketId}`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['StoreWithSections'], // Invalidate store sections after updating sections
        }),
        /* PALETTE */
        getPaletteByMarketId: builder.query({
            query: (marketId) => ({
                url: `/Palet/market/${marketId}`,
            }),
            providesTags: ['Palettes'], // Tag for palette data
        }),
        postPalette: builder.mutation({
            query: (data) => ({
                url: `/Palet`,
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Palettes'], // Invalidate palette data after creating a palette
        }),
        updatePalette: builder.mutation({
            query: ({ id, data }) => ({
                url: `/Palet/${id}`,
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Palettes', 'StoreWithSections'], // Invalidate palettes and store sections
        }),
        deletePalette: builder.mutation({
            query: (id) => ({
                url: `/Palet/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Palettes', 'StoreWithSections'], // Invalidate palettes and store sections
        }),
        selectPalette: builder.mutation({
            query: ({ marketId, paletId }) => ({
                url: `/MarketSetting/palet?marketId=${marketId}&paletId=${paletId}`,
                method: 'POST',
            }),
            invalidatesTags: ['StoreWithSections'], // Invalidate store sections after selecting a palette
        }),
        postSettingFontName: builder.mutation({
            query: ({ marketId, selectedFont }) => ({
                url: `/MarketSetting/font?marketId=${marketId}&fontName=${selectedFont}`,
                method: 'POST',
            }),
            invalidatesTags: ['Store'], // Invalidate store data after updating the font
        }),
        postSettingBranding: builder.mutation({
            query: (data) => ({
                url: `/MarketSetting/brending`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Store'], // Invalidate store data after updating branding
        }),
        postForgotPassword: builder.mutation({
            query: (data) => ({
                url: `/User/forgot-password`,
                method: 'POST',
                body: data,
            }),
        }),
        postResetPassword: builder.mutation({
            query: (data) => ({
                url: `/User/reset-password`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: ({ marketId, id }) => ({
                url: `/Products/${marketId}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'], // Invalidate product data after deleting a product
        }),
        deleteCategory: builder.mutation({
            query: ({ marketId, id }) => ({
                url: `/Category/${marketId}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'], // Invalidate category data after deleting a category
        }),
        editCategory: builder.mutation({
            query: (data) => ({
                url: `/Category/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Categories'], // Invalidate category data after editing a category
        }),
        editCollection: builder.mutation({
            query: (data) => ({
                url: `/Collection/update-collection`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Collections'], // Invalidate collection data after editing a collection
        }),
        deleteCollection: builder.mutation({
            query: ({ marketId, id }) => ({
                url: `/Collection/delete-collection/${id}/${marketId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Collections'], // Invalidate collection data after deleting a collection
        }),
        selectFontName: builder.mutation({
            query: ({ marketId, fontName }) => ({
                url: `/MarketSetting/font?marketId=${marketId}&fontName=${fontName}`,
                method: 'POST',
            }),
            invalidatesTags: ['FontNameSelect'], // Invalidate store sections after selecting a palette
        }),
    }),
});

export const {
    usePostForgotPasswordMutation,
    usePostResetPasswordMutation,
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
    useGetStoreByNameQuery,
    /* BASKET */
    usePostAddProductMutation,
    useGetBasketGetOrCreateQuery,
    useGetBasketQuery,
    usePostBasketCheckoutMutation,
    usePostBasketConfirmMutation,
    useDeleteBasketItemMutation,
    /* ORDER */
    usePostOrderMutation,
    useGetOrdersByMarketIdQuery,
    useGetOrderByOrderIdQuery,
    /* ANALYTICS */
    useGetAdminDashboardQuery,
    /* MARKET */
    useGetStoreWithSectionsQuery,
    /* SECTION */
    usePostBannerItemMutation,
    usePutSectionsMutation,
    /* PALETTE */
    useGetPaletteByMarketIdQuery,
    usePostPaletteMutation,
    usePostSettingFontNameMutation,
    usePostSettingBrandingMutation,
    usePostEditProductMutation,
    useDeleteProductMutation,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
    useEditCollectionMutation,
    useDeleteCollectionMutation,
    useUpdatePaletteMutation,
    useDeletePaletteMutation,
    useSelectPaletteMutation,
    useGetStoreWithSectionsByMarketIdQuery,
    useSelectFontNameMutation,
} = ownerApi;