import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "@/components/CodeEditor/page";
import { FileSidebar } from "@/components/FileSidebar/page";
import { Terminal } from "@/components/terminal/page";

export default function Code() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15}>
          <FileSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={60} minSize={20}>
              <div className="h-full w-full">
                <CodeEditor />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="h-full w-full">
                <Terminal />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="h-full w-full bg-gray-800" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
