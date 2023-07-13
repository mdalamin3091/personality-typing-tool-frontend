import { apiSlice } from "../api/apiSlice";

export const charactersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCharacters: builder.query({
            query: () => ({
                url: "/character",
            }),
            providesTags: ["character"],
        }),
        getCharacter: builder.query({
            query: (id) => ({
                url: `/character/${id}`,
            }),
        }),
        createCharacter: builder.mutation({
            query: (data) => ({
                url: `/character/create-character`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["character"],
        }),
        updateCharacter: builder.mutation({
            query: ({ id, data }) => ({
                url: `/character/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["character"],
        }),
        deleteCharacter: builder.mutation({
            query: (id) => ({
                url: `/character/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["character"],
        }),
    }),
});

export const {
    useGetAllCharactersQuery,
    useGetCharacterQuery,
    useCreateCharacterMutation,
    useUpdateCharacterMutation,
    useDeleteCharacterMutation,
} = charactersApi;
