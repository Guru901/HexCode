"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

export function CodeEditor() {
  const params = useSearchParams();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current!, {
      value: "console.log('Hello, world!')",
      language: "javascript",
      theme: "vs-dark",
      minimap: {
        enabled: false,
      },
    });

    // return () => {
    //   editor.dispose();
    // };
  }, []);

  //   useEffect(() => {
  //     const socket = getSocket(params.get("port"));

  //     socket?.on("connect", () => {
  //       console.log("connected");
  //     });
  //   }, []);

  return <div className="h-full w-full" ref={editorRef}></div>;
}
