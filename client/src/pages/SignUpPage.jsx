import { Eye, EyeOff, ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signupMutation, isPending } = useSignUp();

  const handleSignUpUser = (e) => {
    e.preventDefault();
    signupMutation(formData);
  };

  return (
    <div
      className="min-h-screen py-10 sm:py-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/50 flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-xl shadow-xl bg-base-100 overflow-hiiden">
        {/* Left Side start Here */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-8">
          {/* Logo */}
          <div className="flex items-center justify-start gap-2 mb-4">
            <ShipWheelIcon className="size-9 text-primary animate-spin-slow" />
            <span className="text-3xl font-[400] font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider shadow-lg">
              Stremify
            </span>
          </div>

          {/* Form */}
          <div className="w-full">
            <form onSubmit={handleSignUpUser}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create An Account</h2>
                  <p className="text-sm opacity-80">
                    Get started to language learning adventure!
                  </p>
                </div>
                <div className="space-y-3">
                  {/* Full Name */}
                  <div className="w-full form-control">
                    <label
                      htmlFor="fullName"
                      className="label ml-2 cursor-pointer"
                    >
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter Your Full Name..."
                      className="input input-bordered  w-full focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value.trim(),
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="w-full form-control">
                    <label
                      htmlFor="email"
                      className="label ml-2 cursor-pointer"
                    >
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email..."
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
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
                      placeholder="Enter Your Password..."
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    {formData.password.length < 8 && (
                      <p className="text-red-500 text-xs mt-1.5 ml-4">
                        Password must be at least 8 characters long
                      </p>
                    )}
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
                  <div className="form-control">
                    <label className="label justify-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        required
                      />
                      <span className="text-sm leading-tight">
                        I agree to the{" "}
                        <span className="text-primary underline underline-offset-2">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary underline underline-offset-2">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span>Loading...</span>
                      <ShipWheelIcon className="size-4 animate-spin text-red-500" />
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="mt-4 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/log-in"
                      className="text-primary underline underline-offset-2"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Left Side end Here */}
        {/* Right Side start Here */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/20">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/video.svg"
                alt="image learning language"
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-center space-y-4">
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

        {/* Right Side end Here */}
      </div>
    </div>
  );
};

export default SignUpPage;
