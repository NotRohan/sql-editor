import React from "react";
import useQueryData from "@/hooks/useQueryData";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@/components/ui/Button";
import { Download, Timer } from "lucide-react";

interface QueryResultProps {
  query: string;
}

export default function QueryResult({ query }: QueryResultProps) {
  const { data, error, queryRuntime } = useQueryData(query);
  const columnNames = data.length > 0 ? Object.keys(data[0]) : [];
  const columns = columnNames.map((column) => {
    return {
      field: column,
      headerName: column,
      width: 150,
    };
  });
  return (
    <div
      style={{ height: 500, width: "100%", padding: "18px 30px 18px 30px" }}
      className="bg-slate-100 rounded-md"
    >
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: "12px" }}
      >
        <h2 className="font-extrabold">Result</h2>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Timer className="w-5 h-5 text-lime-600"/>
            <span className="text-lime-600"> : {Number(queryRuntime).toFixed(2)}ms</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div style={{ height: 400 }}>
        <DataGrid rows={data} columns={columns} className="bg-white" />
      </div>
    </div>
  );
}
