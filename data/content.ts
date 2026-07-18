// ============================================================
// TỆP DỮ LIỆU TRUNG TÂM
// Chỉnh sửa toàn bộ nội dung thiệp mời tại đây.
// ============================================================

export const siteConfig = {
  name: "Nguyễn Thị Thủy",
  initials: "NTT",
  eventTitle: "Lễ Tốt Nghiệp",
  graduationDateISO: "2026-08-18T08:00:00+07:00",
  graduationDateDisplay: "18 . 08 . 2026",
  song: {
    title: "Moments to Memories",
    artist: "Piano Ambient",
    src: "/assets/audio/moments-to-memories.mp3",
  },
  siteUrl: "https://ntt-graduation.vercel.app",
  description:
    "Trân trọng kính mời bạn đến chung vui cùng Nguyễn Thị Thủy trong Lễ Tốt Nghiệp Cao Đẳng - một hành trình thanh xuân đầy nắng, đầy hoa và đầy những điều đáng nhớ.",
};

export const heroContent = {
  eyebrow: "Save the date",
  title: siteConfig.name,
  subtitle: siteConfig.eventTitle,
  date: siteConfig.graduationDateDisplay,
  cta: "Mở Thiệp",
  heroImage: "/assets/images/hero-portrait.jpg",
};

export const eventInfo = {
  date: "Thứ Ba, 18 tháng 08 năm 2026",
  time: "08:00 sáng",
  venue: "Trường Cao Đẳng Y Tế Thanh Hóa",
  address: "177 Hải Thượng Lãn Ông, Hạc Thành, Thanh Hóa",
  dressCode: "Trang phục cử nhân / Lễ phục tốt nghiệp",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Tr%C6%B0%E1%BB%9Dng+Cao+%C4%90%E1%BA%B3ng+Y+T%E1%BA%BF+Thanh+H%C3%B3a%2C+177+H%E1%BA%A3i+Th%C6%B0%E1%BB%A3ng+L%C3%A3n+%C3%94ng%2C+H%E1%BA%A1c+Th%C3%A0nh%2C+Thanh+H%C3%B3a&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Tr%C6%B0%E1%BB%9Dng+Cao+%C4%90%E1%BA%B3ng+Y+T%E1%BA%BF+Thanh+H%C3%B3a%2C+177+H%E1%BA%A3i+Th%C6%B0%E1%BB%A3ng+L%C3%A3n+%C3%94ng%2C+H%E1%BA%A1c+Th%C3%A0nh%2C+Thanh+H%C3%B3a",
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const timelineItems: TimelineItem[] = [
  {
    id: "t1",
    year: "Năm Nhất",
    title: "Ngày Đầu Nhập Học",
    description:
      "Những bước chân đầu tiên bỡ ngỡ trên giảng đường, mang theo bao hoài bão và ước mơ tuổi trẻ.",
  },
  {
    id: "t2",
    year: "Năm Hai",
    title: "Những Năm Tháng Cao Đẳng",
    description:
      "Là những buổi học miệt mài, những người bạn đồng hành và vô vàn kỷ niệm không thể nào quên.",
  },
  {
    id: "t3",
    year: "Năm Ba",
    title: "Hành Trình Thực Tập",
    description:
      "Bước ra khỏi giảng đường, chạm vào thực tế công việc đầu tiên với nhiều bỡ ngỡ và trưởng thành.",
  },
  {
    id: "t4",
    year: "2026",
    title: "Ngày Tốt Nghiệp",
    description:
      "Khoảnh khắc đón nhận tấm bằng - món quà xứng đáng cho những năm tháng cố gắng không ngừng.",
  },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/assets/images/gallery-01.jpg", alt: "" },
  { id: "g2", src: "/assets/images/gallery-02.jpg", alt: "" },
  { id: "g3", src: "/assets/images/gallery-03.jpg", alt: "" },
  { id: "g4", src: "/assets/images/gallery-04.jpg", alt: "" },
  { id: "g5", src: "/assets/images/gallery-05.jpg", alt: "" },
  { id: "g6", src: "/assets/images/gallery-06.jpg", alt: "" },
];

export const letterContent = {
  title: "Lời Tri Ân",
  paragraphs: [
    "Gửi những người đã luôn ở bên con trong suốt hành trình vừa qua,",
    "Ba năm cao đẳng đi qua như một cuốn nhật ký đầy nắng, có những ngày mệt nhoài vì bài vở, có những đêm thức trắng vì thực tập, nhưng cũng có biết bao khoảnh khắc rực rỡ bên bạn bè, thầy cô.",
    "Con xin gửi lời cảm ơn chân thành đến gia đình đã luôn tin tưởng và ủng hộ con trên từng chặng đường. Cảm ơn thầy cô đã tận tâm truyền dạy tri thức. Cảm ơn những người bạn đã cùng con đi qua thanh xuân rực rỡ này.",
    "Hôm nay, khi khoác lên mình bộ lễ phục tốt nghiệp, con biết đây không phải là điểm kết thúc, mà là khởi đầu của một hành trình mới - một hành trình mang theo tất cả yêu thương và bài học quý giá từ những năm tháng đã qua.",
    "Rất mong được đón tiếp mọi người trong ngày trọng đại này.",
  ],
  signature: "Thương mến, Nguyễn Thị Thủy",
};

export const navSections = [
  { id: "hero", label: "Trang Chủ" },
  { id: "countdown", label: "Đếm Ngược" },
  { id: "timeline", label: "Hành Trình" },
  { id: "gallery", label: "Kỷ Niệm" },
  { id: "letter", label: "Tri Ân" },
  { id: "event", label: "Thông Tin" },
];
