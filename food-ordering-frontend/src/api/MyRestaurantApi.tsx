import { Order, Restaurant } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/api-client";
import {
  showOrderStatusToast,
  showOrderErrorToast,
} from "@/components/OrderStatusToast";

export const useGetMyRestaurant = () => {
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const res = await axiosInstance.get("/api/my/restaurant");
    return res.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest,
    { enabled: !!localStorage.getItem("session_id") }
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const res = await axiosInstance.post("/api/my/restaurant", restaurantFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };

  const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(
    createMyRestaurantRequest
  );

  useEffect(() => {
    if (isSuccess) toast.success("Restaurant created successfully!");
  }, [isSuccess]);
  useEffect(() => {
    if (error) toast.error("Unable to create restaurant");
  }, [error]);

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const res = await axiosInstance.put("/api/my/restaurant", restaurantFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };

  const { mutate: updateRestaurant, isLoading, error, isSuccess } = useMutation(
    updateRestaurantRequest
  );

  useEffect(() => {
    if (isSuccess) toast.success("Restaurant updated successfully!");
  }, [isSuccess]);
  useEffect(() => {
    if (error) toast.error("Unable to update restaurant");
  }, [error]);

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const res = await axiosInstance.get("/api/my/restaurant/order");
    return res.data;
  };

  const { data: orders, isLoading, isFetching, refetch } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest,
    {
      enabled: !!localStorage.getItem("session_id"),
      refetchInterval: 5000,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  return { orders, isLoading, isFetching, refetch };
};

type UpdateOrderStatusRequest = { orderId: string; status: string };

export const useUpdateMyRestaurantOrder = () => {
  const updateMyRestaurantOrder = async (
    req: UpdateOrderStatusRequest
  ) => {
    const res = await axiosInstance.patch(
      `/api/my/restaurant/order/${req.orderId}/status`,
      { status: req.status }
    );
    return res.data;
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
    data: updatedOrder,
  } = useMutation(updateMyRestaurantOrder);

  useEffect(() => {
    if (isSuccess && updatedOrder) {
      showOrderStatusToast({
        status: updatedOrder.status,
        customerName: updatedOrder.deliveryDetails.name,
        orderId: updatedOrder._id,
      });
      reset();
    }
  }, [isSuccess, updatedOrder, reset]);

  useEffect(() => {
    if (isError) {
      showOrderErrorToast("Unable to update order status. Please try again.");
      reset();
    }
  }, [isError, reset]);

  return { updateRestaurantStatus, isLoading };
};
