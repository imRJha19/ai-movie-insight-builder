import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "md" | "lg" | "xl";

const sizeClasses: Record<ContainerSize, string> = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

export function Container({ children, className, size = "lg" }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>{children}</div>;
}
