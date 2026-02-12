import { getWebInfoService } from "@/modules/webInfo/webInfo.service";
import { useCallback, useState } from "react";
import { WebsiteInfo } from "@repo/db";

export const useGetWebInfo = () => {
  const [webInfo, setWebInfo] = useState<WebsiteInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const getWebInfo = useCallback(async (name: string) => {
    setLoading(true);
    const info = await getWebInfoService(name);
    setWebInfo(info);
    setLoading(false);
  }, []);

  return {
    webInfo,
    loading,
    getWebInfo,
  };
};
