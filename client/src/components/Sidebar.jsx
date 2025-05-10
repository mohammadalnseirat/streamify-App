import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {ShipWheelIcon} from "lucide-react";

import { SIDEBAR_LINKS } from "../constant";
const Sidebar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();
  return (
    <>
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      
        <div className={`p-4 border-b-2 bg-base-200 border-base-300`}>
          <Link to={"/"} className="flex items-center gap-2">
            <ShipWheelIcon className="size-9 text-primary animate-spin-slow" />
            <span
              className={`text-3xl font-[400] font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider`}
            >
              Streamify
            </span>
          </Link>
        </div>

        {/* List of links */}
        <nav
          className={`flex-1 p-4 space-y-1`}
        >
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={`btn btn-ghost w-full gap-3 justify-start px-3 normal-case ${
                pathname === link.href ? "btn-active" : ""
              }`}
            >
              <link.icon className="size-5 text-base-content opacity-70" />
              <span>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* User profile */}
        <div
          className={`mt-auto p-4 border-t-2 border-base-300`}
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full border border-primary">
                <img src={authUser?.profilePicture} alt="User profile" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm truncate">
                {authUser?.fullName}
              </p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success"></span>
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
