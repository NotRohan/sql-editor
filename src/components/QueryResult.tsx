"use client";

import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { TABLE_COLUMN_WIDTH } from "@/constants/constants";
import { GridValidRowModel } from "@mui/x-data-grid";
import { Download, Timer } from "lucide-react";

interface QueryResultProps {
  data: GridValidRowModel[];
  queryRuntime: string;
}

export default function QueryResult({ data, queryRuntime }: QueryResultProps) {
  const columnNames = data.length > 0 ? Object.keys(data[0]) : [];
  const columns = columnNames.map((column) => {
    return {
      field: column,
      headerName: column,
      width: TABLE_COLUMN_WIDTH,
    };
  });

  return (
    <div className="bg-slate-100 rounded-md w-full px-7 py-7">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-extrabold">Result</h2>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Timer className="w-5 h-5 text-lime-600 mr-[1px] mb-[3px]" />
            <span className="text-lime-600">
              : {Number(queryRuntime).toFixed(2)}ms
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div>
        <Table rows={data} columns={columns} className="bg-white" />
      </div>
    </div>
  );
}
