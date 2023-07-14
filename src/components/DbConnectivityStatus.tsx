import React from "react";
import { Database, Radio } from "lucide-react";
import { Button } from "./ui/Button";

export default function DbConnectivityStatus() {
  return (
    <div className="absolute flex items-center mt-4 right-0 mr-4 text-sm">
      <Radio className="text-lime-600 mr-2 w-5 h-5" />
      <span className="mr-2">Connected to</span>
      <Button variant='outline' size='sm'>
        <Database className="mr-2 w-4 h-4"/>
        <span>us-west-2</span>
      </Button>
    </div>
  );
}
