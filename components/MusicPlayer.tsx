"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music2, Minimize2 } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/utils";

export default function MusicPlayer() {
  const { shouldAutoplayMusic } = useAppState();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
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
    if (audioRef.current) audioRef.current.volume = val;
  }

  const barsHeights = [6, 12, 8, 16, 5];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={siteConfig.song.src} loop preload="none" />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            onClick={() => setIsMinimized(false)}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="flex h-14 w-14 items-center justify-center rounded-full glass-panel shadow-glass"
            aria-label="Mở trình phát nhạc"
          >
            <Music2
              size={20}
              className={cn("text-champagne", isPlaying && "animate-pulse")}
            />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 rounded-3xl glass-panel p-4 shadow-glass"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-terracottaRose text-ivory shadow-soft transition-transform hover:scale-105"
                  aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div className="flex flex-col leading-tight">
                  <span className="max-w-[9rem] truncate font-display text-sm text-inkBrown">
                    {siteConfig.song.title}
                  </span>
                  <span className="text-[0.65rem] text-warmGray">
                    {siteConfig.song.artist}
                  </span>
                </div>
              </div>

              {/* Equalizer */}
              <div className="flex h-5 items-end gap-[3px]">
                {barsHeights.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-champagne"
                    animate={
                      isPlaying
                        ? { height: [h * 0.4, h, h * 0.4] }
                        : { height: h * 0.3 }
                    }
                    transition={{
                      duration: 0.8 + i * 0.1,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsMinimized(true)}
                className="text-warmGray transition-colors hover:text-inkBrown"
                aria-label="Thu nhỏ"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            {/* Progress bar */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="mb-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-inkBrown/15 accent-champagne"
              aria-label="Tiến trình bài hát"
            />

            {/* Volume */}
            <div className="flex items-center gap-2">
              {volume === 0 ? (
                <VolumeX size={14} className="text-warmGray" />
              ) : (
                <Volume2 size={14} className="text-warmGray" />
              )}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-inkBrown/15 accent-terracottaRose"
                aria-label="Âm lượng"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
