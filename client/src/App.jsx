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
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import { ShipWheelIcon } from "lucide-react";
import { LoaderPage } from "./components";

const App = () => {
  //!get the Authenticated User:
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  //! check if there is a loading state:
  if (isLoading) {
    return <LoaderPage />;
  }
  const authUser = authData?.user;
  return (
    <div className="h-screen" data-theme="dark">
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/log-in"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/notifications"
          element={
            authUser ? <NotificationsPage /> : <Navigate to={"/log-in"} />
          }
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/log-in"} />}
        />
      </Routes>
      <ToastifyContainer />
    </div>
  );
};

export default App;
