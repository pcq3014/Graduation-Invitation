"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Minimize2, Disc } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/utils";

// Hàm hỗ trợ format giây thành dạng 00:00
const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function MusicPlayer() {
  const { shouldAutoplayMusic } = useAppState();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [volume, setVolume] = useState(0.7);
  const [prevVolume, setPrevVolume] = useState(0.7); // Lưu lại volume trước khi mute
  const [isMinimized, setIsMinimized] = useState(false);

  // Autoplay once the invitation card has been opened
  useEffect(() => {
    if (shouldAutoplayMusic && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [shouldAutoplayMusic]);

  // Cập nhật progress mượt mà
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // FIX 1: Nếu trình duyệt đã load sẵn metadata từ cache, lấy luôn duration
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
    }

    const onTime = () => {
      setProgress(audio.currentTime);
      // FIX 2: Fallback an toàn - nếu duration vẫn bằng 0 mà nhạc đã chạy, ép lấy duration
      setDuration((prev) => (prev === 0 && audio.duration ? audio.duration : prev));
    };
    
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setProgress(val);
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) setPrevVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (volume > 0) {
      setVolume(0);
      audio.volume = 0;
    } else {
      setVolume(prevVolume || 0.5);
      audio.volume = prevVolume || 0.5;
    }
  }

  const barsHeights = [6, 12, 8, 16, 5];
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const volumePercent = volume * 100;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={siteConfig.song.src} loop preload="metadata" />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            onClick={() => setIsMinimized(false)}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-14 w-14 items-center justify-center rounded-full glass-panel shadow-glass ring-1 ring-white/20"
            aria-label="Mở trình phát nhạc"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Disc
                size={24}
                strokeWidth={1.5}
                className={cn(
                  "transition-colors duration-500",
                  isPlaying ? "text-terracottaRose" : "text-champagne"
                )}
              />
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ scale: 0.85, opacity: 0, y: 10, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 rounded-3xl glass-panel p-4 pb-5 shadow-glass ring-1 ring-white/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-terracottaRose text-ivory shadow-soft transition-transform hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>
                <div className="flex flex-col overflow-hidden leading-tight">
                  <span className="truncate font-display text-sm font-medium text-inkBrown">
                    {siteConfig.song.title}
                  </span>
                  <span className="truncate text-[0.65rem] tracking-wider text-warmGray">
                    {siteConfig.song.artist}
                  </span>
                </div>
              </div>

              {/* Tùy chọn thu nhỏ */}
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="rounded-full p-1 text-warmGray transition-colors hover:bg-black/5 hover:text-inkBrown"
                  aria-label="Thu nhỏ"
                >
                  <Minimize2 size={16} />
                </button>
                
                {/* Equalizer nhỏ xíu gọn gàng góc phải */}
                <div className="mr-1 flex h-[10px] items-end gap-[2px]">
                  {barsHeights.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[2px] rounded-full bg-terracottaRose/60"
                      animate={
                        isPlaying
                          ? { height: [h * 0.3, h * 0.8, h * 0.3] }
                          : { height: h * 0.2 }
                      }
                      transition={{
                        duration: 0.6 + i * 0.15,
                        repeat: isPlaying ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Progress Bar */}
            <div className="group relative mb-1 flex h-1.5 w-full items-center rounded-full bg-inkBrown/10">
              <div
                className="absolute h-full rounded-full bg-champagne transition-all ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Tiến trình bài hát"
              />
            </div>
            
            {/* Timestamps */}
            <div className="mb-3 flex justify-between text-[0.6rem] font-medium text-warmGray/70">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Custom Volume Bar */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute}
                className="text-warmGray transition-colors hover:text-inkBrown"
                aria-label={volume === 0 ? "Mở tiếng" : "Tắt tiếng"}
              >
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              
              <div className="relative flex h-1.5 w-full items-center rounded-full bg-inkBrown/10">
                <div
                  className="absolute h-full rounded-full bg-terracottaRose/80 transition-all"
                  style={{ width: `${volumePercent}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Âm lượng"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}