"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import EditorTab from "./EditorTab";
import HistoryList from "./HistoryList";
import TableDetails from "./TableDetails";

const queryHistory = [
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
  { query: "SELECT * FROM users;", timestamp: new Date() },
];

type Props = {};

export default function NavigationTabs({}: Props) {
  const [data, setData] = useState<GridValidRowModel[]>([]);
  const [queryRuntime, setQueryRuntime] = useState<string>("");
  const [tabValue, setTabValue] = useState<string>("Editor");
  const [editorValue, setEditorValue] = useState<string>(
    "select * from categories"
  );

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
        <EditorTab
          data={data}
          queryRuntime={queryRuntime}
          editorValue={editorValue}
          setData={setData}
          setQueryRuntime={setQueryRuntime}
          setEditorValue={setEditorValue}
        />
      </TabsContent>
      <TabsContent value="Tables">
        <TableDetails
          setData={setData}
          setQueryRuntime={setQueryRuntime}
          setTabValue={setTabValue}
          setEditorValue={setEditorValue}
        />
      </TabsContent>
      <TabsContent value="History">
        <HistoryList items={queryHistory} />
      </TabsContent>
    </Tabs>
  );
}
