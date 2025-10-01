import * as React from 'react';

import { TextInput } from 'react-native';

import { cn } from '../../lib/utils';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'web:flex native:h-12 web:w-full border-input bg-background web:py-2 native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 h-10 rounded-md border px-3 text-base file:border-0 file:bg-transparent file:font-medium lg:text-sm',
        props.editable === false && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
