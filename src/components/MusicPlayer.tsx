
"use client";

import { Music, Pause } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import data from "@/data/weddingData.json";
import { cn } from "@/utils/cn";

type MusicPlayerProps = {
  opened: boolean;
};

export default function MusicPlayer({ opened }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [userTurnedOff, setUserTurnedOff] = useState(false);

  // Start music, loading the audio only when needed.
  const startMusic = useCallback(async (restart = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!audio.getAttribute("src")) {
        audio.src = data.music.src || "/images/music.mp3";
        audio.load();
      }

      if (restart) {
        audio.currentTime = 0;
      }

      await audio.play();
      setUnavailable(false);
    } catch (error) {
      setPlaying(false);
      setUnavailable(true);
      console.info("Wedding music could not start automatically:", error);
    }
  }, []);

  // Stop playback. Optionally reset the song to the beginning.
  const stopMusic = useCallback((reset = true) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();

    if (reset) {
      try {
        audio.currentTime = 0;
      } catch {
        // Audio may not have loaded yet.
      }
    }

    setPlaying(false);
  }, []);

  // Start when the invitation opens; stop when it closes.
  useEffect(() => {
    if (!opened) {
      setUserTurnedOff(false);
      stopMusic(true);
      return;
    }

    if (!userTurnedOff) {
      void startMusic(true);
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [opened, userTurnedOff, startMusic, stopMusic]);

  // Handle the existing wedding:open event without overriding manual off.
  useEffect(() => {
    const handleWeddingOpen = () => {
      if (opened && !userTurnedOff) {
        void startMusic(true);
      }
    };

    window.addEventListener("wedding:open", handleWeddingOpen);

    return () => {
      window.removeEventListener("wedding:open", handleWeddingOpen);
    };
  }, [opened, userTurnedOff, startMusic]);

  // Stop while the page is hidden; resume only if the user did not turn music off.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopMusic(true);
      } else if (opened && !userTurnedOff) {
        void startMusic();
      }
    };

    const handlePageHide = () => {
      stopMusic(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [opened, userTurnedOff, startMusic, stopMusic]);

  // Keep the manual choice until the user explicitly turns music back on.
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      setUserTurnedOff(true);
      stopMusic(false);
      return;
    }

    setUserTurnedOff(false);
    await startMusic();
  };

  const handlePlay = () => {
    setPlaying(true);
    setUnavailable(false);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleError = () => {
    setPlaying(false);
    setUnavailable(true);
    console.error(
      "Unable to load wedding music:",
      data.music.src || "/images/music.mp3"
    );
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
      />

      <div
        data-guide="music"
        className={cn(
          `
          fixed bottom-4 left-4 z-[9998]
          flex max-w-[calc(100vw-2rem)] items-center gap-2
          transition-all duration-500
          sm:bottom-6 sm:left-6 sm:gap-3
          `,
          opened
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        {/* Round music button */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Turn off music" : "Turn on music"}
          aria-pressed={playing}
          title={playing ? "Turn off music" : "Turn on music"}
          className={cn(
            `
            relative flex h-12 w-12 shrink-0 items-center justify-center
            rounded-full border transition-all duration-300
            active:scale-95 sm:h-[52px] sm:w-[52px]
            `,
            playing
              ? `
                border-gold-light bg-gradient-to-b
                from-gold-light to-gold text-maroon-deep
                shadow-[0_0_20px_rgba(217,190,124,0.35)]
              `
              : `
                border-gold/50 bg-maroon-deep/90
                text-gold-light hover:border-gold-light
              `,
            unavailable && "opacity-80"
          )}
        >
          {playing && (
            <svg
              aria-hidden="true"
              className="
                spin-slow pointer-events-none absolute -inset-1.5
                h-[calc(100%+12px)] w-[calc(100%+12px)]
              "
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(217,190,124,0.8)"
                strokeWidth="1.4"
                strokeDasharray="3 7"
                strokeLinecap="round"
              />
            </svg>
          )}

          {playing ? (
            <Pause
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            />
          ) : (
            <Music className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {/* Music status and second toggle button */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Turn off music" : "Turn on music"}
          aria-pressed={playing}
          className="
            flex min-h-10 min-w-0 items-center gap-2 rounded-full
            border border-gold/30 bg-maroon-deep/90 px-3 py-2
            text-left text-[11px] font-semibold leading-tight text-ivory
            shadow-lg transition-colors
            hover:border-gold-light/70 sm:px-4 sm:text-xs
          "
        >
          <span className="whitespace-nowrap">
            {playing ? "Tap to turn off music" : "Tap to turn on music"}
          </span>

          <span
            className="flex h-3.5 shrink-0 items-end gap-[2px]"
            aria-hidden="true"
          >
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={cn(
                  "w-[2px] rounded-full bg-gold-light",
                  playing ? "eq-bar" : "h-[3px]"
                )}
                style={
                  playing
                    ? {
                        height: "100%",
                        animationDelay: `${index * 0.18}s`,
                      }
                    : undefined
                }
              />
            ))}
          </span>
        </button>
      </div>
    </>
  );
}
