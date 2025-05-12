import { toast } from "react-toastify";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();
  const isChatPage = pathname.startsWith("/chat");

  // const queryClient = useQueryClient();

  // const { mutate: logoutUserMutation, isPending } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     toast.success("User Logged out successfully");
  //   },
  //   onError: (error) => {
  //     toast.error(error.response.data.message || "Something went wrong");
  //   },
  // });

  const { logoutUserMutation, isPending } = useLogout();

  //! Handle Logout User
  const handleLogoutUser = () => {
    logoutUserMutation();
  };
  return (
    <nav className="sticky top-0 h-16 p-[34px] border-b-2 border-base-300 bg-base-200 z-30 flex items-center">
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* Image Only in the chat Page */}
          {isChatPage && (
            <div className="p-1">
              <Link to={"/"} className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary animate-spin-slow" />
                <span className="text-3xl font-[400] font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle group">
                <BellIcon className="size-6 text-base-content opacity-70 group-hover:opacity-100" />
              </button>
            </Link>

            {/* Todo Theme Selector */}
            <ThemeSelector />

            {/* Profile Image */}
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={authUser?.profilePicture}
                  alt="profile"
                  className="border border-base-300"
                />
              </div>
            </div>

            {/* Logout Button */}
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
    </nav>
  );
};

export default Navbar;
