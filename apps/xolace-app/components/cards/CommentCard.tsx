// components/comment/comment-card.tsx
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BrainCircuit, ChevronDown, ChevronRight, MessageCircle, Pin, Sparkles } from 'lucide-react-native';

import { Card, CardHeader, CardContent , Avatar, AvatarImage, AvatarFallback , Badge , cn} from '@xolacekit/ui';

// TODO: Import when ready
// import { PostDropdown } from '../shared/post-dropdown';

// Types
export interface NestedComment {
  id: number;
  comment_text: string;
  created_at: string;
  author_name: string;
  author_avatar_url?: string | null;
  created_by: string | null;
  post: string;
  pinned_status: 'none' | 'professional' | 'author';
  ai_suggestion?: boolean;
  replies: NestedComment[];
}

interface CommentCardProps {
  comment: NestedComment;
  level?: number;
  isExpanded: boolean;
  onToggleExpanded: (commentId: number) => void;
  onReply: (authorName: string, commentId: number) => void;
  replyingTo?: number | null;
  headerClassName?: string;
  contentClassName?: string;
  className?: string;
  expandedComments?: Set<number>;
  postCreatedBy: string | null;
  campfires?: {
    name: string;
    slug: string;
    iconUrl?: string;
  } | null;
  commentSignedUrls?: Record<string, string>;
}

