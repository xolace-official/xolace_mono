import { Link } from 'expo-router';
import { View } from 'react-native';

import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  X,
} from '@xolacekit/ui';

export default function AuthErrorPage() {
  return (
    <View className="flex-1 items-center gap-6 p-4">
      <View>
        <Text className="text-xl font-bold">
          Sorry, we couldn't sign you in.
        </Text>
      </View>

      <Alert>
        <AlertIcon className="rounded-full border-8 border-red-100 bg-red-500 p-2">
          <X className="h-14 w-14 text-white" />
        </AlertIcon>

        <AlertTitle>Sorry, something went wrong.</AlertTitle>
        <AlertDescription>Please try again</AlertDescription>

        <AlertActions>
          <Button variant={'outline'} asChild>
            <Link href="/auth/sign-up">
              <Text>Go back</Text>
            </Link>
          </Button>
        </AlertActions>
      </Alert>
    </View>
  );
}
