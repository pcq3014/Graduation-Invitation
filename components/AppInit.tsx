"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";

export default function AppInit() {
  useLenis();

  useEffect(() => {
    // Tắt tính năng tự khôi phục vị trí cuộn của trình duyệt.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Đưa về đầu trang ngay lập tức (không hiệu ứng) trước khi người dùng
    // kịp nhìn thấy vị trí cuộn cũ.
    window.scrollTo(0, 0);

    // Một số trình duyệt mobile khôi phục vị trí cuộn SAU khi layout đã
    // tính xong (ví dụ sau khi ảnh/video tải xong) → gọi lại lần nữa ở
    // frame kế tiếp để chắc chắn.
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}