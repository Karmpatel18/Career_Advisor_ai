import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

const VideoStream = () => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [channelName, setChannelName] = useState('test');
  const [isLoading, setIsLoading] = useState(false);
  const client = useRef(null);

  // TODO: Replace these with your actual Agora credentials
  // 1. Go to https://console.agora.io/
  // 2. Create a new project or select an existing one
  // 3. Get the App ID from Project Management > Project List
  // 4. Generate a temporary token for testing
  const appId = '358bfbea39b4492dbe7b72973fc96129'; // Your App ID from Agora Console
  const token = '007eJxTYFBf9Y8v0vl2eMvD/5qRV02WLl01+fiDJ1O+ePa95y3o3lapwGBsapGUlpSaaGyZZGJiaZSSlGqeZG5kaW6clmxpZmhkue7An/SGQEaGnDA/JkYGCATxeRhKUotLFJIzEvPyUnMYGABZFCWX'; // Your temporary token

  useEffect(() => {
    if (!appId) {
      setError('Please add your Agora App ID to the component');
      return;
    }

    // Initialize Agora client
    client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Set up event handlers
    client.current.on('user-published', async (user, mediaType) => {
      await client.current.subscribe(user, mediaType);
      if (mediaType === 'video') {
        setRemoteUsers((prevUsers) => [...prevUsers, user]);
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play();
      }
    });

    client.current.on('user-unpublished', (user) => {
      setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    });

    return () => {
      localVideoTrack?.close();
      localAudioTrack?.close();
      client.current?.leave();
    };
  }, []);

  const toggleMute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(!isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const joinChannel = async () => {
    try {
      if (!appId) {
        setError('Please add your Agora App ID to the component');
        return;
      }

      if (!channelName.trim()) {
        setError('Please enter a channel name');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Join the channel
      await client.current.join(appId, channelName, token, null);

      // Create and publish local tracks
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      await client.current.publish([videoTrack, audioTrack]);
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining channel:', error);
      setError(`Error joining channel: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveChannel = async () => {
    try {
      localVideoTrack?.close();
      localAudioTrack?.close();
      await client.current.leave();
      setLocalVideoTrack(null);
      setLocalAudioTrack(null);
      setRemoteUsers([]);
      setIsJoined(false);
      setIsMuted(false);
      setIsVideoOff(false);
      setError(null);
    } catch (error) {
      console.error('Error leaving channel:', error);
      setError(`Error leaving channel: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Video Conference</h1>
          <p className="text-gray-400">Join a video conference room</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!isJoined ? (
          <div className="flex flex-col items-center gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Join Channel</h2>
              <div className="mb-4">
                <label htmlFor="channelName" className="block text-sm font-medium text-gray-300 mb-2">
                  Channel Name
                </label>
                <input
                  type="text"
                  id="channelName"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter channel name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white"
                />
              </div>
              <button
                onClick={joinChannel}
                disabled={isLoading || !channelName.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isLoading || !channelName.trim()
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                {isLoading ? 'Joining...' : 'Join Channel'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Local video */}
              <div className="bg-gray-800/50 p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">You</h2>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-sm ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}>
                      {isMuted ? 'Muted' : 'Unmuted'}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${isVideoOff ? 'bg-red-500' : 'bg-green-500'}`}>
                      {isVideoOff ? 'Video Off' : 'Video On'}
                    </span>
                  </div>
                </div>
                {localVideoTrack && (
                  <div
                    ref={(ref) => {
                      if (ref) {
                        localVideoTrack.play(ref);
                      }
                    }}
                    className="w-full aspect-video rounded-lg bg-gray-900"
                  />
                )}
              </div>

              {/* Remote videos */}
              {remoteUsers.map((user) => (
                <div key={user.uid} className="bg-gray-800/50 p-4 rounded-xl shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">User {user.uid}</h2>
                  <div
                    ref={(ref) => {
                      if (ref && user.videoTrack) {
                        user.videoTrack.play(ref);
                      }
                    }}
                    className="w-full aspect-video rounded-lg bg-gray-900"
                  />
                </div>
              ))}
            </div>

            <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={toggleMute}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  isMuted ? 'bg-red-500' : 'bg-green-500'
                } text-white hover:bg-opacity-90 transition-colors`}
              >
                {isMuted ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Unmute
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                    Mute
                  </>
                )}
              </button>

              <button
                onClick={toggleVideo}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  isVideoOff ? 'bg-red-500' : 'bg-green-500'
                } text-white hover:bg-opacity-90 transition-colors`}
              >
                {isVideoOff ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Show Video
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Hide Video
                  </>
                )}
              </button>

              <button
                onClick={leaveChannel}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Leave Channel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoStream; 