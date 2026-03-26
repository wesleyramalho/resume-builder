interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`font-sans font-bold uppercase tracking-widest text-xs text-text-subtle ${className}`}>
      {children}
    </h2>
  );
}
