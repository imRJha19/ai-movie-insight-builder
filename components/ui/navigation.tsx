import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type NavigationProps = {
  title: string;
  subtitle: string;
  onHelpClick: () => void;
  className?: string;
};

export function Navigation({ title, subtitle, onHelpClick, className }: NavigationProps) {
  return (
    <header className={cn("border-b border-white/10", className)}>
      <Container className="flex items-center justify-between py-5" size="xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Cinematic Workspace</p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>

        <Button variant="secondary" size="sm" onClick={onHelpClick}>
          IMDb Help
        </Button>
      </Container>
    </header>
  );
}
