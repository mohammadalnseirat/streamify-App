import { VideoIcon } from "lucide-react";
import React from "react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="p-3 max-w-7xl mx-auto w-full flex items-center justify-end absolute top-0 border-b border-b-primary">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-gray-50 shadow-flash"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
};

export default CallButton;

const styles = `
  @keyframes shadowPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }

  .shadow-flash {
    animation: shadowPulse 2s infinite;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
