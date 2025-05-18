import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { toast } from "react-toastify";
import VideoLoader from "../components/VideoLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: streamTokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  //! useEffect to initialize the call:
  useEffect(() => {
    const initCall = async () => {
      if (!streamTokenData?.token || !authUser || !callId) {
        return;
      }

      try {
        console.log("initializing Video call...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        };

        //! create video call client:
        const videoCallClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: streamTokenData.token,
        });

        //! create call Instance:
        const callInstance = videoCallClient.call("default", callId);

        //! join the call:
        await callInstance.join({ create: true });

        toast.success("Call connected successfully");
        setClient(videoCallClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    // initialize the call:
    initCall();
  }, [streamTokenData, authUser, callId]);

  if (isLoading || isConnecting) {
    return <VideoLoader />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <>
            <NoVideoCall />
          </>
        )}
      </div>
    </div>
  );
};

export default CallPage;

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    return navigate("/");
  }

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};
