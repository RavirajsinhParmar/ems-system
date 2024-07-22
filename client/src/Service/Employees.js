import { authApi } from "./Api";

export const Employee = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.mutation({
      query: (body) => {
        return {
          url: `/employees`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: (body) => {
        return {
          url: "/employees",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => {
        return {
          url: `/employees/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useGetEmployeesMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = Employee;
