import { siteConfig } from "@/data/content";
import { cn } from "@/lib/utils";

interface MonogramProps {
  size?: "sm" | "md";
  className?: string;
}

/** Nhánh lá nguyệt quế (laurel), dùng cho cả 2 bên - bên phải được lật ngang. */
function LaurelBranch() {
  return (
    <svg 
      width="44" 
      height="72" 
      viewBox="-12 -4 44 72" 
      fill="none" 
      className="overflow-visible"
    >
      {/* Cành chính - Đường cong mượt mà hơn */}
      <path
        d="M 28 64 C 14 56 4 42 4 28 C 4 16 8 6 14 0"
        stroke="#D9B26F"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      
      {/* Các lá - Bám sát theo tọa độ (x, y) của đường cong thân cây */}
      {[
        // [x, y, rotation, scale]
        [14, 0, 15, 0.7],    // Lá ngọn
        
        [8, 8, -40, 0.8],    // Trái 1
        [8, 12, 55, 0.75],   // Phải 1
        
        [5, 20, -45, 0.9],   // Trái 2
        [4.5, 24, 60, 0.85], // Phải 2
        
        [4, 34, -55, 1],     // Trái 3
        [5, 38, 65, 0.95],   // Phải 3
        
        [8, 48, -65, 1.05],  // Trái 4
        [11, 51, 70, 1],     // Phải 4
        
        [18, 59, -70, 1.1],  // Trái 5
        [22, 61, 75, 1.05],  // Phải 5
      ].map(([x, y, rot, scale], i) => (
        <path
          key={i}
          // Path vẽ hình chiếc lá thanh mảnh thay vì ellipse
          d="M0,0 C-4,-5 -5,-12 0,-16 C5,-12 4,-5 0,0 Z"
          fill="#D9B26F"
          opacity={0.85}
          transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
        />
      ))}
    </svg>
  );
}

function CapGlyph() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
      <path d="M15 1L28 7L15 13L2 7L15 1Z" fill="#5C4B51" />
      <path
        d="M9 9.3V15C9 16.7 11.5 18 15 18C18.5 18 21 16.7 21 15V9.3"
        stroke="#5C4B51"
        strokeWidth="1.2"
      />
      <path d="M25 8.3V14" stroke="#D9B26F" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="25" cy="15.2" r="1.4" fill="#D9B26F" />
    </svg>
  );
}

export default function Monogram({ size = "md", className }: MonogramProps) {
  const isSmall = size === "sm";
  const circleSize = isSmall ? "h-11 w-11" : "h-[4.75rem] w-[4.75rem]";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        isSmall ? "h-11 w-[5.5rem]" : "h-28 w-40",
        className
      )}
    >
      {/* Laurel wreath - hidden on the compact navbar size to avoid clutter */}
      {!isSmall && (
        <>
          <div className="absolute left-0 top-1/2 -translate-y-[42%]">
            <LaurelBranch />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-[42%] scale-x-[-1]">
            <LaurelBranch />
          </div>
        </>
      )}

      {/* Mortarboard cap perched on top of the seal */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          isSmall ? "-top-2 scale-[0.55]" : "-top-3"
        )}
      >
        <CapGlyph />
      </div>

      {/* Center circle */}
      <div className={cn("relative flex items-center justify-center rounded-full", circleSize)}>
        <div className="absolute inset-0 rounded-full border border-champagne/40" />
        <div className="absolute inset-[3px] rounded-full border border-terracottaRose/20" />
        <div className="absolute inset-[5px] rounded-full glass-panel shadow-glass" />

        <span
          className={cn(
            "text-gradient-champagne relative font-display italic tracking-[0.12em]",
            isSmall ? "text-sm" : "text-2xl"
          )}
        >
          {siteConfig.initials}
        </span>
      </div>
    </div>
  );
}