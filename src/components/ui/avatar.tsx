import * as React from "react"
import { useState } from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      className
    )} 
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full object-cover",
      className
    )}
    loading="eager"
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface OptimizedAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withRipple?: boolean;
}

export function OptimizedAvatar({ 
  src, 
  alt, 
  size = 'md',
  className = '',
  withRipple = false
}: OptimizedAvatarProps) {
  const [hasError, setHasError] = useState(false);
  
  // Tamanhos para o componente de avatar
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28 md:w-32 md:h-32',
    lg: 'w-32 h-32 md:w-36 md:h-36'
  };

  // Ripple circles para o efeito de onda
  const rippleCircles = withRipple ? (
    <>
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[108%] h-[108%] rounded-full border-2 border-primary/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ripple_3s_ease-out_0s_infinite]"></div>
        <div className="absolute w-[120%] h-[120%] rounded-full border-2 border-primary/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ripple_3s_ease-out_0.5s_infinite]"></div>
        <div className="absolute w-[135%] h-[135%] rounded-full border-2 border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ripple_3s_ease-out_1s_infinite]"></div>
      </div>
    </>
  ) : null;

  const handleImageError = () => {
    setHasError(true);
    // Removing console.warn for production
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      {rippleCircles}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-muted">
        <picture>
          <source srcSet={src} type="image/webp" />
          <source srcSet={src} type="image/jpeg" />
          <img
            src={src}
            alt={alt}
            width={300}
            height={300}
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 35%'
            }}
            loading="eager"
            decoding="async"
            onError={handleImageError}
          />
        </picture>
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-lg font-semibold">{alt.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback }
