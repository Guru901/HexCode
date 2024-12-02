"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function UserInfo() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-4 bg-[#111] p-3">
      {user?.imageUrl && (
        <Image
          src={user?.imageUrl}
          alt="user"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}

      <div className="overflow-hidden text-nowrap font-semibold text-white">
        {user?.username || user?.emailAddresses[0]?.emailAddress}
      </div>
    </div>
  );
}
