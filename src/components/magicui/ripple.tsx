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
  mainCircleOpacity = 0.28,
  numCircles = 8,
  intensity = 'medium',
  className,
  ...props
}: RippleProps) {
  // Adjust animation properties based on intensity
  const intensitySettings = {
    low: {
      scale: 1.15,
      duration: 8,
      delay: 0.08
    },
    medium: {
      scale: 1.25,
      duration: 5,
      delay: 0.05
    },
    high: {
      scale: 1.35,
      duration: 3.5,
      delay: 0.03
    }
  };

  const { duration, delay } = intensitySettings[intensity];

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
        const opacity = mainCircleOpacity - i * 0.02;
        const animationDelay = `${i * delay}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 6;

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
