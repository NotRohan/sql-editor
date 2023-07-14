"use client";

import { Button } from "@/components/ui/Button";
import TABLE_NAMES from "@/constants/constants";
import { getCsvDataByTableName } from "@/data/api";
import { parseCSVData } from "@/lib/utils";
import { GridValidRowModel } from "@mui/x-data-grid";
import { Info } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TableDetailsProps {
  setData: Dispatch<SetStateAction<GridValidRowModel[]>>;
  setQueryRuntime: Dispatch<SetStateAction<string>>;
  setTabValue: Dispatch<SetStateAction<string>>;
  setEditorValue: Dispatch<SetStateAction<string>>;
}

export default function TableDetails({
  setData,
  setQueryRuntime,
  setTabValue,
  setEditorValue,
}: TableDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState('');

  const getDataForTableName = async (tableName: string) => {
    setSelectedTableName(tableName)
    setIsLoading(true);
    let t0 = performance.now();
    const response = await getCsvDataByTableName(tableName ?? "");
    let t1 = performance.now();
    const parsedData = parseCSVData(atob(response.content.replace("\n", "")));
    setIsLoading(false);
    setData(parsedData);
    setQueryRuntime((t1 - t0).toString());
    setEditorValue(`select * from ${tableName}`)
    setTabValue("Editor");
  };

  return (
    <div className="pb-4 flex flex-wrap gap-5 justify-center items-center">
      {TABLE_NAMES.map((tableName, index) => {
        return (
          <Button
            disabled={isLoading}
            isLoading={isLoading && selectedTableName === tableName}
            variant="outline"
            className="relative border-0 flex justify-center items-center w-[220px] h-[100px] shadow-[0_4px_20px_rgb(0,0,0,0.12)] hover:bg-slate-50 hover:scale-105 transition-all duration-300 mb-4 p-4 rounded-lg cursor-pointer"
            onClick={() => getDataForTableName(tableName)}
            key={tableName}
          >
            <Info className="absolute right-2 top-2 w-4 h-4" />
            <span className="font-bold">{tableName}</span>
          </Button>
        );
      })}
    </div>
  );
}
