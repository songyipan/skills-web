import { useCallback,useState } from "react";

import { ActivityRecord,Skill } from "../types";

export function useActivityLog() {
  const [logs, setLogs] = useState<ActivityRecord[]>([]);

  const addLog = useCallback((skill: Skill, status: "success" | "failed") => {
    const newLog: ActivityRecord = {
      id: Math.random().toString(36).substr(2, 9),
      skillId: skill.id,
      skillName: skill.id,
      timestamp: new Date(),
      status,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 20));
  }, []);

  return { logs, addLog };
}
