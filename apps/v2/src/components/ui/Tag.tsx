import Link from 'next/link';

interface TagProps {
  variant: 'handlungsfeld' | 'megatrend';
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<TagProps['variant'], string> = {
  handlungsfeld: 'bg-primary-10 text-primary',
  megatrend: 'bg-primary-20 text-primary',
};

export default function Tag({ variant, href, children }: TagProps) {
  const classes = `inline-block text-tag font-normal rounded-full px-3 py-0.5 ${variantClasses[variant]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
