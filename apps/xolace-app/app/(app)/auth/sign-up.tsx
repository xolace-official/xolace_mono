import { Link } from 'expo-router';

import {
    AuthPageLayout,
    AuthPageLayoutForm,
    AuthPageLayoutHeading,
    AuthPageLayoutLogo, AuthPageLayoutNavigationButton,
    AuthPageLayoutTermsDescription,
    SignUpForm,
} from '@xolacekit/auth';
import { Text, H1 } from '@xolacekit/ui';

import FluxSignup from "../../../components/icons/flux-signup";

export default function SignUpPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
          <FluxSignup />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>
          <H1 className={'text-white font-black'}>
              Hi there
          </H1>
      </AuthPageLayoutHeading>

      {/*<AuthPageLayoutDescription>*/}
      {/*  Sign up to create your account.*/}
      {/*</AuthPageLayoutDescription>*/}

      <AuthPageLayoutForm>
        <SignUpForm />
      </AuthPageLayoutForm>

        <AuthPageLayoutNavigationButton>
            <Text className={'text-white tracking-wider'}>Already have an account?</Text>
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
