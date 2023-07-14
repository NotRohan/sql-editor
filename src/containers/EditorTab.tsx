'use client'

import { Button } from "@/components/ui/Button";
import TABLE_NAMES from "@/constants/constants";
import { getCsvDataByTableName } from "@/data/api";
import { parseCSVData } from "@/lib/utils";
import { GridValidRowModel } from "@mui/x-data-grid";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import { Copy, PlayCircle, Share2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import QueryResult from "./QueryResult";

interface EditorTabProps {
  data: GridValidRowModel[];
  queryRuntime: string;
  editorValue: string;
  setData: Dispatch<SetStateAction<GridValidRowModel[]>>;
  setQueryRuntime: Dispatch<SetStateAction<string>>;
  setEditorValue: Dispatch<SetStateAction<string>>;
}

export default function EditorTab({
  data,
  queryRuntime,
  editorValue,
  setData,
  setQueryRuntime,
  setEditorValue,
}: EditorTabProps) {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);


  const onSubmit = async () => {
    const queryAfterFrom = editorValue
      .toLowerCase()
      .slice(editorValue.indexOf("from") + "from".length);
    const tableName = TABLE_NAMES.find(
      (name) => name === queryAfterFrom.split(" ")[1]
    );
    setIsDataLoading(true);
    let t0 = performance.now();
    const response = await getCsvDataByTableName(tableName ?? "");
    let t1 = performance.now();
    setIsDataLoading(false);
    const parsedData = parseCSVData(atob(response.content.replace("\n", "")));
    setData(parsedData);
    setQueryRuntime((t1 - t0).toString());
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
