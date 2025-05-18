import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import ChatLoader from "../components/ChatLaoder";
import { StreamChat } from "stream-chat";
import { toast } from "react-toastify";
import CallButton from "../components/CallButton";
import { useThemeStore } from "../store/useThemeStore";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useAuthUser();
  const {theme} = useThemeStore()
  const { data: streamTokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will prevent the query from running if the user is not authenticated
  });

  //! USE EFFECT TO HANDLE THE CHAT CLIENT:
  useEffect(() => {
    const initializeChat = async () => {
      if (!streamTokenData?.token || !authUser) return;
      try {
        console.log("initializing Stram chat...");
        // ! 1- initialize the client:
        const client = StreamChat.getInstance(STREAM_API_KEY);

        // ! 2- connect the user to the client:
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePicture,
          },
          streamTokenData.token
        );

        //! 3- create a new channelId:
        const channelId = [authUser._id, targetUserId].sort().join("-"); //! this will ensure that the channelId is always the same for the same users and unique for different users

        //! 4- create a new channel:
        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        //! 5- watch the channel:
        await currentChannel.watch();

        // ! 6- set the channel and client in the state:
        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    // ! call the initializeChat function:
    initializeChat();
  }, [authUser, streamTokenData, targetUserId]);

  //! Function to handle Video Call:
  const handleVideoCall = () => {
    if (!channel) return;
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I have started a video call. Join me here: ${callUrl}`,
      })

      toast.success("Video call link sent successfully.");
    }
  };

  //! check for loading:
  if (isLoading || !chatClient || !channel) return <ChatLoader />;
  return (
    <div className={`h-[93vh] bg-base-100`} data-theme={theme}>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full  relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
