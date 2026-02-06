"use client";

import { LoginPage } from "@/components/skill-hub";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/app/actions/user";
import { useCallback, useEffect, useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();


  const onLoginSuccess = useCallback( async () => {
    if (session) {
      setIsAuthorized(true);
      const res = await createUserAction({ username: session.user?.name || "", image: session.user?.image || "", email: session.user?.email || undefined });
      console.log("=== 创建用户结果 ===", res);
      router.push("/");
    }
  }, [session, router]);


  useEffect(() => {
    onLoginSuccess();
  }, [onLoginSuccess]);

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
