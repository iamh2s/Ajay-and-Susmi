
import { Music, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import data from "@/data/weddingData.json";
import { cn } from "@/utils/cn";

type MusicPlayerProps = {
  opened: boolean;
};

export default function MusicPlayer({
  opened,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  // Start music when the invitation opens
  useEffect(() => {
    const handleWeddingOpen = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        audio.currentTime = 0;
        await audio.play();
        setUnavailable(false);
      } catch (error) {
        console.log("Wedding music autoplay blocked:", error);
        setPlaying(false);
      }
    };

    window.addEventListener("wedding:open", handleWeddingOpen);

    return () => {
      window.removeEventListener(
        "wedding:open",
        handleWeddingOpen
      );
    };
  }, []);

  // Keep the button state synchronized with the audio
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
      data.music.src
    );
  };

  // Turn music on or off
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      setUnavailable(false);
    } catch (error) {
      console.error("Music playback failed:", error);
      setPlaying(false);
      setUnavailable(true);
    }
  };

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src="/images/music.mp3"
        loop
        preload="auto"
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
      />

      {/* MUSIC CONTROL */}
      <div
        className={cn(
          `
          fixed
          bottom-4
          left-4
          z-[9998]
          flex
          max-w-[calc(100vw-2rem)]
          items-center
          gap-2
          transition-all
          duration-500
          sm:bottom-6
          sm:left-6
          sm:gap-3
          `,
          opened
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        {/* MUSIC BUTTON */}
        <button
          type="button"
          onClick={toggle}
          aria-label={
            playing
              ? "Turn off music"
              : "Turn on music"
          }
          aria-pressed={playing}
          title={
            playing
              ? "Turn off music"
              : "Turn on music"
          }
          className={cn(
            `
            relative
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            backdrop-blur-md
            transition-all
            duration-300
            active:scale-95
            sm:h-[52px]
            sm:w-[52px]
            `,
            playing
              ? `
                border-gold-light
                bg-gradient-to-b
                from-gold-light
                to-gold
                text-maroon-deep
                shadow-[0_0_20px_rgba(217,190,124,0.35)]
              `
              : `
                border-gold/50
                bg-maroon-deep/90
                text-gold-light
                hover:border-gold-light
              `,
            unavailable && "opacity-80"
          )}
        >
          {/* Animated ring while playing */}
          {playing && (
            <svg
              aria-hidden="true"
              className="
                spin-slow
                pointer-events-none
                absolute
                -inset-1.5
                h-[calc(100%+12px)]
                w-[calc(100%+12px)]
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
            <Music
              className="h-5 w-5"
              aria-hidden="true"
            />
          )}
        </button>

        {/* STATUS LABEL — VISIBLE ON ALL SCREEN SIZES */}
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="
            flex
            min-h-10
            min-w-0
            items-center
            gap-2
            rounded-full
            border
            border-gold/30
            bg-maroon-deep/90
            px-3
            py-2
            text-left
            text-[11px]
            font-semibold
            leading-tight
            text-ivory
            shadow-lg
            backdrop-blur-md
            transition-colors
            hover:border-gold-light/70
            sm:px-4
            sm:text-xs
          "
        >
          <span className="whitespace-nowrap">
            {playing
              ? "Tap to turn off music"
              : "Tap to turn on music"}
          </span>

          {/* Simple equalizer indicator, no emojis */}
          <span
            className="flex h-3.5 shrink-0 items-end gap-[2px]"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "w-[2px] rounded-full bg-gold-light",
                  playing ? "eq-bar" : "h-[3px]"
                )}
                style={
                  playing
                    ? {
                        height: "100%",
                        animationDelay: `${i * 0.18}s`,
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
