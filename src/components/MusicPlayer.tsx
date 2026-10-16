
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

  // Start music when the invitation is opened
  useEffect(() => {
    const handleWeddingOpen = async () => {
      const audio = audioRef.current;

      if (!audio) return;

      try {
        audio.currentTime = 0;
        await audio.play();

        setPlaying(true);
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

  // Audio events
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

  // Toggle music on and off
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

      {/* MUSIC PLAYER */}
      <div
        className={cn(
          `
          fixed
          bottom-4
          left-4
          z-[9998]
          flex
          items-center
          gap-3
          transition-all
          duration-500
          sm:bottom-6
          sm:left-6
          `,
          opened
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        {/* MUSIC TOGGLE BUTTON */}
        <button
          type="button"
          onClick={toggle}
          aria-label={
            playing
              ? "Tap to turn off music"
              : "Tap to turn on music"
          }
          aria-pressed={playing}
          title={
            playing
              ? "Tap to turn off music"
              : "Tap to turn on music"
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
            overflow-visible
            rounded-full
            border
            backdrop-blur-md
            transition-all
            duration-500
            active:scale-95
            sm:h-13
            sm:w-13
            `,
            playing
              ? `
                border-gold-light
                bg-gradient-to-b
                from-gold-light
                to-gold
                text-maroon-deep
                shadow-[0_0_24px_rgba(217,190,124,0.5)]
              `
              : `
                border-gold/50
                bg-maroon-deep/80
                text-gold-light
                hover:border-gold-light/80
              `,
            unavailable && "opacity-60"
          )}
        >
          {/* Animated music ring */}
          {playing && (
            <svg
              aria-hidden="true"
              className="
                spin-slow
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
              className="h-4.5 w-4.5 fill-current"
              aria-hidden="true"
            />
          ) : (
            <Music
              className="h-4.5 w-4.5"
              aria-hidden="true"
            />
          )}
        </button>

        {/* MUSIC STATUS LABEL */}
        <span
          className="
            hidden
            items-center
            gap-2.5
            rounded-full
            border
            border-gold/30
            bg-maroon-deep/75
            px-4
            py-2
            backdrop-blur-md
            md:flex
          "
        >
          <span
            className="
              font-tamil
              text-xs
              font-semibold
              text-ivory/90
            "
          >
            {playing
              ? "Tap to turn off music"
              : "Tap to turn on music"}
          </span>

          {/* Equalizer / muted indicator */}
          <span
            className="flex h-3.5 items-end gap-[3px]"
            aria-hidden="true"
          >
            {playing ? (
              [0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="eq-bar w-[3px] rounded-full bg-gold-light"
                  style={{
                    height: "100%",
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))
            ) : (
              <span className="text-xs">🔇</span>
            )}
          </span>
        </span>
      </div>
    </>
  );
}
