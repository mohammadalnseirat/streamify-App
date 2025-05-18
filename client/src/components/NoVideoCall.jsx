import React from 'react'
import './NoVideoCall.css'

const NoVideoCall = () => {
  return (
    <div className="no-video-container">
      <div className="video-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      </div>
      <h2>No Active Video Call</h2>
      <p>Start a new call to begin video chatting</p>
    </div>
  )
}

export default NoVideoCall