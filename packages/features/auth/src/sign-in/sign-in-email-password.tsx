import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useSignInWithEmailPassword } from '@xolacekit/supabase';
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  InputField,
  LockKeyhole,
  Mail,
  Text,
  X,
  XolaceButton,
} from '@xolacekit/ui';

import { EmailPasswordSchema } from '../lib/schema';
import { AuthError } from '../shared/auth-error';

export function SignInEmailPassword() {
  const form = useForm({
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = useSignInWithEmailPassword();

  if (signIn.error) {
    return (
      <View className={'flex-col justify-center'}>
        <ErrorMessage error={signIn.error} onReset={() => signIn.reset()} />
      </View>
    );
  }

  return (
    <View className={'flex-col justify-center'}>
      <View
        className={
          'mb-4 flex-col justify-center gap-4 rounded-[14px] bg-white p-8'
        }
      >
        <View>
          <Text className={'mb-1 text-4xl font-bold tracking-widest'}>
            Sign In
          </Text>

          <View className={'h-[1px] w-24 bg-[#4F041D]'} />
        </View>

        <View>
          <Controller
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <InputField
                inputMode={'email'}
                placeholder="Email"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                label={'Email'}
                icon={Mail}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={form.control}
            name={'password'}
            render={({ field }) => (
              <InputField
                secureTextEntry
                placeholder={'enter your password'}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                label={'Password'}
                icon={LockKeyhole}
              />
            )}
          />

          <Link className={'my-4'} href="/auth/password-reset">
            <Text className={'text-muted-foreground text-sm'}>
              Forgot your password?
            </Text>
          </Link>
        </View>
      </View>

      <View className={'mx-auto mb-2'}>
        <XolaceButton
          label={'Sign In'}
          className={'mb-5 w-[160px]'}
          disabled={signIn.isPending}
          onPress={form.handleSubmit((data) => {
            signIn.mutate({
              email: data.email,
              password: data.password,
            });
          })}
        />

        <Text className="mb-5 text-sm tracking-wider text-white">
          Your Community Awaits You.
        </Text>
        {/*<Button*/}
        {/*  size={'lg'}*/}
        {/*  className={'w-full'}*/}
        {/*  disabled={signIn.isPending}*/}
        {/*  onPress={form.handleSubmit((data) => {*/}
        {/*    signIn.mutate({*/}
        {/*      email: data.email,*/}
        {/*      password: data.password,*/}
        {/*    });*/}
        {/*  })}*/}
        {/*>*/}
        {/*  <Text>Sign in</Text>*/}
        {/*</Button>*/}
      </View>
    </View>
  );
}

function ErrorMessage(props: { error: unknown; onReset: () => void }) {
  return (
    <Alert className={'m-4'}>
      <AlertIcon className="rounded-full border-8 border-red-100 bg-red-500 p-2">
        <X className={'h-14 w-14 text-white'} />
      </AlertIcon>

      <AlertTitle>Sorry, we couldn't sign you in.</AlertTitle>

      <AlertDescription>
        <AuthError error={props.error} />
      </AlertDescription>

      <AlertActions>
        <Button className={'mx-4'} variant={'outline'} onPress={props.onReset}>
          <Text>Try again</Text>
        </Button>
      </AlertActions>
    </Alert>
  );
}
