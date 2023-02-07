import { ButtonHTMLAttributes, cloneElement } from 'react';

interface DashboardNavButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

export function DashboardNavButton({
  icon,
  ...props
}: DashboardNavButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex rounded focus-highlight group"
      {...props}
    >
      {cloneElement(icon, {
        className:
          'text-gray-300 h-8 w-8 md:w-10 md:h-10 hover:text-gray-400 group-focus:text-gray-400 transition-colors duration-200',
      })}
    </button>
  );
}
