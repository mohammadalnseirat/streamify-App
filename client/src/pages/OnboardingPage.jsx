import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import {
  CameraIcon,
  LoaderIcon,
  SendIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { LANGUAGES } from "../constant";
import useOnboarding from "../hooks/useOnboarding";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
  });

  const { onboardingMutation, isPending } = useOnboarding();
  //! handle complete onboarding:
  const handleCompleteOnboarding = (e) => {
    e.preventDefault();
    onboardingMutation(formData);
  };

  //! handle random avatar:
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormData({
      ...formData,
      profilePicture: randomAvatar,
    });
    toast.success(" profile picture generated successfully!");
  };

  return (
    <div
      data-theme="forest"
      className="min-h-screen bg-base-100 flex items-center justify-center p-4 md:p-8"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow  shadow-green-800">
        <div className="card-body p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-[400] text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
            Complete Your Profile
          </h1>

          {/* Form Here */}
          <form onSubmit={handleCompleteOnboarding} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Image Privew */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden border-2 border-primary relative">
                {formData.profilePicture ? (
                  <>
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
                        <LoaderIcon className="animate-spin text-primary size-10" />
                      </div>
                    )}
                    <img
                      src={formData?.profilePicture}
                      alt="profile"
                      className="w-full h-full object-cover"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsImageLoading(false)}
                    />
                  </>
                ) : (
                  <div className="size-32 rounded-full bg-base-300 flex items-center justify-center">
                    <CameraIcon className="size-16 text-primary" />
                  </div>
                )}
              </div>
              {/* Generate Random Profile Picture */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-primary"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* Full Name */}
            <div className="form-control">
              <label htmlFor="fullName" className="label cursor-pointer">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name..."
                className="input input-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                required
              />
            </div>
            {/* Bio */}
            <div className="form-control">
              <label htmlFor="bio" className="label cursor-pointer">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                rows={5}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="textarea resize-none textarea-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                required
              />
            </div>
            {/* Native Language and Learning Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label
                  htmlFor="nativeLanguage"
                  className="label cursor-pointer"
                >
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  id="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setFormData({ ...formData, nativeLanguage: e.target.value })
                  }
                  className="select cursor-pointer select-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                >
                  <option value="" className="cursor-pointer">
                    Select Native Language
                  </option>
                  {LANGUAGES.map((language) => (
                    <option
                      className="cursor-pointer"
                      key={`native-${language}`}
                      value={language}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning Language */}
              <div className="form-control">
                <label
                  htmlFor="learningLanguage"
                  className="label cursor-pointer"
                >
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  id="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select cursor-pointer select-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                >
                  <option value="" className="cursor-pointer">
                    Select Learning Language
                  </option>
                  {LANGUAGES.map((language) => (
                    <option
                      className="cursor-pointer"
                      key={`learning-${language}`}
                      value={language}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Location */}
            <div className="form-control">
              <label htmlFor="location" className="label cursor-pointer">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Enter your location..."
                className="input input-bordered focus:ring-2 focus:ring-primary focus:outline-none w-full"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isPending ||
                !formData.bio ||
                !formData.fullName ||
                !formData.location ||
                !formData.nativeLanguage ||
                !formData.learningLanguage
              }
              className="btn btn-primary w-full"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <span>Loading...</span>
                  <ShipWheelIcon className="animate-spin size-5 text-red-500" />
                </div>
              ) : (
                <>
                  <span>Complete Profile</span>
                  <SendIcon className="size-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
