import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props}
    />
  )
}

type LoaderProps = {
  className?: string
}


export function Loader({ className = "h-screen" }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center text-4xl ${className}`}>
      <Spinner />
    </div>
  )
}