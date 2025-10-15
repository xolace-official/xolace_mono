import { Link } from 'expo-router';
import {View} from 'react-native';

import {
    AuthPageLayout,
    AuthPageLayoutDescription,
    AuthPageLayoutForm,
    AuthPageLayoutHeading,
    AuthPageLayoutLogo, AuthPageLayoutNavigationButton,
    AuthPageLayoutTermsDescription,
    SignUpForm,
} from '@xolacekit/auth';
import { Button, Text } from '@xolacekit/ui';

import { LogoImage } from '../../../components/logo';

export default function SignUpPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <LogoImage />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>Let's get started.</AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
        Sign up to create your account.
      </AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <SignUpForm />
      </AuthPageLayoutForm>

        <AuthPageLayoutNavigationButton>
            <Text className={'text-white tracking-wider'}>Don't have an account?</Text>
            <Link className={'text-center '} href="/auth/sign-in">
                <Text className={'text-white'}>Sign In</Text>
            </Link>

        </AuthPageLayoutNavigationButton>


        <AuthPageLayoutTermsDescription>
            <Text className='text-sm text-white text-center'>By clicking Register, you acknowledge that you’ve read and agreed to our Terms and Conditions </Text>
        </AuthPageLayoutTermsDescription>
    </AuthPageLayout>
  );
}
