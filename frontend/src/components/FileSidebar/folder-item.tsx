import { useState } from "react";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { useFileStore } from "@/store/fileStore";
import { ContextMenu, ContextMenuContent } from "@/components/ui/context-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { ContextMenuTrigger } from "@/components/ui/context-menu";

export function FolderItem({
  name,
  level,
  children,
  parentPath,
}: {
  name: string;
  level: number;
  children: React.ReactNode;
  parentPath: string;
}) {
  const toggleFolder = (folder: string) => {
    setExpanded((prev) =>
      prev.includes(folder)
        ? prev.filter((f) => f !== folder)
        : [...prev, folder],
    );
  };

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [localNewFile, setLocalNewFile] = useState("");
  const [localNewFolder, setLocalNewFolder] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);

  const [, setNewFile] = useState("");
  const [, setNewFolder] = useState("");

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
      <Dialog open={isFolderDialogOpen} onOpenChange={handleFolderDialogClose}>
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
}