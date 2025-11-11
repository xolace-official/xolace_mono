// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/hooks/use-video-card-actions.ts
import { useState } from 'react';
// import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';

export function useVideoCardActions(videoId: string) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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
      const url = `xolace://glimpse/${videoId}`;
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