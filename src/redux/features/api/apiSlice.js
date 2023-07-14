import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://personality-typing-tool-backend.vercel.app/api/v1/",
        // baseUrl: "http://localhost:5000/api/v1/",
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const auth = localStorage.getItem("auth");
            if (auth) {
                const parseAuth = JSON.parse(auth);
                headers.set("authorization", parseAuth.token)
            }
            return headers;
        }
    }),
    tagTypes: ["character", "cast"],
    endpoints: (builder) => ({
    })
})