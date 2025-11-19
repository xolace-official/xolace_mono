export type MoodOption = {
  id: string;
  label: string;
  emoji: string;
};

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'sad', label: 'Sad', emoji: '😔' },
  { id: 'anxious', label: 'Anxious', emoji: '😟' },
  { id: 'excited', label: 'Excited', emoji: '🤩' },
  { id: 'angry', label: 'Angry', emoji: '😡' },
  { id: 'tired', label: 'Tired', emoji: '🥱' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'chill', label: 'Chill', emoji: '😌' },
  { id: 'thoughtful', label: 'Thoughtful', emoji: '🤔' },
  { id: 'laughing', label: 'Laughing', emoji: '😄' },
  { id: 'inspired', label: 'Inspired', emoji: '💡' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡️' },
  { id: 'peaceful', label: 'Peaceful', emoji: '🕊️' },
  { id: 'melancholy', label: 'Melancholy', emoji: '🌧️' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'nostalgic', label: 'Nostalgic', emoji: '🕰️' },
  { id: 'motivated', label: 'Motivated', emoji: '🚀' },
];
