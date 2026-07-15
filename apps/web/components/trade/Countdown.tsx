"use client";

import { useEffect, useState } from "react";
import { formatCountdown, getTimeRemaining } from "@/lib/stellar";

export function Countdown({ deadline }: { deadline: number }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <span className={remaining.isExpired ? "text-danger" : "text-text"}>
      {formatCountdown(remaining)}
    </span>
  );
}
