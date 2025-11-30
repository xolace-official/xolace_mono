import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useSignUpWithEmailAndPassword } from '@xolacekit/supabase';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Check,
  InputField,
  LockKeyhole,
  Mail,
  Text,
  UserRoundPen,
  XolaceButton,
  toast,
} from '@xolacekit/ui';

import { useCreateDeepLink } from '../lib/deep-links';
import { EmailPasswordSchema } from '../lib/schema';

export function SignUpEmailPassword() {
  const form = useForm({
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const signUpMutation = useSignUpWithEmailAndPassword({
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const deepLink = useCreateDeepLink();

  if (signUpMutation.isSuccess) {
    return <SuccessMessage />;
  }

  const onSubmit = form.handleSubmit(async (data) => {
    await signUpMutation.mutateAsync({
      email: data.email,
      password: data.password,
      emailRedirectTo: deepLink,
    });
  });

  return (
    <View className={'flex-col justify-center'}>
      <View
        className={
          'mb-4 flex-col justify-center gap-4 rounded-[14px] bg-white px-8 py-12'
        }
      >
        <View>
          <Text
            className={'text-auth-text mb-1 text-4xl font-bold tracking-widest'}
          >
            Sign Up
          </Text>

          <View className={'bg-auth-background h-[1px] w-24'} />
        </View>

        <View>
          <Controller
            control={form.control}
            name={'username'}
            render={({ field }) => (
              <InputField
                inputMode={'text'}
                placeholder="Dont use your real name"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                label={'Username'}
                inputStyle="bg-white text-black pl-2"
                labelStyle="text-auth-text"
                icon={UserRoundPen}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <InputField
                inputMode={'email'}
                placeholder="demo@gmail.com"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                label={'Email'}
                icon={Mail}
                inputStyle="bg-white text-black pl-2"
                labelStyle="text-auth-text"
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
                placeholder={'enter your password'}
                secureTextEntry
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                label={'Password'}
                icon={LockKeyhole}
                inputStyle="bg-white text-black pl-2"
                labelStyle="text-auth-text"
              />
            )}
          />
        </View>
      </View>

      <View>
        <XolaceButton
          label={'Register'}
          className={'mx-auto mb-5 w-[160px]'}
          disabled={signUpMutation.isPending}
          onPress={onSubmit}
        />

        {/*<Button*/}
        {/*  size={'lg'}*/}
        {/*  disabled={signUpMutation.isPending}*/}
        {/*  onPress={onSubmit}*/}
        {/*>*/}
        {/*  <Text>Create Account</Text>*/}
        {/*</Button>*/}
      </View>
    </View>
  );
}

function SuccessMessage() {
  return (
    <View>
      <Alert className={'m-4'}>
        <AlertIcon
          className={'rounded-full border-8 border-green-100 bg-green-500 p-2'}
        >
          <Check className={'h-14 w-14 text-white'} />
        </AlertIcon>

        <AlertTitle>We have sent you an email.</AlertTitle>

        <AlertDescription>
          Please verify your email address to complete your registration.
        </AlertDescription>
      </Alert>
    </View>
  );
}
