import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-gray-500", className)}
      {...props}
    />
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-1">
      <Spinner />
      <p className="text-sm font-medium text-gray-500">Loading...</p>
    </div>
  );
}
