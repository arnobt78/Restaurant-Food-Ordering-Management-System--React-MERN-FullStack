import { User } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api-client";

export const useGetMyUser = () => {
  const getMyUserRequest = async (): Promise<User> => {
    const res = await axiosInstance.get("/api/my/user");
    return res.data;
  };

  const { data: currentUser, isLoading, error } = useQuery(
    "fetchCurrentUser",
    getMyUserRequest,
    { enabled: !!localStorage.getItem("session_id") }
  );

  if (error) {
    toast.error("Failed to fetch user");
  }

  return { currentUser, isLoading };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const res = await axiosInstance.put("/api/my/user", formData);
    return res.data;
  };

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(
    updateMyUserRequest
  );

  if (isSuccess) toast.success("User profile updated!");
  if (error) {
    toast.error((error as Error).toString());
    reset();
  }

  return { updateUser, isLoading };
};
