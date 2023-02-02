import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { forwardRef } from 'react';

type CheckboxProps = CheckboxPrimitive.CheckboxProps;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    return (
      <CheckboxPrimitive.Root
        className="h-8 w-8 bg-zinc-900 flex items-center justify-center rounded focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 focus-within:ring-offset-zinc-800 disabled:opacity-70"
        ref={ref}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="h-6 w-6">
          <Check className="h-6 w-6 text-green-500" weight="bold" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
