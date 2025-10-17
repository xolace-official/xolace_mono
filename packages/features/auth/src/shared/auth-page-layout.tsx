import React from 'react';

import { View } from 'react-native';

import { Text } from '@xolacekit/ui';

export function AuthPageLayout(props: React.PropsWithChildren) {
  const childrenArray = React.Children.toArray(props.children);

  const childrenByType = {
    logo: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthPageLayoutLogo,
    ),
    logoSignIn: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthPageLayoutLogoSignIn,
    ),
    form: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthPageLayoutForm,
    ),
    formHeading: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthPageLayoutHeading,
    ),
    formDescription: childrenArray.find(
      (child) =>
        React.isValidElement(child) && child.type === AuthPageLayoutDescription,
    ),
    secondaryActionButton: childrenArray.find(
      (child) =>
        React.isValidElement(child) &&
        child.type === AuthPageLayoutSecondaryButton,
    ),
    AuthNavigationButton: childrenArray.find(
      (child) =>
        React.isValidElement(child) &&
        child.type === AuthPageLayoutNavigationButton,
    ),
    AuthTermsDescription: childrenArray.find(
      (child) =>
        React.isValidElement(child) &&
        child.type === AuthPageLayoutTermsDescription,
    ),
  };

  return (
    <View className={'w-full flex-1 gap-4 bg-[#4F041D] px-2'}>
      <View className={'absolute right-5 top-3'}>{childrenByType.logo}</View>

      <View className={'absolute left-10 top-3'}>
        {childrenByType.logoSignIn}
      </View>

      <View className={'top-24 mt-20 px-4'}>
        {childrenByType.formHeading}
        {/*<H1 className={'text-white font-black'}>{childrenByType.formDescription}</H1>*/}
      </View>

      <View className={'top-24'}>{childrenByType.form}</View>

      <View className={'top-24 px-8'}>
        {childrenByType.secondaryActionButton}
      </View>

      <View
        className={'top-24 flex flex-row items-center justify-center gap-1'}
      >
        {childrenByType.AuthNavigationButton}
      </View>

      <View className={'top-24 flex flex-row items-center justify-center'}>
        {childrenByType.AuthTermsDescription}
      </View>
    </View>
  );
}

export function AuthPageLayoutLogo(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutLogoSignIn(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutForm(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutHeading(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutDescription(props: React.PropsWithChildren) {
  return (
    <Text className={'text-muted-foreground font-normal'}>
      {props.children}
    </Text>
  );
}

export function AuthPageLayoutSecondaryButton(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutNavigationButton(props: React.PropsWithChildren) {
  return props.children;
}

export function AuthPageLayoutTermsDescription(props: React.PropsWithChildren) {
  return props.children;
}
