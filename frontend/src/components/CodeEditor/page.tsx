"use client";

// import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";

export function CodeEditor() {
  // const params = useSearchParams();

  //   useEffect(() => {
  //     const socket = getSocket(params.get("port"));

  //     socket?.on("connect", () => {
  //       console.log("connected");
  //     });
  //   }, []);

  return (
    <Editor
      theme="vs-dark"
      defaultValue="console.log('Hello, world!');"
      defaultLanguage="javascript"
      options={{
        padding: {
          top: 10,
        },
      }}
    />
  );
}
