import { toast } from "react-toastify";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import useNotification from "../hooks/useNotification";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();
  const isChatPage = pathname.startsWith("/chat");

  const { logoutUserMutation, isPending } = useLogout();
  const { inComingRequests } = useNotification();

  //! Handle Logout User
  const handleLogoutUser = () => {
    logoutUserMutation();
  };

  return (
    <nav className="sticky top-0 border-b-2 border-base-300 bg-base-200 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">
          {/* Logo Section - Hidden on desktop except chat page */}
          <div className={`flex justify-center lg:justify-start ${!isChatPage && 'lg:hidden'}`}>
            <Link to={"/"} className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary animate-spin-slow" />
              <span className="text-3xl font-[400] font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col lg:flex-row items-center justify-end w-full gap-4 mt-4 lg:mt-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to={"/notifications"}>
                <button className="btn btn-ghost btn-circle group relative">
                  <BellIcon
                    className={`size-6 text-base-content opacity-70 group-hover:opacity-100  ${
                      inComingRequests.length > 0
                        ? "animate-wiggle text-primary"
                        : "group-hover:animate-wiggle group-hover:text-primary"
                    } transition-all`}
                  />
                  {inComingRequests.length > 0 && (
                    <span className="absolute top-1.5 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                      {inComingRequests.length}
                    </span>
                  )}
                </button>
              </Link>

              <ThemeSelector />

              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={authUser?.profilePicture}
                    alt="profile"
                    className="border border-base-300"
                  />
                </div>
              </div>

              <button
                disabled={isPending}
                onClick={handleLogoutUser}
                className="btn btn-ghost btn-circle hover:bg-red-600 group"
              >
                {isPending ? (
                  <ShipWheelIcon className="size-6 animate-spin" />
                ) : (
                  <LogOutIcon className="h-6 w-6 text-base-content opacity-70 group-hover:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
