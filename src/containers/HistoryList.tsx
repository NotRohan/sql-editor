import { Button } from "@/components/ui/Button";
import TABLE_NAMES from "@/constants/constants";
import React, { Dispatch, SetStateAction, useState } from "react";

interface HistoryListProps {
  isDataLoading: boolean;
  setTabValue: Dispatch<SetStateAction<string>>;
  setEditorValue: Dispatch<SetStateAction<string>>;
  fetchTableData: (tableName: string) => Promise<void>;
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
  isDataLoading,
  setEditorValue,
  setTabValue,
  fetchTableData,
}: HistoryListProps) => {
  const [selectedTableName, setSelectedTableName] = useState("");

  const getDataForTableName = async (tableName: string) => {
    setSelectedTableName(tableName);
    await fetchTableData(tableName)
    setEditorValue(`select * from ${tableName}`);
    setTabValue("Editor");
  };

  return (
    <div className="flex flex-col rounded-md p-5 overflow-scroll">
      {mockQueries.map((item, index) => (
        <Button
          isLoading={isDataLoading && item.tableName === selectedTableName}
          disabled={isDataLoading}
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
