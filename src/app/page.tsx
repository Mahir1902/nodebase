

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { caller } from "@/trpc/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";

export default async function Home() {

  await requireAuth()

  const user = await caller.getUsers()
  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(user, null, 2)}
    </div>
  );
}
