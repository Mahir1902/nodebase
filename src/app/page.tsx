'use client'

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { caller } from "@/trpc/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default  function Home() {

  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const {data: workflows} = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
    }
  }
  ))
  
  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-4">
      protected page
      <div>

      {JSON.stringify(workflows, null, 2)}
      </div>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>Create Workflow</Button>
      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </div>
  );
}
