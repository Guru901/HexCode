"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileItem } from "./file-items";
import { FolderItem } from "./folder-item";
// import { getSocket } from "@/lib/getSocket";
// import { convertObjectToArray } from "@/lib/converObjToArray";

export function FileSidebar() {
  const [tree, setTree] = useState<
    { name: string; type: string; id: string; children?: unknown[] }[]
  >([
    {
      name: "Home",
      type: "folder",
      id: "1",
      children: [
        {
          name: "Documents",
          type: "folder",
          id: "2",
          children: [
            {
              name: "file1.txt",
              type: "file",
              id: "3",
            },
            {
              name: "file2.txt",
              type: "file",
              id: "4",
            },
          ],
        },
        {
          name: "Pictures",
          type: "folder",
          id: "5",
          children: [
            {
              name: "file1.png",
              type: "file",
              id: "6",
            },
            {
              name: "file2.png",
              type: "file",
              id: "7",
            },
          ],
        },
      ],
    },
  ]);
  const searchParams = useSearchParams();

  //   const socket = getSocket(searchParams.get("port"));

  //   useEffect(() => {
  //     if (!socket) return;
  //     socket.emit("files:get-files");

  //     socket.on("files:get-files-response", (data) => {
  //       const convertedData = convertObjectToArray(data);
  //       setSelectedFile("");
  //       setTree(convertedData);
  //     });

  //     socket.on("file:refresh", (data) => {
  //       const convertedData = convertObjectToArray(data);
  //       setSelectedFile("");
  //       setTree(convertedData);
  //     });
  //   }, [socket]);

  function renderTree(
    files: unknown,
    level: number = 0,
    parentPath: string = "",
  ) {
    if (!Array.isArray(files)) {
      console.error("Expected 'files' to be an array, but got:", typeof files);
      return null;
    }

    return files.map((node) => {
      const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
      if (node.type === "file") {
        return (
          <FileItem
            key={node.id}
            name={node.name}
            level={level}
            inSideFolder={parentPath}
          />
        );
      } else {
        return (
          <FolderItem
            key={node.id}
            name={node.name}
            level={level}
            parentPath={parentPath}
          >
            {node.children && renderTree(node.children, level + 1, currentPath)}
          </FolderItem>
        );
      }
    });
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#111] text-white">
      <ScrollArea className="flex-grow">
        <div className="p-2">{renderTree(tree, 0, "")}</div>
      </ScrollArea>
    </div>
  );
}
