"use client";

import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
// import { useFileStore } from "@/store/fileStore";
// import { getSocket } from "@/lib/getSocket";
// import { convertObjectToArray } from "@/lib/converObjToArray";

export function FileSidebar() {
  const [tree, setTree] = useState<unknown>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  // const { selectedFile, setSelectedFile } = useFileStore();
  const [, setNewFile] = useState("");
  const [, setNewFolder] = useState("");

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

  const toggleFolder = (folder: string) => {
    setExpanded((prev) =>
      prev.includes(folder)
        ? prev.filter((f) => f !== folder)
        : [...prev, folder],
    );
  };

  const FileItem = ({
    name,
    level,
    inSideFolder,
  }: {
    name: string;
    level: number;
    inSideFolder: string;
  }) => {
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
    const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
    const [localNewFile, setLocalNewFile] = useState("");
    const [localNewFolder, setLocalNewFolder] = useState("");
    const absolutePath = inSideFolder ? `${inSideFolder}/${name}` : name;
    // const isSelected = selectedFile === absolutePath;

    const handleFileDialogClose = (open: boolean) => {
      if (!open) {
        setNewFile(localNewFile);
        setLocalNewFile("");
      }
      setIsFileDialogOpen(open);
    };

    const handleFolderDialogClose = (open: boolean) => {
      if (!open) {
        setNewFolder(localNewFolder);
        setLocalNewFolder("");
      }
      setIsFolderDialogOpen(open);
    };

    return (
      <>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={`flex items-center gap-2 px-2 py-1 ${
                false ? "bg-gray-700" : ""
              } cursor-pointer hover:bg-gray-700`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => {
                // setSelectedFile(absolutePath);
              }}
            >
              <File className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">{name}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-[#111]">
            <ContextMenuItem onSelect={() => setIsFileDialogOpen(true)}>
              Create a file
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => setIsFolderDialogOpen(true)}>
              Create a folder
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <Dialog open={isFileDialogOpen} onOpenChange={handleFileDialogClose}>
          <DialogContent className="bg-zinc-900 text-white sm:max-w-[350px]">
            <DialogHeader>
              <DialogTitle>Create a File</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  placeholder="Enter a name"
                  value={localNewFile}
                  onChange={(e) => setLocalNewFile(e.target.value)}
                />
              </div>
              <Button
                size={"sm"}
                className="h-8 w-min px-[1rem] py-0"
                // onClick={() => {
                //   socket?.emit("file:create-file", {
                //     path: absolutePath,
                //     type: "file",
                //     name: localNewFile,
                //   });
                //   setLocalNewFile("");
                //   setIsFileDialogOpen(false);
                // }}
              >
                Create
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isFolderDialogOpen}
          onOpenChange={handleFolderDialogClose}
        >
          <DialogContent className="bg-zinc-900 text-white sm:max-w-[350px]">
            <DialogHeader>
              <DialogTitle>Create a Folder</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  placeholder="Enter a name"
                  value={localNewFolder}
                  onChange={(e) => setLocalNewFolder(e.target.value)}
                />
              </div>
              <Button
                size={"sm"}
                className="h-8 w-min px-[1rem] py-0"
                // onClick={() => {
                //   socket?.emit("file:create-folder", {
                //     path: absolutePath,
                //     type: "file",
                //     name: localNewFolder,
                //   });
                //   setLocalNewFolder("");
                //   setIsFolderDialogOpen(false);
                // }}
              >
                Create
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const FolderItem = ({
    name,
    level,
    children,
    parentPath,
  }: {
    name: string;
    level: number;
    children: React.ReactNode;
    parentPath: string;
  }) => {
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
    const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
    const [localNewFile, setLocalNewFile] = useState("");
    const [localNewFolder, setLocalNewFolder] = useState("");
    const isExpanded = expanded.includes(name);
    const absolutePath = parentPath ? `${parentPath}/${name}` : name;

    const handleFileDialogClose = (open: boolean) => {
      if (!open) {
        setNewFile(localNewFile);
        setLocalNewFile("");
      }
      setIsFileDialogOpen(open);
    };

    const handleFolderDialogClose = (open: boolean) => {
      if (!open) {
        setNewFolder(localNewFolder);
        setLocalNewFolder("");
      }
      setIsFolderDialogOpen(open);
    };

    return (
      <>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-700"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => {
                toggleFolder(name);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Folder className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{name}</span>
            </div>
            {isExpanded && children}
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-[#111]">
            <ContextMenuItem onSelect={() => setIsFileDialogOpen(true)}>
              Create a file
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => setIsFolderDialogOpen(true)}>
              Create a folder
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <Dialog open={isFileDialogOpen} onOpenChange={handleFileDialogClose}>
          <DialogContent className="bg-zinc-900 text-white sm:max-w-[350px]">
            <DialogHeader>
              <DialogTitle>Create a File</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  placeholder="Enter a name"
                  value={localNewFile}
                  onChange={(e) => setLocalNewFile(e.target.value)}
                />
              </div>
              <Button
                size={"sm"}
                className="h-8 w-min px-[1rem] py-0"
                // onClick={() => {
                //   socket?.emit("file:create-file", {
                //     path: absolutePath,
                //     type: "folder",
                //     name: localNewFile,
                //   });
                //   setLocalNewFile("");
                //   setIsFileDialogOpen(false);
                // }}
              >
                Create
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isFolderDialogOpen}
          onOpenChange={handleFolderDialogClose}
        >
          <DialogContent className="bg-zinc-900 text-white sm:max-w-[350px]">
            <DialogHeader>
              <DialogTitle>Create a Folder</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  placeholder="Enter a name"
                  value={localNewFolder}
                  onChange={(e) => setLocalNewFolder(e.target.value)}
                />
              </div>
              <Button
                size={"sm"}
                className="h-8 w-min px-[1rem] py-0"
                // onClick={() => {
                //   socket?.emit("file:create-folder", {
                //     path: absolutePath,
                //     type: "folder",
                //     name: localNewFolder,
                //   });
                //   setLocalNewFolder("");
                //   setIsFolderDialogOpen(false);
                // }}
              >
                Create
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderTree = (
    files: unknown,
    level: number = 0,
    parentPath: string = "",
  ) => {
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
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#111] text-white">
      <ScrollArea className="flex-grow">
        <div className="p-2">{renderTree(tree, 0, "")}</div>
      </ScrollArea>
    </div>
  );
}
