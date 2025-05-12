import React from "react";
import { Link } from "react-router";
import { SendIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constant";

const FriendsCard = ({ friend }) => {
  return (
    <div className="card bg-base-100 hover:shadow-md hover:shadow-primary transition-shadow">
      <div className="card-body p-4">
        {/* User Infon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar size-16">
            <img
              src={friend.profilePicture}
              alt="Profile Picture"
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="font-[400] text-lg truncate">{friend.fullName}</h3>
            </div>

            {/* Language: */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-outline badge-primary text-xs">
                {getLanguageFlag(friend.nativeLanguage)}
                Native: {friend.nativeLanguage}
              </span>
              <span className="badge badge-outline badge-primary text-xs">
                {getLanguageFlag(friend.learningLanguage)}
                Learning: {friend.learningLanguage}
              </span>
            </div>
            <Link to={`/chat/${friend._id}`} className="btn btn-primary w-full">
              Message
              <SendIcon className="w-4 h-4 ml-2 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;


export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
