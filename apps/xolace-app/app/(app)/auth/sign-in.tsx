import { Link } from 'expo-router';

import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
  SignInForm,
} from '@xolacekit/auth';
import { Button, Text } from '@xolacekit/ui';

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
        <Button variant={'link'} asChild>
          <Link className={'text-center'} href="/auth/sign-up">
            <Text>Create an Account</Text>
          </Link>
        </Button>
      </AuthPageLayoutSecondaryButton>
    </AuthPageLayout>
  );
}
