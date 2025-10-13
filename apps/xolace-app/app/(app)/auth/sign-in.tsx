import { Link } from 'expo-router';

import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
    AuthPageLayoutNavigationButton,
  SignInForm,
    AnonymousButton
} from '@xolacekit/auth';
import { Text } from '@xolacekit/ui';

import { LogoImage } from '../../../components/logo';

export default function SignInPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <LogoImage />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>Welcome Back.</AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
        Let's get you signed in.
      </AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <SignInForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutSecondaryButton>
        <AnonymousButton/>
      </AuthPageLayoutSecondaryButton>

        <AuthPageLayoutNavigationButton>
            <Text className={'text-white tracking-wider'}>Don't have an account?</Text>
                <Link className={'text-center '} href="/auth/sign-up">
                    <Text className={'text-white'}>Sign Up</Text>
                </Link>

        </AuthPageLayoutNavigationButton>
    </AuthPageLayout>
  );
}
