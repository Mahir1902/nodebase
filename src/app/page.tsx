import { caller } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {

  const users = await caller.getUsers();
  return (
    <div className="">
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      hello world
    </div>
  );
}
