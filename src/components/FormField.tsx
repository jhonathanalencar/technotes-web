import { Slot } from '@radix-ui/react-slot';
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

interface FormFieldRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function FormFieldRoot({ children, ...rest }: FormFieldRootProps) {
  return (
    <div className="mb-4" {...rest}>
      {children}
    </div>
  );
}

interface FormFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

function FormFieldLabel({ children, ...rest }: FormFieldLabelProps) {
  return (
    <label className="text-lg md:text-xl text-gray-200 font-semibold" {...rest}>
      {children}
    </label>
  );
}

interface FormFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}

const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'input';

    return (
      <Comp
        className="w-full h-12 px-4 text-base md:text-lg font-medium text-gray-300 placeholder:text-gray-400 bg-zinc-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-800"
        ref={ref}
        {...props}
      />
    );
  }
);

interface FormFieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

function FormFieldError({ children }: FormFieldErrorProps) {
  return <p className="text-base font-medium text-red-500">{children}</p>;
}

export const FormField = {
  Root: FormFieldRoot,
  Label: FormFieldLabel,
  Input: FormFieldInput,
  Error: FormFieldError,
};
