const errorsMap = {
  'Invalid login credentials': 'The credentials entered are invalid',
  'User already registered':
    'This credential is already in use. Please try with another one.',
  'Email not confirmed': 'Please confirm your email address before signing in',
  'New password should be different from the old password.':
    'The new password should be different from the old password',
  default:
    'We have encountered an error. Please ensure you have a working internet connection and try again',
  generic: "Sorry, we weren't able to authenticate you. Please try again.",
  link: 'Sorry, we encountered an error while sending your link. Please try again.',
  codeVerifierMismatch:
    "It looks like you're trying to sign in using a different browser than the one you used to request the sign in link. Please try again using the same browser.",
  minPasswordLength: 'Password must be at least 8 characters long',
  passwordsDoNotMatch: 'The passwords do not match',
  minPasswordNumbers: 'Password must contain at least one number',
  minPasswordSpecialChars:
    'Password must contain at least one special character',
  uppercasePassword: 'Password must contain at least one uppercase letter',
  insufficient_aal:
    'Please sign-in with your current multi-factor authentication to perform this action',
} as const;

export function AuthError({ error }: { error: unknown }) {
  return getErrorMessage(error);
}

function getErrorMessage(error: unknown) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (errorMessage as string) in errorsMap
    ? errorsMap[errorMessage as keyof typeof errorsMap]
    : errorsMap.default;
}
