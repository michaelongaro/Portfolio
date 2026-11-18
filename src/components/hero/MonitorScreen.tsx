import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import headshot from "/assets/headshot.jpg";
import {
  PiMouseLeftClickFill,
  PiMouseScroll,
  PiMouseRightClickFill,
} from "react-icons/pi";
import { RotatePhone } from "../ui/icons/RotatePhone";

export const MONITOR_DISPLAY_SIZE: [number, number] = [1.5, 0.85];
const PIXELS_PER_UNIT = 500;
const [SCREEN_WIDTH, SCREEN_HEIGHT] = MONITOR_DISPLAY_SIZE.map(
  (size) => size * PIXELS_PER_UNIT,
);
const pixelsToScreen = new THREE.Matrix4().makeScale(
  1 / PIXELS_PER_UNIT,
  -1 / PIXELS_PER_UNIT,
  1,
);

export type MonitorContentRef = RefObject<HTMLDivElement | null>;

export function MonitorContent({
  contentRef,
  isDark,
}: {
  contentRef: MonitorContentRef;
  isDark: boolean;
}) {
  return (
    <div
      ref={contentRef}
      className="absolute flex select-none flex-col justify-center gap-18 p-8"
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        left: -SCREEN_WIDTH / 2,
        top: -SCREEN_HEIGHT / 2,
        visibility: "hidden",
        WebkitTextSizeAdjust: "none",
        textSizeAdjust: "none",
      }}
    >
      <div className="flex flex-row items-center justify-center gap-6">
        <img
          src={headshot}
          alt="Michael Ongaro"
          className="size-32 shrink-0 rounded-full object-cover border-2 border-white shadow-lg pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />

        <div className="flex flex-col items-start justify-center">
          <h1
            className={`cursive text-5xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Michael Ongaro
          </h1>
          <h2
            className={`text-2xl font-medium mb-4 ${
              isDark ? "text-orange-300" : "text-gray-700"
            }`}
          >
            Full Stack Developer
          </h2>

          <div className="flex gap-4">
            <a
              href="https://github.com/michaelongaro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline text-orange-600 hover:opacity-80 pointer-events-auto"
            >
              GitHub
            </a>
            <a
              href="/assets/MichaelOngaroResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline text-orange-600 hover:opacity-80 pointer-events-auto"
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/michaelongaro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline text-orange-600 hover:opacity-80 pointer-events-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-4 items-center justify-center">
        <h3 className="flex gap-4 justify-center items-center text-3xl font-bold mb-2 text-gray-700 dark:text-gray-200">
          <RotatePhone className="size-8 md:hidden" />
          Controls
        </h3>
        <div className="hidden md:flex items-center gap-8 font-medium text-3xl text-gray-400">
          <div className="flex gap-1 items-center">
            <PiMouseLeftClickFill className="size-8" />
            Pan
          </div>
          <div className="flex gap-1 items-center">
            <PiMouseScroll className="size-8" />
            Zoom
          </div>
          <div className="flex gap-1 items-center">
            <PiMouseRightClickFill className="size-8" />
            Rotate
          </div>
        </div>
        <div className="flex md:hidden items-center gap-12 font-medium text-3xl text-gray-400">
          <div className="flex gap-4 items-center">
            <div className="relative size-8 flex justify-center items-center">
              <div className="rounded-full size-4 bg-gray-400"></div>
            </div>
            Pan
          </div>
          <div className="flex gap-6 items-center">
            <div className="relative size-8 flex justify-center items-center">
              <div className="absolute bottom-0 left-0 rounded-full size-4 bg-gray-400"></div>
              <div className="absolute top-0 right-0 rounded-full size-4 bg-gray-400"></div>
            </div>
            Zoom + Rotate
          </div>
        </div>
      </div>
    </div>
  );
}

export function MonitorDisplay({ contentRef }: { contentRef: MonitorContentRef }) {
  const displayRef = useRef<THREE.Mesh>(null!);
  const viewport = useMemo(() => new THREE.Matrix4(), []);
  const projection = useMemo(() => new THREE.Matrix4(), []);
  const previousProjection = useMemo(() => new THREE.Matrix4(), []);
  const facing = useMemo(() => new THREE.Vector3(), []);
  const cameraOffset = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, size }) => {
    const content = contentRef.current;
    if (!content) return;

    const display = displayRef.current;
    display.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    cameraOffset.setFromMatrixPosition(camera.matrixWorld).sub(
      facing.setFromMatrixPosition(display.matrixWorld),
    );
    facing.setFromMatrixColumn(display.matrixWorld, 2);

    // Project the monitor plane onto CSS pixels in one transform. This avoids
    // nested CSS perspective transforms, which can flatten the display in WebKit.
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;
    viewport.set(
      halfWidth, 0, 0, halfWidth,
      0, -halfHeight, 0, halfHeight,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    projection
      .multiplyMatrices(viewport, camera.projectionMatrix)
      .multiply(camera.matrixWorldInverse)
      .multiply(display.matrixWorld)
      .multiply(pixelsToScreen);

    const matrix = projection.elements;
    const w = matrix[15];
    if (w <= 0 || facing.dot(cameraOffset) <= 0) {
      content.style.visibility = "hidden";
      return;
    }
    if (content.style.visibility !== "visible") {
      content.style.visibility = "visible";
    }

    if (!projection.equals(previousProjection)) {
      // Normalize at the screen center to keep the projected center fixed
      // as the panel tilts. CSS depth is independent of this planar transform.
      const x = matrix[12] / w;
      const y = matrix[13] / w;
      const planeTransform = [
        (matrix[0] - x * matrix[3]) / w,
        (matrix[1] - y * matrix[3]) / w,
        0,
        matrix[3] / w,
        (matrix[4] - x * matrix[7]) / w,
        (matrix[5] - y * matrix[7]) / w,
        0,
        matrix[7] / w,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ];
      const cssMatrix = planeTransform.map((value) => value.toFixed(8)).join(",");
      content.style.transform = `translate(${x}px, ${y}px) matrix3d(${cssMatrix})`;
      previousProjection.copy(projection);
    }
  });

  return (
    <mesh ref={displayRef} position={[0, 0, 0.231]}>
      <planeGeometry args={MONITOR_DISPLAY_SIZE} />
      {/* Write zero alpha and keep depth testing so foreground objects cover the HTML. */}
      <shaderMaterial fragmentShader="void main() { gl_FragColor = vec4(0.0); }" />
    </mesh>
  );
}
