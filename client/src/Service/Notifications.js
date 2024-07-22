import { authApi } from "./Api";

export const Notifications = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => {
        return {
          url: `/notifications`,
          method: "GET",
        };
      },
      providesTags: ["notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery } = Notifications;
