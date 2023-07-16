import React from "react";
import { Database, Plus, Radio, X } from "lucide-react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export default function DbConnectivityStatus() {
  return (
    <div className="absolute flex items-center mt-4 right-0 mr-4 text-sm">
      <Radio className="text-lime-600 mr-2 w-5 h-5" />
      <span className="mr-2">Connected to</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Database className="mr-2 w-4 h-4" />
            <span>us-west-2</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><Plus className="mr-2 w-4 h-4"/>New Database Connection</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><X className="mr-2 w-4 h-4"/>Close Connection</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
