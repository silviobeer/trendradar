export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[780px] px-6 py-12">
      {children}
    </div>
  );
}

export function SectionDivider() {
  return <hr className="my-10 border-t border-primary-60/30" />;
}
