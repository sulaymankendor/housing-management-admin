import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisIcon from "../svgs/EllipsisIcon";
import { useRouter } from "next/navigation";

export function LandlordActions() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="size-8 p-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-full shadow-none border-none"
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            router.push("/");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
