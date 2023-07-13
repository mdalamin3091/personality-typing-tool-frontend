import { apiSlice } from "../api/apiSlice";

export const castApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCast: builder.query({
      query: () => ({
        url: "/cast",
      }),
      providesTags: ["cast"],
    }),
    getCast: builder.query({
      query: (id) => ({
        url: `/cast/${id}`,
      }),
      providesTags: ["cast"],
    }),
    getRelationship: builder.query({
      query: ({type1, type2}) => ({
        url: `/relationship?type1=${type1}&type2=${type2}`,
      }),
      providesTags: ["cast"],
    }),
    createCast: builder.mutation({
      query: (data) => ({
        url: "/cast/create-cast",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cast"],
    }),
    updateCast: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cast/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["cast"],
    }),
    deleteCast: builder.mutation({
      query: (id) => ({
        url: `/cast/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cast"],
    }),
    deleteCastWithCharacters: builder.mutation({
      query: (id) => ({
        url: `/cast/characters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cast", "character"],
    }),
  }),
});

export const {
  useGetAllCastQuery,
  useCreateCastMutation,
  useDeleteCastMutation,
  useDeleteCastWithCharactersMutation,
  useGetCastQuery,
  useUpdateCastMutation,
  useGetRelationshipQuery,
} = castApi;

export const { getRelationship } = castApi.endpoints;
