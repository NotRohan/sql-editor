"use client";

import { Button } from "@/components/ui/Button";
import TABLE_NAMES from "@/constants/constants";
import { GridValidRowModel } from "@mui/x-data-grid";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import { Copy, Pencil, PlayCircle, Share2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import QueryResult from "./QueryResult";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface EditorTabProps {
  data: GridValidRowModel[];
  isDataLoading: boolean;
  queryRuntime: string;
  editorValue: string;
  setEditorValue: Dispatch<SetStateAction<string>>;
  fetchTableData: (tableName: string) => Promise<void>;
}

export default function EditorTab({
  data,
  isDataLoading,
  queryRuntime,
  editorValue,
  setEditorValue,
  fetchTableData,
}: EditorTabProps) {
  const onSubmit = async () => {
    const queryAfterFrom = editorValue
      .toLowerCase()
      .slice(editorValue.indexOf("from") + "from".length);
    const tableName = TABLE_NAMES.find(
      (name) => name === queryAfterFrom.split(" ")[1]
    );
    fetchTableData(tableName ?? "");
  };

  return (
    <div className="">
      <AceEditor
        className="border-2 rounded-md"
        aria-label="editor"
        mode="mysql"
        theme="github"
        name="editor"
        fontSize={16}
        minLines={15}
        maxLines={10}
        width="100%"
        showPrintMargin={false}
        showGutter
        placeholder="Run SQL queries here"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={editorValue}
        onChange={setEditorValue}
      />
      <div
        className="w-full flex items-center"
        style={{
          justifyContent: "end",
          marginTop: "16px",
          marginBottom: "32px",
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-3" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Raw SQL
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Raw SQL</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Query Builder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>AI Query Builder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="mr-3" size="sm">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="mr-3" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button onClick={onSubmit} isLoading={isDataLoading}>
          <PlayCircle className="w-4 h-4 mr-2" />
          {isDataLoading ? "Running..." : "Run Query"}
        </Button>
      </div>
      {data.length > 0 && (
        <QueryResult data={data} queryRuntime={queryRuntime} />
      )}
    </div>
  );
}
