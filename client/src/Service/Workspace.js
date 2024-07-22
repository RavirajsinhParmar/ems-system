import { authApi } from "./Api";

export const Workspace = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query({
      query: () => {
        return {
          url: "/workspace",
          method: "GET",
        };
      },
      providesTags: ["workspace"],
    }),
    createWorkspace: builder.mutation({
      query: (body) => {
        return {
          url: "/workspace",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["workspace"],
    }),
    updateWorkspace: builder.mutation({
      query: (body) => {
        return {
          url: "/workspace",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["workspace"],
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => {
        return {
          url: `/workspace/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["workspace"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useUpdateWorkspaceMutation,
  useCreateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = Workspace;
