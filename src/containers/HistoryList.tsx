import { Button } from "@/components/ui/Button";
import TABLE_NAMES from "@/constants/constants";
import { getCsvDataByTableName } from "@/data/api";
import { parseCSVData } from "@/lib/utils";
import { GridValidRowModel } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useState } from "react";

interface QueryHistory {
  query: string;
  timestamp: Date;
}

interface HistoryListProps {
  setData: Dispatch<SetStateAction<GridValidRowModel[]>>;
  setQueryRuntime: Dispatch<SetStateAction<string>>;
  setTabValue: Dispatch<SetStateAction<string>>;
  setEditorValue: Dispatch<SetStateAction<string>>;
}

const mockQueryForTables = TABLE_NAMES.map((tableName) => {
  return {
    query: `select * from ${tableName}`,
    timestamp: new Date(),
    tableName: tableName,
  };
});

const mockQueries = [
  ...mockQueryForTables,
  ...mockQueryForTables,
  ...mockQueryForTables,
];

const HistoryList = ({
  setData,
  setEditorValue,
  setQueryRuntime,
  setTabValue,
}: HistoryListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState("");

  const getDataForTableName = async (tableName: string) => {
    setSelectedTableName(tableName);
    setIsLoading(true);
    let t0 = performance.now();
    const response = await getCsvDataByTableName(tableName ?? "");
    let t1 = performance.now();
    const parsedData = parseCSVData(atob(response.content.replace("\n", "")));
    setIsLoading(false);
    setData(parsedData);
    setQueryRuntime((t1 - t0).toString());
    setEditorValue(`select * from ${tableName}`);
    setTabValue("Editor");
  };

  return (
    <div className="flex flex-col rounded-md p-5 overflow-scroll">
      {mockQueries.map((item, index) => (
        <Button
          isLoading={isLoading && item.tableName === selectedTableName}
          disabled={isLoading}
          variant="outline"
          onClick={() => getDataForTableName(item.tableName)}
          size="lg"
          className="border-0 p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300 rounded-lg bg-white shadow-sm"
          key={index}
        >
          <div className="w-full flex items-center justify-between">
            <p className="truncate mr-2">{item.query}</p>
            <p className="text-gray-500 truncate">
              {item.timestamp.toUTCString()}
            </p>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default HistoryList;
