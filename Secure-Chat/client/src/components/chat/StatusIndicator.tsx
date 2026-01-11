import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusIndicator({ status, size = 'md', className }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const statusClasses = {
    online: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    away: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    offline: 'bg-zinc-500'
  };

  return (
    <span
      data-testid={`status-indicator-${status}`}
      className={cn(
        "rounded-full border-2 border-black",
        sizeClasses[size],
        statusClasses[status],
        className
      )}
    />
  );
}
