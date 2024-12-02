"use client";

import "client-only";
import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { useEffect, useRef } from "react";
// import { getSocket } from "@/lib/getSocket";
import { useSearchParams } from "next/navigation";

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const parmas = useSearchParams();

  useEffect(() => {
    if (!terminalRef.current) return;
    // const socket = getSocket(parmas.get("port"));

    // if (socket) {
    //   console.log(`Connected to socket on port ${parmas.get("port")}`);
    //   socket.emit("terminal:write", {
    //     command: "cd /home/arch && rm -rf .git \r\n",
    //   });
    //   socket.emit("terminal:write", {
    //     command: "clear \r\n",
    //   });
    // }

    // Create terminal instance
    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "monospace",
      theme: {
        background: "#111",
      },
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Store refs
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Open terminal
    term.open(terminalRef.current);

    // Initial fit
    setTimeout(() => {
      fitAddon.fit();
      term.write("➜ ~ ");
      term.focus();
    }, 0);

    // Handle terminal container resizing
    const resizeHandler = () => {
      fitAddon.fit();
    };

    const resizeObserver = new ResizeObserver(resizeHandler);

    resizeObserver.observe(terminalRef.current);

    term.onData((e) => {
      //   socket?.emit("terminal:write", {
      //     command: e,
      //   });

      // send to backend
      term.write(e);
    });

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
    };
  }, []);

  return (
    <div className="relative flex h-full w-full flex-1 flex-col bg-[#1a1b26]">
      <style jsx global>{`
        .xterm-viewport {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        .xterm {
          padding: 8px;
          height: 100% !important;
          width: 100% !important;
        }
        .xterm-screen {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <div
        ref={terminalRef}
        className="h-full min-h-0 w-full flex-1 overflow-hidden"
      />
    </div>
  );
}
