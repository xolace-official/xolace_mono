import { ImageSource } from 'expo-image';

export interface OnboardingData {
  id: number;
  image: ImageSource | number | string | null;
  text: string;
  textColor: string;
  backgroundColor: string;
  description: string;
  activeDotColor: string;
}

export const colors = ['#482E04', '#613280', '#114E6B', '#094A03', '#6B3B07'];

export const data: OnboardingData[] = [
  {
    id: 1,
    image: require('../assets/images/onboarding/onboarding1.png'),
    text: 'Welcome to \n' + 'Xolace.',
    textColor: '#482E04',
    backgroundColor: '#F8D196',
    description:
      'Every story matters here. \n\nFind your voice, connect with others, and know you’re never alone. \n\nYour safe space to share, heal,' +
      'and belong. ',
    activeDotColor: '#482E04',
  },
  {
    id: 2,
    image: require('../assets/images/onboarding/onboarding2.png'),
    text: 'A Safe Space \nFor You.',
    textColor: '#613280',
    backgroundColor: '#D1AEE4',
    description:
      'Your identity stays private,\n' +
      'your voice stays heard. \n\nShare your thoughts and \nfeelings without fear of judgment.',
    activeDotColor: '#613280',
  },
  {
    id: 3,
    image: require('../assets/images/onboarding/onboarding3.png'),
    text: 'Find Your\n' + 'People.',
    textColor: '#114E6B',
    backgroundColor: '#B8D9E9',
    description:
      'Join Campfires.\nSafe spaces where real \n' +
      'conversations happen. \n\nConnect with others\n' +
      'who truly understand what\n' +
      'you’re going through.',
    activeDotColor: '#0D47A1',
  },
  {
    id: 4,
    image: require('../assets/images/onboarding/onboarding5.png'),
    text: 'Grow & Heal \nTogether.',
    textColor: '#094A03',
    backgroundColor: '#B3DEA7',
    description:
      'Discover stories, give support,\n' +
      'and take small steps \n' +
      'toward healing. \n\nSide by side with others.\n' +
      'You don’t have to do it alone.',
    activeDotColor: '#0D47A1',
  },
  {
    id: 5,
    image: require('../assets/images/onboarding/onboarding6.png'),
    text: 'Explore Xolace',
    textColor: '#6B3B07',
    backgroundColor: '#FFDD6C',
    description:
      'Your journey starts here. \nFind your community,\n' +
      'share your story,\n' +
      'and feel at home.',
    activeDotColor: '#6B3B07',
  },
];
