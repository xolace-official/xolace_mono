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
    AnonymousButton,
} from '@xolacekit/auth';
import { Text, H1 } from '@xolacekit/ui';

//import { LogoImage } from '../../../components/logo';
import FluxSignin from "../../../components/icons/flux-signin";


export default function SignInPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <FluxSignin />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>
          <H1 className={'text-white font-black'}>Holla, </H1>
          <H1 className={'text-white font-black'}>Welcome Back</H1>
      </AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
          Welcome Back
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
