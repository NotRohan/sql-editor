import React from "react";

interface QueryHistory {
  query: string;
  timestamp: Date;
}

interface HistoryListProps {
  items: QueryHistory[];
}

const HistoryList = ({ items }: HistoryListProps) => {
  return (
    <div className="flex" style={{ flexDirection: "column" }}>
      {items.map((item, index) => (
        <div className="flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300 justify-between border rounded-lg bg-white shadow-sm" key={index}>
            <p className="">{item.query}</p>
            <p className="text-gray-500">{item.timestamp.toUTCString()}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
