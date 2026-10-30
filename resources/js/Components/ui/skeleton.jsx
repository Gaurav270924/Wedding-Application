import * as React from "react";
import { cn } from "@/Utils/utils.js";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-accent/30", className)}
      {...props}
    />
  );
}

export { Skeleton };
