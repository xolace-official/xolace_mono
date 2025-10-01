import { View } from 'react-native';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@xolacekit/ui';

import { UpdateEmailForm } from './update-email-form';
import { UpdatePasswordForm } from './update-password-form';

export function UpdateAccountContainer() {
  return (
    <View className={'flex-col justify-center gap-4'}>
      <UpdateEmailFormContainer />
      <UpdatePasswordFormContainer />
    </View>
  );
}

function UpdateEmailFormContainer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your email</CardTitle>

        <CardDescription>
          Update your email. After updating your email, please verify it by
          clicking the link in the email we sent you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateEmailForm />
      </CardContent>
    </Card>
  );
}

function UpdatePasswordFormContainer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your password</CardTitle>

        <CardDescription>
          Update your password. After updating your password, please verify it
          by clicking the link in the email we sent you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}
