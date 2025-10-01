import { Link } from 'expo-router';

import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
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

      <AuthPageLayoutSecondaryButton>
        <Button variant={'link'} asChild>
          <Link className={'text-center'} href="/auth/sign-in">
            <Text>Already have an Account? Sign In.</Text>
          </Link>
        </Button>
      </AuthPageLayoutSecondaryButton>
    </AuthPageLayout>
  );
}
