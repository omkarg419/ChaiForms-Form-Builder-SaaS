"use client";

import { useEffect } from "react";
import{useRouter} from "next/navigation";
import { useGetLoggedInUser } from "~/hooks/api/auth";

export default  function Home() {
  
  const { user } = useGetLoggedInUser();
const router = useRouter();
console.log("User from useGetLoggedInUser hook:", user);
  useEffect(() => {


    if(user && user.id){
      router.replace("/dashboard");
    }
    else{
      router.replace("/signin");
    }
  },[user,router]);

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">ChaiForms</h1>
        <h2>{JSON.stringify(user,null,2)}</h2>

      </div>
    </main>
  );
}
