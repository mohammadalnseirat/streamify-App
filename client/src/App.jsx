import { Route, Routes } from "react-router";
import {
  CallPage,
  ChatPage,
  HomePage,
  LoginPage,
  NotificationsPage,
  OnboardingPage,
  SignUpPage,
} from "./pages";
import { Navbar } from "./components";
import ToastifyContainer from "./components/ToastNotificatation";

const App = () => {
  return (
    <div className="h-screen" data-theme="dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <ToastifyContainer />
    </div>
  );
};

export default App;
