// components/post/post-metrics.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';

import { ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text, cn } from '@xolacekit/ui';

// Types
interface PostMetricData {
  id: string;
  comments: Array<{ count: number }>;
  created_by: string;
  upvotes: number;
  downvotes: number;
}

interface PostMetricsProps {
  post: PostMetricData;
  section?: string;
  commentLength?: number;
  userId: string;
}

type VoteType = 'upvote' | 'downvote' | null;

export function PostMetrics({
  post,
  section = 'post',
  commentLength,
  userId,
}: PostMetricsProps) {
  // DUMMY DATA - Replace with actual data fetching
  const [currentVote, setCurrentVote] = useState<VoteType>(null);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isLoadingVote, setIsLoadingVote] = useState(false);

  // TODO: Replace with actual useUserVote hook
  // const { data: userVote, isPending } = useUserVote(post.id, userId);
  useEffect(() => {
    // Simulating fetching user's current vote
    // In production, replace with actual API call
    setIsLoadingVote(true);
    setTimeout(() => {
      // DUMMY: Set to null or fetch from your backend
      setCurrentVote(null);
      setIsLoadingVote(false);
    }, 500);
  }, [post.id, userId]);

  // Update counts from props
  useEffect(() => {
    setUpvoteCount(post.upvotes);
    setDownvoteCount(post.downvotes);
  }, [post.upvotes, post.downvotes]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return;

    const previousVote = currentVote;
    const previousUpvoteCount = upvoteCount;
    const previousDownvoteCount = downvoteCount;

    try {
      setIsVoting(true);

      // Optimistic update
      if (currentVote === voteType) {
        // Remove vote
        setCurrentVote(null);
        if (voteType === 'upvote') {
          setUpvoteCount((prev) => prev - 1);
        } else {
          setDownvoteCount((prev) => prev - 1);
        }
      } else {
        // Add or change vote
        if (currentVote === 'upvote') {
          setUpvoteCount((prev) => prev - 1);
          setDownvoteCount((prev) => prev + 1);
        } else if (currentVote === 'downvote') {
          setDownvoteCount((prev) => prev - 1);
          setUpvoteCount((prev) => prev + 1);
        } else {
          if (voteType === 'upvote') {
            setUpvoteCount((prev) => prev + 1);
          } else {
            setDownvoteCount((prev) => prev + 1);
          }
        }
        setCurrentVote(voteType);
      }

      // TODO: Replace with actual API call
      // await mutateVote({
      //   postId: post.id,
      //   voteType,
      //   currentVote: previousVote,
      //   user_id: userId,
      //   relatedUserId: post.created_by,
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Success - optimistic update remains
    } catch (error) {
      // Revert optimistic update on error
      setCurrentVote(previousVote);
      setUpvoteCount(previousUpvoteCount);
      setDownvoteCount(previousDownvoteCount);
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const handlePostClick = () => {
    // TODO: Implement navigation to post detail with comments
    // In React Native, you'd use navigation like:
    // navigation.navigate('PostDetail', { postId: post.id, type: 'comment' });
    console.log('Navigate to post detail:', post.id);
  };

  const commentCount =
    section === 'details'
      ? commentLength
      : Array.isArray(post?.comments)
        ? post.comments[0] && 'count' in post.comments[0]
          ? post.comments[0].count
          : post.comments.length
        : 0;

  if (isLoadingVote) {
    return (
      <View className="flex flex-row items-center gap-4">
        <ActivityIndicator size="small" color="#6b7280" />
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center gap-4">
      {/* Voting controls */}
      <View className="flex flex-row items-center gap-1">
        <Pressable
          onPress={() => handleVote('upvote')}
          disabled={isVoting}
          className={cn('p-1')}
        >
          <ThumbsUp
            size={20}
            color={currentVote === 'upvote' ? '#22c55e' : '#6b7280'}
            fill={currentVote === 'upvote' ? '#22c55e' : 'transparent'}
          />
        </Pressable>

        <Text className="min-w-[20px] text-center text-sm font-medium text-black dark:text-white">
          {upvoteCount}
        </Text>

        <Pressable
          onPress={() => handleVote('downvote')}
          disabled={isVoting}
          className={cn('p-1')}
        >
          <ThumbsDown
            size={20}
            color={currentVote === 'downvote' ? '#ef4444' : '#6b7280'}
            fill={currentVote === 'downvote' ? '#ef4444' : 'transparent'}
          />
        </Pressable>

        <Text className="min-w-[20px] text-center text-sm font-medium">
          {downvoteCount}
        </Text>
      </View>

      {/* Comment button */}
      <Pressable
        onPress={handlePostClick}
        className="flex flex-row items-center gap-1"
        disabled={section === 'details'}
      >
        <View className="h-7 w-7 items-center justify-center">
          {/* Comment bubble icon */}
          <Text
            className="text-xl text-gray-600"
            style={{ transform: [{ scaleX: -1 }] }}
          >
            💬
          </Text>
        </View>
        <Text className="text-sm font-medium">{commentCount}</Text>
      </Pressable>
    </View>
  );
}
