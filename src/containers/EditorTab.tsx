"use client";

import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import { Button } from "@/components/ui/Button";
import { Copy, Share2, PlayCircle } from "lucide-react";
import QueryResult from "./QueryResult";

export default function EditorTab() {
  const [query, setQuery] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string>("select * from categories");

  const onSubmit = () => {
    const queryAfterFrom = editorValue
      .toLowerCase()
      .slice(editorValue.indexOf("from") + "from".length);
    setQuery(queryAfterFrom.split(" ")[1]);
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
        style={{ justifyContent: "end", marginTop:'16px', marginBottom:'32px' }}
      >
        <Button variant="outline" className="mr-3" size="sm">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="mr-3" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button onClick={onSubmit}>
          <PlayCircle className="w-4 h-4 mr-2" />
          Run Query
        </Button>
      </div>
      {
        query && (
            <QueryResult query={query}/>
        )
      }
    </div>
  );
}
