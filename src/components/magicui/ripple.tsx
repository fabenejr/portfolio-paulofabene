import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  intensity?: 'low' | 'medium' | 'high';
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  intensity = 'medium',
  className,
  ...props
}: RippleProps) {
  // Adjust animation properties based on intensity
  const intensitySettings = {
    low: {
      scale: 1.1,
      duration: 8,
      delay: 0.08
    },
    medium: {
      scale: 1.2,
      duration: 6,
      delay: 0.06
    },
    high: {
      scale: 1.3,
      duration: 4,
      delay: 0.04
    }
  };

  const { scale, duration, delay } = intensitySettings[intensity];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * delay}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className="absolute ripple rounded-full border bg-foreground/25 shadow-xl"
            style={{
              "--i": i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              borderStyle,
              borderWidth: "1px",
              borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
              animation: `ripple ${duration}s infinite cubic-bezier(0.65, 0, 0.35, 1)`,
              animationDelay,
            } as CSSProperties}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
