// constants/moods.ts
import {
  Angry,
  Brain,
  Camera,
  CloudRain,
  Coffee,
  Frown,
  Heart,
  Laugh,
  Meh,
  Moon,
  Music,
  Palette,
  Smile,
  Star,
  Sun,
  Zap,
} from 'lucide-react-native';

import { MoodType } from '../types/post.types';

export const moods: MoodType[] = [
  {
    id: 'happy',
    label: 'Happy',
    icon: Smile,
    color: '#facc15',
    hoverColor: 'bg-yellow-500',
  },
  {
    id: 'excited',
    label: 'Excited',
    icon: Zap,
    color: '#fb923c',
    hoverColor: 'bg-orange-500',
  },
  {
    id: 'thoughtful',
    label: 'Thoughtful',
    icon: Brain,
    color: '#c084fc',
    hoverColor: 'bg-purple-500',
  },
  {
    id: 'chill',
    label: 'Chill',
    icon: Coffee,
    color: '#60a5fa',
    hoverColor: 'bg-blue-500',
  },
  {
    id: 'grateful',
    label: 'Grateful',
    icon: Heart,
    color: '#f472b6',
    hoverColor: 'bg-pink-500',
  },
  {
    id: 'sad',
    label: 'Sad',
    icon: Frown,
    color: '#94a3b8',
    hoverColor: 'bg-slate-500',
  },
  {
    id: 'angry',
    label: 'Angry',
    icon: Angry,
    color: '#f87171',
    hoverColor: 'bg-red-500',
  },
  {
    id: 'neutral',
    label: 'Neutral',
    icon: Meh,
    color: '#9ca3af',
    hoverColor: 'bg-gray-500',
  },
  {
    id: 'laughing',
    label: 'Laughing',
    icon: Laugh,
    color: '#34d399',
    hoverColor: 'bg-emerald-500',
  },
  {
    id: 'inspired',
    label: 'Inspired',
    icon: Star,
    color: '#fbbf24',
    hoverColor: 'bg-amber-500',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    icon: Sun,
    color: '#a3e635',
    hoverColor: 'bg-lime-500',
  },
  {
    id: 'peaceful',
    label: 'Peaceful',
    icon: Moon,
    color: '#818cf8',
    hoverColor: 'bg-indigo-500',
  },
  {
    id: 'melancholy',
    label: 'Melancholy',
    icon: CloudRain,
    color: '#22d3ee',
    hoverColor: 'bg-cyan-500',
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: Palette,
    color: '#a78bfa',
    hoverColor: 'bg-violet-500',
  },
  {
    id: 'nostalgic',
    label: 'Nostalgic',
    icon: Camera,
    color: '#fb7185',
    hoverColor: 'bg-rose-500',
  },
  {
    id: 'motivated',
    label: 'Motivated',
    icon: Music,
    color: '#2dd4bf',
    hoverColor: 'bg-teal-500',
  },
];

export const getMoodById = (id: string): MoodType | undefined => {
  return moods.find((mood) => mood.id === id);
};
