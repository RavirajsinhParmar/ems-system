import { authApi } from "./Api";

export const Auth = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/signup",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["signup"],
    }),
    UpdateProfile: builder.mutation({
      query: (body) => {
        return {
          url: "/update-profile",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["update-profile"],
    }),
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useUpdateProfileMutation } =
  Auth;
