"use client";

import { LoginPage } from "@/components/skill-hub";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/app/actions/user";
import { useCallback, useEffect, useState } from "react";
import { createApiKeyService } from "@/modules/apiKey/apiKey.service";
import { genApiKey } from "@/lib/utils/genApiKey";

export default function Login() {
  const { data: session } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const onLoginSuccess = useCallback(async () => {
    try {
      if (session) {
        setIsAuthorized(true);
        const res = await createUserAction({
          username: session.user?.name || "",
          image: session.user?.image || "",
          email: session.user?.email || undefined,
        });
        console.log("=== 登录结果 ===", res);
        // 2. 创建 apiKey
        await createApiKeyService({
          userId: res.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          apiKey: genApiKey(),
        });
        router.push("/");
      }
    } catch (error) {
      console.log("=== 登录失败 ===", error);
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
      console.log("=== 登录失败 ===", error);
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
