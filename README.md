# 🎓 Thiệp Mời Tốt Nghiệp — Nguyễn Thị Thủy

Website thiệp mời Lễ Tốt Nghiệp Đại Học phong cách điện ảnh, nhẹ nhàng và tinh tế, xây dựng bằng **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion** và **GSAP**.

## ✨ Tính năng

- Màn hình Loader mở đầu với hiệu ứng ánh sáng lan tỏa
- Hero toàn màn hình với ảnh nổi theo chuột, tên hiển thị từng chữ
- Hiệu ứng "mở thiệp" dạng curtain animation kèm nhạc nền tự động phát
- Trình phát nhạc nổi: play/pause, equalizer, thanh tiến trình, âm lượng, thu nhỏ
- Đồng hồ đếm ngược Flip Clock cao cấp (ngày/giờ/phút/giây) + confetti khi kết thúc
- Timeline hành trình 4 năm đại học, card xen kẽ hai bên
- Thư viện ảnh dạng lưới đều 6 ảnh (2×3 / 3×2) với hover zoom, glass overlay và lightbox
- Lời tri ân dạng thư viết tay với hiệu ứng hiện từng dòng
- Thông tin buổi lễ: ngày giờ, địa điểm, Google Maps, QR Code
- Background động: aurora pastel, blur blob, hạt sáng, cánh hoa rơi (60 FPS)
- Smooth scroll bằng Lenis, tôn trọng `prefers-reduced-motion`
- SEO đầy đủ: Metadata, Open Graph, Twitter Card, Structured Data (schema.org/Event), manifest, sitemap, robots.txt
- Responsive hoàn chỉnh: Desktop / Laptop / Tablet / Mobile

## 🚀 Cài đặt & chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

Build production:

```bash
npm run build
npm run start
```

## 🖼️ Thay thế nội dung & tài nguyên thật

Toàn bộ nội dung văn bản (tên, ngày tháng, timeline, lời tri ân, thông tin buổi lễ...) được quản lý tập trung tại:

```
data/content.ts
```

Chỉnh sửa file này để cập nhật thông tin mà không cần đụng vào code component.

### Tài nguyên media (ảnh / nhạc)

Dự án đã bao gồm các file placeholder (ảnh gradient pastel, nhạc câm) để bạn có thể chạy thử ngay. Hãy thay thế bằng file thật của bạn tại cùng đường dẫn:

| Loại | Đường dẫn | Ghi chú |
|---|---|---|
| Ảnh chân dung Hero | `public/assets/images/hero-portrait.jpg` | Tỉ lệ dọc, tối thiểu 800×1000px |
| Ảnh thư viện | `public/assets/images/gallery-01.jpg` → `gallery-06.jpg` | Có thể thêm bớt, nhớ cập nhật `galleryImages` trong `data/content.ts` |
| Ảnh OG (chia sẻ mạng xã hội) | `public/assets/images/og-cover.jpg` | 1200×630px |
| Icon PWA | `public/assets/images/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | |
| Favicon | `public/favicon.ico` | |
| Nhạc nền "Moments to Memories" | `public/assets/audio/moments-to-memories.mp3` | |

> Lưu ý bản quyền: nếu sử dụng bài hát "Moments to Memories" có bản quyền, hãy đảm bảo bạn có giấy phép sử dụng hợp lệ trước khi công bố website công khai.

### Địa điểm & Google Maps

Cập nhật `eventInfo.address`, `eventInfo.mapLink` và `eventInfo.mapEmbedUrl` trong `data/content.ts`. Để lấy link embed Google Maps: mở Google Maps → Chia sẻ → Nhúng bản đồ → sao chép URL trong thuộc tính `src`.

## 🗂️ Cấu trúc dự án

```
app/                  # App Router: layout, page, sitemap, robots
components/           # Toàn bộ UI components của thiệp mời
hooks/                # useLenis, useCountdown, useMousePosition, useInView, useAppState
lib/                  # Hàm tiện ích (cn, formatNumber, clamp)
utils/                # (dự trữ cho tiện ích mở rộng)
styles/               # globals.css - design tokens & hiệu ứng CSS
animations/           # Framer Motion variants dùng chung
types/                # Định nghĩa TypeScript dùng chung
data/                 # content.ts - toàn bộ nội dung thiệp mời
public/assets/        # images / audio
```

## 🎨 Design tokens

| Vai trò | Màu | Mã |
|---|---|---|
| Nền chính | Trắng ngà | `#FFFDF8` |
| Nền phụ | Hồng phấn / Kem đào / Xanh trời / Lavender | `#FBE9E7` `#FFF1E6` `#EAF4FF` `#F3EEFF` |
| Nhấn | Vàng champagne / Hồng đất / Xanh ngọc | `#D9B26F` `#DFA5A5` `#A8D5D0` |
| Chữ | Nâu xám đậm / Xám ấm | `#5C4B51` `#7A6E73` |

Font: **Playfair Display** (display), **Be Vietnam Pro** (body), **Dancing Script** (chữ viết tay).

## ⚡ Hiệu năng

- `next/image` với AVIF/WebP tự động
- Dynamic import sẵn sàng cho các section nặng (Gallery/Video) nếu cần code-splitting sâu hơn
- Toàn bộ animation dùng `transform`/`opacity`/`filter` để giữ 60 FPS
- Tôn trọng `prefers-reduced-motion` ở cấp CSS toàn cục

## 📄 License

Dự án được tạo riêng cho thiệp mời tốt nghiệp cá nhân. Vui lòng thay thế toàn bộ tài nguyên placeholder bằng nội dung bạn sở hữu bản quyền trước khi triển khai công khai.
