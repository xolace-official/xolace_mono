import { Link } from 'expo-router';

import {
  AnonymousButton,
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutNavigationButton,
  AuthPageLayoutSecondaryButton,
  SignInForm,
} from '@xolacekit/auth';
import { H1, Text } from '@xolacekit/ui';

//import { LogoImage } from '../../../components/logo';
import FluxSignin from '../../../components/icons/flux-signin';

export default function SignInPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <FluxSignin />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>
        <H1 className={'font-black text-white'}>Holla, </H1>
        <H1 className={'font-black text-white'}>Welcome Back</H1>
      </AuthPageLayoutHeading>

      <AuthPageLayoutDescription>Welcome Back</AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <SignInForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutSecondaryButton>
        <AnonymousButton />
      </AuthPageLayoutSecondaryButton>

      <AuthPageLayoutNavigationButton>
        <Text className={'tracking-wider text-white'}>
          Don't have an account?
        </Text>
        <Link className={'text-center'} href="/auth/sign-up">
          <Text className={'text-white'}>Sign Up</Text>
        </Link>
      </AuthPageLayoutNavigationButton>
    </AuthPageLayout>
  );
}
