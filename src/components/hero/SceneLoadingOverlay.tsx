import { useEffect, useState } from "react";
import lightPlaceholder from "/assets/threeJSScenePlaceholderLight.png";
import darkPlaceholder from "/assets/threeJSScenePlaceholderDark.png";

interface SceneLoadingOverlayProps {
  isDark: boolean;
  isVisible: boolean;
  targetProgress?: number;
}

const EXIT_DURATION_MS = 450;
const INITIAL_PROGRESS = 7;
const BOOT_PROGRESS_CAP = 18;

export default function SceneLoadingOverlay({
  isDark,
  isVisible,
  targetProgress = 0,
}: SceneLoadingOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [displayProgress, setDisplayProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShouldRender(false);
      setDisplayProgress(INITIAL_PROGRESS);
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isVisible]);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    let timeoutId: number;

    const tick = () => {
      setDisplayProgress((currentProgress) => {
        const hasRealProgress = targetProgress > 0;
        const target = isVisible
          ? hasRealProgress
            ? Math.min(96, Math.max(targetProgress, INITIAL_PROGRESS + 4))
            : BOOT_PROGRESS_CAP
          : 100;

        if (currentProgress >= target) {
          return currentProgress;
        }

        const remaining = target - currentProgress;
        const nextStep =
          remaining < 2
            ? remaining
            : Math.min(
                remaining,
                0.8 + Math.random() * Math.min(6.5, remaining * 0.55),
              );

        return Number((currentProgress + nextStep).toFixed(1));
      });

      timeoutId = window.setTimeout(
        tick,
        isVisible ? 120 + Math.round(Math.random() * 180) : 60,
      );
    };

    tick();

    return () => window.clearTimeout(timeoutId);
  }, [isVisible, shouldRender, targetProgress]);

  if (!shouldRender) {
    return null;
  }

  const roundedProgress = Math.max(
    INITIAL_PROGRESS,
    Math.round(displayProgress),
  );
  const previewImage = isDark ? darkPlaceholder : lightPlaceholder;

  return (
    <div
      className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-live="polite"
    >
      <img
        src={previewImage}
        alt="Scene preview"
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-700 ease-out ${
          isVisible ? "blur-[3px] scale-[1.02]" : "blur-0 scale-100"
        }`}
      />
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />

      <div
        className={`relative z-10 w-[min(24rem,calc(100%-2rem))] rounded-lg border border-white/15 bg-white/90 px-6 py-6 text-stone-900 shadow-2xl backdrop-blur-md transition-all duration-500 dark:border-white/10 dark:bg-stone-900/85 dark:text-stone-100 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100 [filter:blur(0px)]"
            : "translate-y-2 scale-95 opacity-0 [filter:blur(3px)]"
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-lg font-semibold sm:text-xl">Loading</span>

          <span className="text-3xl font-semibold tabular-nums text-orange-600 dark:text-orange-400 sm:text-2xl">
            {roundedProgress}%
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700/80">
          <div
            className="scene-progress-fill h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-[width] duration-300 ease-out"
            style={{ width: `${roundedProgress}%` }}
            role="progressbar"
            aria-label="Loading the interactive scene"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={roundedProgress}
          />
        </div>
      </div>
    </div>
  );
}
