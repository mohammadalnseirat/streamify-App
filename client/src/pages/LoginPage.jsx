import { Eye, EyeOff, ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import useLogIn from "../hooks/useLogIn";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginMutation, isPending } = useLogIn();

  //! handle Login User:
  const handleLoginUser =  (e) => {
    e.preventDefault();
      loginMutation(formData);
      setFormData({
        email: "",
        password: "",
      });
  };
  return (
    <div
      data-theme="forest"
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-5xl mx-auto bg-base-100 border border-primary/25 flex flex-col md:flex-row animate-shadow-pulse rounded-lg overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 bg-base-100 flex flex-col sm:p-8">
          <div className="flex items-center justify-start gap-2 mb-4">
            <ShipWheelIcon className="w-9 h-9 text-primary animate-spin-slow" />
            <span className="text-3xl font-[400] font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider shadow-lg">
              Stremify
            </span>
          </div>

          {/* Form */}
          <div className="w-full">
            <form onSubmit={handleLoginUser}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back!</h2>
                  <p className="text-sm opacity-80">
                    Get started to language learning adventure!
                  </p>
                </div>
                {/* Email */}
                <div className="w-full form-control">
                  <label htmlFor="email" className="label ml-2 cursor-pointer">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email..."
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Password */}
                <div className="w-full form-control relative">
                  <label
                    htmlFor="password"
                    className="label ml-2 cursor-pointer"
                  >
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password..."
                    className="input input-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  {showPassword ? (
                    <EyeOff
                      className="text-xl cursor-pointer absolute top-12 right-5 text-red-500"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Eye
                      className="text-xl cursor-pointer absolute top-12 right-5 text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isPending || !formData.email || !formData.password}
                  className="btn btn-primary w-full hover:shadow-sm hover:shadow-primary/25"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Signing In...</span>
                      <ShipWheelIcon className="size-4 animate-spin text-yellow-500" />
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className="mt-4 text-center">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-primary underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex w-full lg:w-1/2 bg-primary/10 justify-center items-center">
          <div className="max-w-md p-8">
            <div className="max-w-sm mx-auto aspect-square relative">
              <img
                src="/video.svg"
                alt="video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-3 text-center">
              <h2 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
