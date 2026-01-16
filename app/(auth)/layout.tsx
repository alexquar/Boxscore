"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // if you have loading; if not, see note below
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // replace avoids back button loop
    }
  }, [loading, user, router]);

  // While auth is loading OR redirecting, render nothing (or a loader)
  if (loading) return <Loading />;
  if (!user) return <Loading />;

  return <div>{children}</div>;
}
