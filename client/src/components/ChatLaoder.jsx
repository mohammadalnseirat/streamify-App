import React from 'react';

import './ChatLoader.css';
import { MessagesSquare } from 'lucide-react';


const ChatLoader = () => {
  return (
    <div className="chat-loader">
      <div className="chat-loader-icon">
        <MessagesSquare className="chat-icon" />
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ChatLoader;