// Helper function to format timestamp
const formatTimestamp = (date: string): string => {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} wks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} mos ago`;
  return `${Math.floor(diffInSeconds / 31536000)} yrs ago`;
};

export function CommentCard({
  comment,
  className,
  headerClassName,
  contentClassName,
  level = 0,
  isExpanded = false,
  onToggleExpanded,
  onReply,
  replyingTo,
  expandedComments,
  postCreatedBy,
  campfires,
  commentSignedUrls,
}: CommentCardProps) {
  // States
  // const [isReportOpen, setIsReportOpen] = useState(false);
  console.log('Rendering CommentCard for comment ID:', comment);
  const [timestamp, setTimestamp] = useState('');

  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentPadding = level * 24; // 24px indent per level
  const isBeingRepliedTo = replyingTo === comment.id;

  // Format timestamp
  useEffect(() => {
    setTimestamp(formatTimestamp(comment.created_at));
  }, [comment.created_at]);

  const displayName = campfires?.name || comment.author_name;
  const avatarSrc =
    campfires?.iconUrl ||
    (comment.author_avatar_url && commentSignedUrls?.[comment.author_avatar_url]) ||
    comment.author_avatar_url ||
    undefined;

  const fallbackInitials = displayName?.slice(0, 2).toUpperCase() || 'U';

  return (
    <>
      <View className="relative w-full">
        {/* Connecting line for nested comments */}
        {level > 0 && (
          <View
            className="absolute top-0 w-0.5 bg-gray-300 dark:bg-gray-600"
            style={{
              left: indentPadding - 12,
              height: hasReplies && isExpanded ? '100%' : 60,
            }}
          />
        )}

        {/* Horizontal line connecting to parent */}
        {level > 0 && (
          <View
            className="absolute top-12 h-0.5 bg-gray-300 dark:bg-gray-600"
            style={{
              left: indentPadding - 12,
              width: 12,
            }}
          />
        )}

        <Card
          className={cn(
            'mb-2 w-full border-0 transition-all duration-200',
            isBeingRepliedTo
              ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700',
            className
          )}
        >
          {/* Header */}
          <CardHeader
            className={cn('flex-row items-start justify-between px-4 py-2', headerClassName)}
            style={{ paddingLeft: 16 + indentPadding }}
          >
            <View className="flex flex-row items-center justify-center gap-1">
              <Avatar alt={displayName} className="w-8 h-8">
                <AvatarImage source={{ uri: avatarSrc }}  />
                <AvatarFallback className="bg-gradient-to-br from-[#0536ff] to-[#6a71ea]">
                  <Text className="text-xs font-semibold text-white">
                    {fallbackInitials}
                  </Text>
                </AvatarFallback>
              </Avatar>

              <View className="flex flex-col items-start justify-center gap-1">
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                    {displayName}
                  </Text>
                  {comment.ai_suggestion && (
                    <BrainCircuit size={14} color="#8b5cf6" />
                  )}
                </View>

                {comment.ai_suggestion && (
                  <Badge className="text-[9px] py-[1px]">
                    <View className="flex flex-row items-center gap-1">
                      <Sparkles size={10} color="#fb923c" />
                      <Text className="text-orange-400">AI SUGGESTION</Text>
                    </View>
                  </Badge>
                )}
              </View>

              <Text className="ml-2 text-xs text-zinc-500 dark:text-gray-400">
                {timestamp}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-3">
              {comment.pinned_status !== 'none' && (
                <View className="flex flex-row items-center gap-1">
                  <Pin
                    size={12}
                    color={
                      comment.pinned_status === 'professional'
                        ? '#16a34a'
                        : '#8b5cf6'
                    }
                  />
                  <Text className="hidden text-xs text-gray-500 sm:flex">
                    {comment.pinned_status === 'professional'
                      ? 'Pinned by Professional'
                      : 'Pinned by Author'}
                  </Text>
                </View>
              )}

              {/* TODO: Implement PostDropdown for comments */}
              {/* <Pressable onPress={() => setIsReportOpen(true)}>
                <Text className="text-muted-foreground">⋮</Text>
              </Pressable> */}
            </View>
          </CardHeader>

          {/* Content */}
          <CardContent
            className={cn('mt-0', contentClassName)}
            style={{ paddingLeft: 16 + indentPadding }}
          >
            {/* Parse @mentions */}
            <View className="mb-2">
              {(() => {
                console.log('Matching comment text:', comment.comment_text);
                const match = comment.comment_text.match(/^@(\w+)\s+(.*)/);
                
                if (match) {
                  const username = match[1];
                  const rest = match[2];
                  return (
                    <Text className="leading-relaxed text-gray-800 dark:text-gray-200">
                      <Text className="mr-1 text-ocean-600">@{username}</Text>
                      <Text>{rest}</Text>
                    </Text>
                  );
                } else {
                  return (
                    <Text className="leading-relaxed text-gray-800 dark:text-gray-200">
                      {comment.comment_text}
                    </Text>
                  );
                }
              })()}
            </View>

            {/* Comment Actions */}
            <View className="flex flex-row items-center space-x-4">
              {/* TODO: Implement Like functionality */}
              {/* <Pressable className="flex flex-row items-center space-x-1">
                <Heart size={16} color="#6b7280" />
                <Text className="text-sm text-gray-500">Like</Text>
              </Pressable> */}

              <Pressable
                onPress={() => onReply?.(comment.author_name || 'User', comment.id)}
                className="flex flex-row items-center gap-1"
              >
                <MessageCircle
                  size={16}
                  color={isBeingRepliedTo ? '#2563eb' : '#6b7280'}
                />
                <Text
                  className={cn(
                    'text-sm',
                    isBeingRepliedTo ? 'text-blue-600' : 'text-gray-500'
                  )}
                >
                  Reply
                </Text>
              </Pressable>

              {/* TODO: Implement Share functionality */}
              {/* <Pressable className="flex flex-row items-center space-x-1">
                <Share size={16} color="#6b7280" />
                <Text className="text-sm text-gray-500">Share</Text>
              </Pressable> */}
            </View>

            {/* Expand/Collapse Button for Replies */}
            {hasReplies && (
              <Pressable
                onPress={() => onToggleExpanded(comment.id)}
                className="flex flex-row items-center gap-1 mt-3"
              >
                {isExpanded ? (
                  <ChevronDown size={16} color="#4b5563" />
                ) : (
                  <ChevronRight size={16} color="#4b5563" />
                )}
                <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isExpanded ? 'Hide' : 'Show'} {comment.replies.length}{' '}
                  {comment.replies.length === 1 ? 'reply' : 'replies'}
                </Text>
              </Pressable>
            )}
          </CardContent>
        </Card>

        {/* RECURSIVE RENDERING OF REPLIES */}
        {hasReplies && isExpanded && (
          <View className="space-y-2">
            {comment.replies.map(reply => (
              <CommentCard
                key={reply.id}
                comment={reply}
                level={level + 1}
                isExpanded={expandedComments?.has(reply.id) ?? false}
                onReply={onReply}
                replyingTo={replyingTo}
                onToggleExpanded={onToggleExpanded}
                expandedComments={expandedComments}
                postCreatedBy={postCreatedBy ?? ''}
                campfires={campfires}
                commentSignedUrls={commentSignedUrls}
              />
            ))}
          </View>
        )}
      </View>

      {/* TODO: Implement Report Modal/Sheet */}
      {/* <BottomSheet
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="Report Comment"
      >
        <ReportForm commentId={comment.id} />
      </BottomSheet> */}
    </>
  );
}