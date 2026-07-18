"use client";

import { useEffect, useState } from "react";
import { CountdownValue } from "@/types";

function computeCountdown(targetDate: Date): CountdownValue {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isFinished: false };
}

// Giá trị mặc định dùng cho lần render đầu tiên (SSR và client hydrate phải
// khớp nhau tuyệt đối) - số thật sẽ được tính ngay sau khi mount ở client.
const PLACEHOLDER: CountdownValue = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isFinished: false,
};

export function useCountdown(targetDateISO: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(PLACEHOLDER);

  useEffect(() => {
    const target = new Date(targetDateISO);

    // Tính ngay lần đầu sau khi mount (chỉ chạy ở client).
    setValue(computeCountdown(target));

    const interval = setInterval(() => {
      setValue(computeCountdown(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateISO]);

  return value;
}
