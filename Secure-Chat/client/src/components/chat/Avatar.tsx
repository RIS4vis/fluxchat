import { cn } from "@/lib/utils";
import { StatusIndicator } from "./StatusIndicator";

interface AvatarProps {
  src: string;
  alt: string;
  status?: 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

export function Avatar({ 
  src, 
  alt, 
  status = 'offline', 
  size = 'md', 
  showStatus = true,
  className 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const statusSizes: Record<string, 'sm' | 'md' | 'lg'> = {
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'lg'
  };

  const statusPositions = {
    sm: 'bottom-0 right-0',
    md: 'bottom-0 right-0',
    lg: 'bottom-0.5 right-0.5',
    xl: 'bottom-1 right-1'
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden bg-zinc-800 ring-2 ring-zinc-800",
          sizeClasses[size]
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          data-testid="avatar-image"
        />
      </div>
      {showStatus && (
        <div className={cn("absolute", statusPositions[size])}>
          <StatusIndicator status={status} size={statusSizes[size]} />
        </div>
      )}
    </div>
  );
}
