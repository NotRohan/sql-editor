"use client";

import { Button } from "@/components/ui/Button";
import { TABLE_NAMES } from "@/constants/constants";
import { Info } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TableDetailsProps {
  isDataLoading: boolean;
  setTabValue: Dispatch<SetStateAction<string>>;
  setEditorValue: Dispatch<SetStateAction<string>>;
  fetchTableData: (tableName: string) => Promise<void>;
}

export default function TableDetails({
  isDataLoading,
  setTabValue,
  setEditorValue,
  fetchTableData,
}: TableDetailsProps) {
  const [selectedTableName, setSelectedTableName] = useState('');

  const getDataForTableName = async (tableName: string) => {
    setSelectedTableName(tableName)
    await fetchTableData(tableName)
    setEditorValue(`select * from ${tableName}`)
    setTabValue("Editor");
  };

  return (
    <div className="pb-4 flex flex-wrap gap-5 justify-center items-center">
      {TABLE_NAMES.map((tableName, index) => {
        return (
          <Button
            disabled={isDataLoading}
            isLoading={isDataLoading && selectedTableName === tableName}
            variant="outline"
            className="relative border-0 flex justify-center items-center w-[220px] h-[100px] shadow-[0_4px_20px_rgb(0,0,0,0.12)] hover:bg-slate-50 hover:scale-105 transition-all duration-300 mb-4 p-4 rounded-lg cursor-pointer"
            onClick={() => getDataForTableName(tableName)}
            key={tableName}
          >
            <Info className="absolute right-2 top-2 w-4 h-4 cursor-help" />
            <span className="font-bold">{tableName}</span>
          </Button>
        );
      })}
    </div>
  );
}
