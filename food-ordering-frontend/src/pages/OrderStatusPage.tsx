import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderRightColumn from "@/components/OrderRightColumn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ChevronUp,
  Calendar,
  Package,
  MapPin,
  User,
  ShoppingBag,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChefHat,
  Truck,
  LogIn,
  UserCircle,
  CreditCard,
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const OrderStatusPage = () => {
  const { isLoggedIn } = useAppContext();
  const { orders, isLoading } = useGetMyOrders();
  const [searchParams, setSearchParams] = useSearchParams();
  // Group visible orders by date with expand/collapse
  const [expandedDates, setExpandedDates] = useState<{
    [date: string]: boolean;
  }>({});

  // Check for successful payment and show toast notification (must run before any early return)
  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      toast.success(
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 text-green-800">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="font-medium">Payment Successful!</div>
            <div className="text-sm text-muted-foreground">
              Your order has been confirmed and is being processed
            </div>
          </div>
        </div>,
        {
          duration: 5000,
          position: "bottom-right",
          style: {
            background: "white",
            border: "1px solid #10b981",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
        },
      );
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("success");
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Not logged in – show friendly login prompt
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-orange-100">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Order Status</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your orders and delivery status
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To view your order status, please sign in with your test
              credentials or your personal account.
            </p>
            <div className="flex flex-col gap-2 text-sm mb-4">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-orange-500" />
                <span>Test credentials: test@user.com / 12345678</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                <span>Or use your own registered account</span>
              </div>
            </div>
            <Link to="/sign-in">
              <Button className="w-full font-bold bg-orange-500 hover:bg-orange-600 mt-4">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In to View Orders
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Enhanced loading state with skeleton
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Order Status</h1>
          <p className="text-muted-foreground">
            Track your orders and delivery status
          </p>
        </div>

        {/* Skeleton Order Cards */}
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const visibleStatuses = [
    "placed",
    "paid",
    "inProgress",
    "outForDelivery",
    "delivered",
  ];
  const visibleOrders = orders?.filter((order) =>
    visibleStatuses.includes(order.status),
  );

  // Enhanced empty state
  if (!visibleOrders || visibleOrders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="text-xl font-semibold">No Orders Found</div>
          <div className="text-muted-foreground max-w-md">
            You haven't placed any orders yet. Start exploring our restaurants
            and place your first order!
          </div>
        </div>
      </div>
    );
  }

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${weekday}, ${day}.${month}.${year}`;
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "placed":
        return <AlertCircle className="h-4 w-4" />;
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "inProgress":
        return <ChefHat className="h-4 w-4" />;
      case "outForDelivery":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-gray-100 text-gray-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "outForDelivery":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Order Status</h1>
        <p className="text-muted-foreground">
          Track your orders and delivery status
        </p>
      </div>

      {/* Orders by Date */}
      {(() => {
        if (!visibleOrders || visibleOrders.length === 0) return null;
        const grouped: { [date: string]: typeof visibleOrders } = {};
        visibleOrders.forEach((order) => {
          const d = new Date(order.createdAt);
          const dateStr = `${d.getFullYear()}-${String(
            d.getMonth() + 1,
          ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (!grouped[dateStr]) grouped[dateStr] = [];
          grouped[dateStr].push(order);
        });
        return Object.entries(grouped)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([date, orders]) => {
            const expanded = expandedDates[date] ?? true;
            return (
              <Card key={date} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">
                        {formatDateForDisplay(date)}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Package className="h-3 w-3" />
                        {orders.length}{" "}
                        {orders.length === 1 ? "order" : "orders"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={expanded ? "Collapse" : "Expand"}
                        onClick={() =>
                          setExpandedDates((prev) => ({
                            ...prev,
                            [date]: !expanded,
                          }))
                        }
                      >
                        <ChevronUp
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expanded && (
                  <CardContent className="p-0">
                    <div className="space-y-6 p-6">
                      {[...orders]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                        )
                        .map((order) => (
                          <Card
                            key={order._id}
                            className="border-2 hover:border-primary/20 transition-colors"
                          >
                            <CardContent className="p-6 space-y-6">
                              {/* Order Header with Status */}
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                      {order.deliveryDetails.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      {order.deliveryDetails.addressLine1},{" "}
                                      {order.deliveryDetails.city}
                                    </span>
                                  </div>
                                </div>
                                <Badge
                                  className={`${getStatusColor(
                                    order.status,
                                  )} flex items-center gap-1`}
                                >
                                  {getStatusIcon(order.status)}
                                  <span>
                                    {order.status === "placed"
                                      ? "Awaiting Payment"
                                      : order.status === "paid"
                                        ? "Payment Confirmed"
                                        : order.status === "inProgress"
                                          ? "In Progress"
                                          : order.status === "outForDelivery"
                                            ? "Out for Delivery"
                                            : "Delivered"}
                                  </span>
                                </Badge>
                              </div>

                              {/* Order Status Progress */}
                              <OrderStatusHeader order={order} />

                              {/* Warning for placed orders */}
                              {order.status === "placed" && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-red-700">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="font-medium">
                                      Payment Required
                                    </span>
                                  </div>
                                  <p className="text-red-600 text-sm mt-1">
                                    This order is placed but not paid. Please
                                    complete the payment to proceed.
                                  </p>
                                </div>
                              )}

                              {/* Order Details Grid */}
                              <div className="grid gap-6 lg:grid-cols-2">
                                <OrderStatusDetail order={order} />
                                <OrderRightColumn order={order} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          });
      })()}
    </div>
  );
};

export default OrderStatusPage;
