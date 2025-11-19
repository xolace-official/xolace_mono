// constants/moods.ts
import { 
  Smile, 
  Zap, 
  Brain, 
  Coffee, 
  Heart, 
  Frown, 
  Angry, 
  Meh, 
  Laugh, 
  Star, 
  Sun, 
  Moon, 
  CloudRain, 
  Palette, 
  Camera, 
  Music 
} from 'lucide-react-native';
import { MoodType } from '../types/post.types';

export const moods: MoodType[] = [
  {
    id: 'happy',
    label: 'Happy',
    icon: Smile,
    color: 'bg-yellow-400',
    hoverColor: 'bg-yellow-500',
  },
  {
    id: 'excited',
    label: 'Excited',
    icon: Zap,
    color: 'bg-orange-400',
    hoverColor: 'bg-orange-500',
  },
  {
    id: 'thoughtful',
    label: 'Thoughtful',
    icon: Brain,
    color: 'bg-purple-400',
    hoverColor: 'bg-purple-500',
  },
  {
    id: 'chill',
    label: 'Chill',
    icon: Coffee,
    color: 'bg-blue-400',
    hoverColor: 'bg-blue-500',
  },
  {
    id: 'grateful',
    label: 'Grateful',
    icon: Heart,
    color: 'bg-pink-400',
    hoverColor: 'bg-pink-500',
  },
  {
    id: 'sad',
    label: 'Sad',
    icon: Frown,
    color: 'bg-slate-400',
    hoverColor: 'bg-slate-500',
  },
  {
    id: 'angry',
    label: 'Angry',
    icon: Angry,
    color: 'bg-red-400',
    hoverColor: 'bg-red-500',
  },
  {
    id: 'neutral',
    label: 'Neutral',
    icon: Meh,
    color: 'bg-gray-400',
    hoverColor: 'bg-gray-500',
  },
  {
    id: 'laughing',
    label: 'Laughing',
    icon: Laugh,
    color: 'bg-emerald-400',
    hoverColor: 'bg-emerald-500',
  },
  {
    id: 'inspired',
    label: 'Inspired',
    icon: Star,
    color: 'bg-amber-400',
    hoverColor: 'bg-amber-500',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    icon: Sun,
    color: 'bg-lime-400',
    hoverColor: 'bg-lime-500',
  },
  {
    id: 'peaceful',
    label: 'Peaceful',
    icon: Moon,
    color: 'bg-indigo-400',
    hoverColor: 'bg-indigo-500',
  },
  {
    id: 'melancholy',
    label: 'Melancholy',
    icon: CloudRain,
    color: 'bg-cyan-400',
    hoverColor: 'bg-cyan-500',
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: Palette,
    color: 'bg-violet-400',
    hoverColor: 'bg-violet-500',
  },
  {
    id: 'nostalgic',
    label: 'Nostalgic',
    icon: Camera,
    color: 'bg-rose-400',
    hoverColor: 'bg-rose-500',
  },
  {
    id: 'motivated',
    label: 'Motivated',
    icon: Music,
    color: 'bg-teal-400',
    hoverColor: 'bg-teal-500',
  },
];

export const getMoodById = (id: string): MoodType | undefined => {
  return moods.find(mood => mood.id === id);
};