import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import ApiDocsPage from "./pages/ApiDocsPage";
import ApiStatusPage from "./pages/ApiStatusPage";
import AnalyticsDashboardPage from "./pages/AnalyticsDashboardPage";
import PerformancePage from "./pages/PerformancePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout showHero={false}>
            <SignInPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout showHero={false}>
            <RegisterPage />
          </Layout>
        }
      />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route
        path="/api-docs"
        element={
          <Layout showHero={false}>
            <ApiDocsPage />
          </Layout>
        }
      />
      <Route
        path="/api-status"
        element={
          <Layout showHero={false}>
            <ApiStatusPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        <Route
          path="/business-insights"
          element={
            <Layout>
              <AnalyticsDashboardPage />
            </Layout>
          }
        />
        <Route
          path="/optimization"
          element={
            <Layout>
              <PerformancePage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
