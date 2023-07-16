"use client";

import { getCsvDataByTableName } from "@/data/api";
import { parseCSVData } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import { GridValidRowModel } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { useState } from "react";
import HistoryList from "./HistoryList";
import TableDetails from "./TableDetails";

const DynamicEditor = dynamic(() => import("./EditorTab"), {
  ssr: false,
});

export default function AppNavigationTabs() {
  const [data, setData] = useState<GridValidRowModel[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [queryRuntime, setQueryRuntime] = useState<string>("");
  const [tabValue, setTabValue] = useState<string>("Editor");
  const [editorValue, setEditorValue] = useState<string>(
    "select * from categories"
  );

  const fetchTableData = async (tableName: string) => {
    setIsDataLoading(true);
    let t0 = performance.now();
    const response = await getCsvDataByTableName(tableName);
    if (response.error === true) {
      // show toast here
      return;
    }
    let t1 = performance.now();
    const parsedData = parseCSVData(atob(response.response.content.replace("\n", "")));
    setData(parsedData);
    setQueryRuntime((t1 - t0).toString());
    setIsDataLoading(false);
  };

  return (
    <Tabs
      defaultValue="Editor"
      value={tabValue}
      className="max-w-4xl w-full mx-auto mt-16 pt-2"
    >
      <TabsList className="mx-auto">
        <TabsTrigger value="Editor" onClick={() => setTabValue("Editor")}>
          Editor
        </TabsTrigger>
        <TabsTrigger value="Tables" onClick={() => setTabValue("Tables")}>
          Tables
        </TabsTrigger>
        <TabsTrigger value="History" onClick={() => setTabValue("History")}>
          History
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Editor">
        <DynamicEditor
          data={data}
          isDataLoading={isDataLoading}
          queryRuntime={queryRuntime}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          fetchTableData={fetchTableData}
        />
      </TabsContent>
      <TabsContent value="Tables">
        <TableDetails
          isDataLoading={isDataLoading}
          setTabValue={setTabValue}
          setEditorValue={setEditorValue}
          fetchTableData={fetchTableData}
        />
      </TabsContent>
      <TabsContent value="History">
        <HistoryList
          isDataLoading={isDataLoading}
          setTabValue={setTabValue}
          setEditorValue={setEditorValue}
          fetchTableData={fetchTableData}
        />
      </TabsContent>
    </Tabs>
  );
}
