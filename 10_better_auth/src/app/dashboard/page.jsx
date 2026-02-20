"use client";
import React, { useEffect } from 'react';
import { authClient } from '@/lib/better-auth/auth-client.js';
import { redirect } from 'next/navigation';

function Dashboard() {

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession();

  useEffect(() => {
    if(!isPending && !session) {
      redirect("/");
    }
  }, [session, isPending])


  return (
    <div>Dashboard Page</div>
  )
}

export default Dashboard