import { Link } from 'expo-router';

import {
  AuthPageLayout,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutNavigationButton,
  AuthPageLayoutTermsDescription,
  SignUpForm,
} from '@xolacekit/auth';
import { H1, Text } from '@xolacekit/ui';

import FluxSignup from '../../../components/icons/flux-signup';

export default function SignUpPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <FluxSignup />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>
        <H1 className={'font-black text-white'}>Hi there</H1>
      </AuthPageLayoutHeading>

      {/*<AuthPageLayoutDescription>*/}
      {/*  Sign up to create your account.*/}
      {/*</AuthPageLayoutDescription>*/}

      <AuthPageLayoutForm>
        <SignUpForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutNavigationButton>
        <Text className={'tracking-wider text-white'}>
          Already have an account?
        </Text>
        <Link className={'text-center'} href="/auth/sign-in">
          <Text className={'text-white'}>Sign In</Text>
        </Link>
      </AuthPageLayoutNavigationButton>

      <AuthPageLayoutTermsDescription>
        <Text className="text-center text-sm text-white">
          By clicking Register, you acknowledge that you’ve read and agreed to
          our Terms and Conditions{' '}
        </Text>
      </AuthPageLayoutTermsDescription>
    </AuthPageLayout>
  );
}
