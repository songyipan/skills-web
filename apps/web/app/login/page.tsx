"use client";

import { LoginPage } from "@/components/skill-hub";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("=== 登录结果 ===", session);
      setIsAuthorized(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [session, router]);

  const handleLogin = () => {
    setIsConnecting(true);
    try {
      signIn("github");
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  return (
    <LoginPage
      onLogin={handleLogin}
      isConnecting={isConnecting}
      isAuthorized={isAuthorized}
    />
  );
}
