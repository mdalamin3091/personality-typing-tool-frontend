import { apiSlice } from "../api/apiSlice";

const enneagramType = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnneagramType: builder.query({
      query: (id) => ({
        url: `/enneagram-type/${id}`,
      }),
    }),
    getAllEnneagramType: builder.query({
      query: () => ({
        url: `/enneagram-type`,
      }),
    }),
  }),
});

export const { useGetEnneagramTypeQuery, useGetAllEnneagramTypeQuery } =
  enneagramType;
export const { getEnneagramType } = enneagramType.endpoints;
