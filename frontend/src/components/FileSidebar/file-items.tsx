import { useFileStore } from "@/store/fileStore";
import { useState } from "react";
import { File } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FileItem({
  name,
  level,
  inSideFolder,
}: {
  name: string;
  level: number;
  inSideFolder: string;
}) {
  const { selectedFile, setSelectedFile } = useFileStore();
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [localNewFile, setLocalNewFile] = useState("");
  const [localNewFolder, setLocalNewFolder] = useState("");
  const [, setNewFile] = useState("");
  const [, setNewFolder] = useState("");

  const absolutePath = inSideFolder ? `${inSideFolder}/${name}` : name;
  const isSelected = selectedFile === absolutePath;

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
              isSelected ? "bg-gray-700" : ""
            } cursor-pointer hover:bg-gray-700`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => {
              setSelectedFile(absolutePath);
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
}
