import { Navigate, Route, Routes } from "react-router";
import {
  CallPage,
  ChatPage,
  HomePage,
  LoginPage,
  NotificationsPage,
  OnboardingPage,
  SignUpPage,
} from "./pages";
// import { Navbar } from "./components";
import ToastifyContainer from "./components/ToastNotificatation";
import { LoaderPage } from "./components";
import useAuthUser from "./hooks/useAuthUser";
import NotFoundPage from "./pages/404";

const App = () => {
  //!get the Authenticated User:
  const { isLoading, authUser } = useAuthUser();
  //! check if there is a loading state:
  if (isLoading) {
    return <LoaderPage />;
  }

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  return (
    <div className="h-screen" data-theme="dark">
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/log-in" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/log-in"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to={"/"} />
              )
            ) : (
              <Navigate to={"/log-in"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <NotificationsPage />
            ) : (
              <Navigate to={"/log-in"} />
            )
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to={"/log-in"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastifyContainer />
    </div>
  );
};

export default App;
