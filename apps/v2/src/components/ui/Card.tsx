import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  brandColor?: string;
}

export default function Card({ brandColor, className, children, style, ...props }: CardProps) {
  const borderClasses = brandColor ? 'border-l-4' : '';
  const borderStyle = brandColor ? { borderLeftColor: brandColor, ...style } : style;

  return (
    <div
      className={['bg-white rounded-lg shadow-[0_1px_3px_rgba(0,48,96,0.08)]', borderClasses, className].filter(Boolean).join(' ')}
      style={borderStyle}
      {...props}
    >
      {children}
    </div>
  );
}
