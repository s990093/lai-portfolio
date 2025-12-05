import AnimatedContainer from "./AnimatedContainer";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <AnimatedContainer className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
        {title}
      </h2>
      {subtitle && (
        <div className="mt-2 flex justify-center items-center gap-2">
          <div className="h-[1px] w-12 bg-neon-blue/50"></div>
          <p className="text-muted-foreground font-mono text-sm">{subtitle}</p>
          <div className="h-[1px] w-12 bg-neon-blue/50"></div>
        </div>
      )}
    </AnimatedContainer>
  );
}
