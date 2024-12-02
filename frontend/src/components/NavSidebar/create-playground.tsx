"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Globe, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { icons } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export function CreatePlaygroundsDialogComponent() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [environment, setEnvironment] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { user } = useUser();

  const frameworks = [
    {
      value: "javascript",
      label: "Javascript",
    },
    {
      value: "typescript",
      label: "Typescript",
    },
    {
      value: "react-javascript",
      label: "React Javascript",
    },
    {
      value: "react-typescript",
      label: "React Typescript",
    },
    {
      value: "python",
      label: "Python",
    },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let icon;

      if (environment.includes("react")) {
        icon = icons[0]?.src;
      } else if (environment === "javascript") {
        icon = icons[2]?.src;
      } else if (environment === "typescript") {
        icon = icons[1]?.src;
      } else if (environment === "python") {
        icon = icons[3]?.src;
      }

      // if (title || environment || isPrivate) {
      //   await envServiceClient.createEnv
      //     .mutate({
      //       name: title,
      //       environment,
      //       isPrivate,
      //       user: user?.emailAddresses[0]?.emailAddress as string,
      //       icon: icon as string,
      //     })
      //     .then((res) => {
      //       router.push(`/code?port=${String(res.data.ports[8000])}`);
      //     });
      // }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full font-semibold">Create</Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 leading-relaxed text-white sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-2xl">
            Create Playgrounds
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <Label
                htmlFor="environment"
                className="mb-1.5 text-xs font-normal"
              >
                Environment
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="border-none bg-zinc-800">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {environment
                      ? frameworks.find(
                          (framework) => framework.value === environment,
                        )?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="border-none bg-zinc-800">
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>Nothing..</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setEnvironment(
                                currentValue === environment
                                  ? ""
                                  : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                environment === framework.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="text-sm">Public</span>
                  </div>
                  <Switch
                    checked={!isPrivate}
                    onCheckedChange={(checked) => setIsPrivate(!checked)}
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  {isPrivate
                    ? "Only you can see this Playground"
                    : "Anyone can see this Playground"}
                </p>
              </div>
              {!isPrivate && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs"
                  onClick={() => setIsPrivate(true)}
                >
                  <Lock className="mr-1 h-3 w-3" /> Make private
                </Button>
              )}
            </div>
            <div>
              <Label htmlFor="title" className="mb-1.5 text-xs font-normal">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none bg-zinc-800"
                placeholder="Name your Environment"
              />
              <div className="mt-4 rounded-md bg-zinc-800 p-4">
                <h4 className="mb-2 text-sm font-semibold">Summary</h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span>Name</span>
                  <span>{title || ""}</span>
                  <span>Environment</span>
                  <span>
                    {environment.charAt(0).toUpperCase() + environment.slice(1)}
                  </span>
                  <span>Visibility</span>
                  <span>{isPrivate ? "Private" : "Public"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!title || !environment || loading}
          className="w-full text-black"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <h1>Creating</h1>
              <Loader2 className="h-1 w-1 animate-spin" />
            </div>
          ) : (
            "Create Playground"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
