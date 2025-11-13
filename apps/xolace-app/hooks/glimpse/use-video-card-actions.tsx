import { useState } from 'react';

// import * as Clipboard from 'expo-clipboard';

export function useVideoCardActions(videoId: string) {
  console.log(videoId);
  const [copied, setCopied] = useState(false);

  const handleCardPress = () => {
    // Navigate to video detail
    //router.push(`/glimpse/${videoId}`);
  };

  const handleCopyLink = async (e?: any) => {
    if (e) {
      e.stopPropagation();
    }

    try {
      // Construct the full URL - adjust base URL as needed
      // const url = `xolace://glimpse/${videoId}`;
      //   await Clipboard.setStringAsync(url);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return {
    handleCardPress,
    handleCopyLink,
    copied,
  };
}
