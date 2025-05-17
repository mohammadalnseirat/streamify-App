import React from "react";
import { Link } from "react-router";
import { SendIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constant";

const FriendsCard = ({ friend }) => {
  return (
    <div className="card  bg-base-100 hover:shadow-md border border-primary/30 cursor-pointer hover:shadow-primary transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePicture} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <span className="badge  badge-lg badge-primary text-sm w-full">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline badge-lg text-sm w-full">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-primary w-full"
        >
          <SendIcon className="size-4 animate-pulse" />
          Message
        </Link>
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
