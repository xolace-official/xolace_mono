import { Ghost, XolaceButton } from '@xolacekit/ui';

export const AnonymousButton = () => {
  return (
    <>
      <XolaceButton
        className={'mx-auto w-2/3'}
        leftIcon={Ghost}
        iconStroke={2.75}
        label="Activate Ghost Mode"
      />
    </>
  );
};
