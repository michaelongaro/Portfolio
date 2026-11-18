import { useEffect, useRef, useState } from "react";
import lightPlaceholder from "/assets/threeJSScenePlaceholderLight.png";
import darkPlaceholder from "/assets/threeJSScenePlaceholderDark.png";

interface SceneLoadingOverlayProps {
  isDark: boolean;
  isVisible: boolean;
  targetProgress?: number;
}

const EXIT_DURATION_MS = 450;
const PROGRESS_DURATION_MS = 650;
const COMPLETION_DURATION_MS = 180;
const INITIAL_PROGRESS = 7;
const BOOT_PROGRESS_CAP = 18;

export default function SceneLoadingOverlay({
  isDark,
  isVisible,
  targetProgress = 0,
}: SceneLoadingOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [roundedProgress, setRoundedProgress] = useState(INITIAL_PROGRESS);
  const fillRef = useRef<HTMLDivElement>(null);
  const displayProgress = useRef(INITIAL_PROGRESS);
  const progressTarget = isVisible
    ? targetProgress > 0
      ? Math.min(96, Math.max(targetProgress, INITIAL_PROGRESS + 4))
      : BOOT_PROGRESS_CAP
    : targetProgress;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShouldRender(false);
      displayProgress.current = INITIAL_PROGRESS;
      setRoundedProgress(INITIAL_PROGRESS);
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isVisible]);

  useEffect(() => {
    const fill = fillRef.current;
    const startProgress = displayProgress.current;
    if (!shouldRender || !fill || progressTarget <= startProgress) {
      return;
    }

    const updateProgress = (progress: number) => {
      const rounded = Math.round(progress);
      if (rounded !== Math.round(displayProgress.current)) {
        setRoundedProgress(rounded);
      }
      displayProgress.current = progress;
      fill.style.width = `${progress}%`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateProgress(progressTarget);
      return;
    }

    const duration = isVisible ? PROGRESS_DURATION_MS : COMPLETION_DURATION_MS;
    const startedAt = performance.now();
    const animateProgress = (now: number) => {
      const elapsed = Math.min(Math.max((now - startedAt) / duration, 0), 1);
      const eased = 1 - (1 - elapsed) ** 2;
      updateProgress(startProgress + (progressTarget - startProgress) * eased);

      if (elapsed < 1) {
        frameId = window.requestAnimationFrame(animateProgress);
      }
    };

    let frameId = window.requestAnimationFrame(animateProgress);
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, progressTarget, shouldRender]);

  if (!shouldRender) {
    return null;
  }

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

          <span
            className="text-xl font-semibold tabular-nums text-orange-600 dark:text-orange-400 sm:text-2xl"
            aria-hidden="true"
          >
            {roundedProgress}%
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700/80">
          <div
            ref={fillRef}
            className="scene-progress-fill h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
            style={{ width: `${INITIAL_PROGRESS}%` }}
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
