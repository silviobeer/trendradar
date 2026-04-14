import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-rollover',
  secondary: 'bg-bg-warm-medium text-primary hover:bg-button-medium',
  ghost: 'bg-transparent text-primary border border-primary hover:bg-primary-10',
};

const baseClasses =
  'rounded-md px-6 py-2.5 font-normal text-nav transition-colors cursor-pointer inline-flex items-center justify-center';

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[baseClasses, variantClasses[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
