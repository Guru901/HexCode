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
    <div>
      <NavSidebar />
    </div>
  );
}
