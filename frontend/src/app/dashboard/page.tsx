"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import NavSidebar from "@/components/NavSidebar/page";

export default function Home() {
  const { user } = useUser();
  const params = useSearchParams();

  const [from, setFrom] = useState<string | null>(params.get("port") || "");

  // useEffect(() => {
  //   if (from === "login") return;
  //   if (!user?.username && !user?.emailAddresses[0]?.emailAddress) return;
  //   (async () => {
  //     await saveThingsClient.saveUserInDb.mutate({
  //       username: user?.username as string,
  //       email: user?.emailAddresses[0]?.emailAddress as string,
  //       avatar: user?.imageUrl as string,
  //     });
  //   })();
  // }, [from, user]);

  return (
    <main className="min-h-[calc(100vg - 1rem)] flex w-full gap-1 bg-[#333] p-1">
      <NavSidebar />
      <div className="h-[calc(100vh-1rem)] w-full rounded-md bg-[#111]"></div>
    </main>
  );
}
