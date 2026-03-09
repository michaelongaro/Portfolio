import { useEffect, useState, type ComponentType } from "react";
import { LuRotate3D } from "react-icons/lu";
import lightPlaceholder from "/assets/threeJSScenePlaceholderLight.png";
import darkPlaceholder from "/assets/threeJSScenePlaceholderDark.png";
import { useExploration } from "../../context/ExplorationContext";
import { useTheme } from "../../context/ThemeContext";
import SceneLoadingOverlay from "./SceneLoadingOverlay";
import type { SceneProps } from "./Scene";

type SceneComponentType = ComponentType<SceneProps>;

function preloadImage(source: string) {
  const image = new Image();
  image.src = source;
}

function HeroPreview({
  isDark,
  showExploreButton,
  onExplore,
}: {
  isDark: boolean;
  showExploreButton: boolean;
  onExplore: () => void;
}) {
  const previewImage = isDark ? darkPlaceholder : lightPlaceholder;

  return (
    <div className="absolute inset-0">
      <img
        src={previewImage}
        alt="Interactive portfolio preview"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40 dark:from-black/25 dark:via-black/35 dark:to-black/65" />

      {showExploreButton && (
        <div className="absolute bottom-12 sm:bottom-16 z-20 w-full flex items-center justify-center">
          <button
            onClick={onExplore}
            className="pointer-events-auto flex font-medium sm:h-[60px] h-[50px] z-20 text-lg sm:text-xl items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg sm:px-8 sm:py-4 py-3 px-6"
          >
            <LuRotate3D className="size-5 sm:size-6" />
            Explore
          </button>
        </div>
      )}
    </div>
  );
}

function Hero() {
  const { theme } = useTheme();
  const { setIsExploring } = useExploration();
  const isDark = theme === "dark";
  const [SceneComponent, setSceneComponent] =
    useState<SceneComponentType | null>(null);
  const [hasRequestedScene, setHasRequestedScene] = useState(false);
  const [sceneTargetProgress, setSceneTargetProgress] = useState(0);
  const [isSceneReady, setIsSceneReady] = useState(false);

  useEffect(() => {
    preloadImage(lightPlaceholder);
    preloadImage(darkPlaceholder);
  }, []);

  useEffect(() => {
    if (!hasRequestedScene || SceneComponent) {
      return;
    }

    let isCancelled = false;

    import("./Scene")
      .then((module) => {
        if (!isCancelled) {
          setSceneComponent(() => module.default);
        }
      })
      .catch((error) => {
        console.error("Unable to load the interactive scene.", error);

        if (!isCancelled) {
          setHasRequestedScene(false);
          setIsExploring(false);
          setSceneTargetProgress(0);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [SceneComponent, hasRequestedScene, setIsExploring]);

  const handleExplore = () => {
    setSceneTargetProgress(0);
    setHasRequestedScene(true);
    setIsExploring(true);
  };

  return (
    <section className="relative top-0 left-0 min-h-svh w-full py-20 overflow-hidden">
      {!SceneComponent && (
        <HeroPreview
          isDark={isDark}
          showExploreButton={!hasRequestedScene}
          onExplore={handleExplore}
        />
      )}

      {SceneComponent && (
        <SceneComponent
          onReady={() => {
            setSceneTargetProgress(100);
            setIsSceneReady(true);
          }}
          onProgressChange={(progress) => {
            setSceneTargetProgress(progress);
          }}
        />
      )}

      <SceneLoadingOverlay
        isDark={isDark}
        isVisible={hasRequestedScene && !isSceneReady}
        targetProgress={sceneTargetProgress}
      />
    </section>
  );
}

export default Hero;
