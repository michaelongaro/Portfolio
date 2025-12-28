import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  PerspectiveCamera,
  Environment,
  RoundedBox,
  useTexture,
  Html,
  Preload,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useTheme } from "../../context/ThemeContext";
import { useExploration } from "../../context/ExplorationContext";
import * as THREE from "three";
import {
  useMemo,
  useRef,
  useState,
  useEffect,
  Suspense,
  useTransition,
  forwardRef,
  useImperativeHandle,
} from "react";
import headshot from "/assets/headshot.jpg";
import lightPlaceholder from "/assets/threeJSScenePlaceholderLight.png";
import darkPlaceholder from "/assets/threeJSScenePlaceholderDark.png";
import LoadingSpinner from "../ui/icons/LoadingSpinner";
import { isIOS } from "react-device-detect";
import { IoClose, IoRefresh, IoMoon, IoSunny } from "react-icons/io5";
import { LuRotate3D } from "react-icons/lu";
import anime from "animejs/lib/anime.es.js";
import {
  PiMouseLeftClickFill,
  PiMouseScroll,
  PiMouseRightClickFill,
} from "react-icons/pi";

const ElasticOrbitControls = forwardRef(
  (
    {
      minPolarAngle,
      maxPolarAngle,
      minAzimuthAngle,
      maxAzimuthAngle,
      enabled = true,
      ...props
    }: any,
    ref: any
  ) => {
    const controlsRef = useRef<any>(null);
    const [isDragging, setIsDragging] = useState(false);
    const baseRotateSpeed = props.rotateSpeed || 1.0;

    useImperativeHandle(ref, () => controlsRef.current);

    useEffect(() => {
      const controls = controlsRef.current;
      if (controls) {
        // overriding the default 'none' set by OrbitControls to always
        // allow scrolling on mobile when not enabled
        controls.domElement.style.touchAction = enabled ? "none" : "pan-y";
      }
    }, [enabled]);

    useFrame((state, delta) => {
      if (!enabled) return;

      const controls = controlsRef.current;
      if (!controls) return;

      const azimuth = controls.getAzimuthalAngle();
      const polar = controls.getPolarAngle();

      let azOverflow = 0;
      if (azimuth < minAzimuthAngle) azOverflow = minAzimuthAngle - azimuth;
      else if (azimuth > maxAzimuthAngle)
        azOverflow = azimuth - maxAzimuthAngle;

      let polOverflow = 0;
      if (polar < minPolarAngle) polOverflow = minPolarAngle - polar;
      else if (polar > maxPolarAngle) polOverflow = polar - maxPolarAngle;

      if (isDragging) {
        const overflow = Math.max(azOverflow, polOverflow);
        const resistance = 1 - Math.min(1, overflow * 7);
        controls.rotateSpeed = baseRotateSpeed * resistance;
      } else {
        controls.rotateSpeed = baseRotateSpeed;

        if (azOverflow > 0.001 || polOverflow > 0.001) {
          const step = delta * 10;

          let targetTheta = azimuth;
          if (azimuth < minAzimuthAngle) targetTheta = minAzimuthAngle;
          else if (azimuth > maxAzimuthAngle) targetTheta = maxAzimuthAngle;

          let targetPhi = polar;
          if (polar < minPolarAngle) targetPhi = minPolarAngle;
          else if (polar > maxPolarAngle) targetPhi = maxPolarAngle;

          const spherical = new THREE.Spherical();
          spherical.setFromVector3(
            controls.object.position.clone().sub(controls.target)
          );

          spherical.theta = THREE.MathUtils.lerp(
            spherical.theta,
            targetTheta,
            step
          );
          spherical.phi = THREE.MathUtils.lerp(spherical.phi, targetPhi, step);
          spherical.makeSafe();

          const newPos = new THREE.Vector3()
            .setFromSpherical(spherical)
            .add(controls.target);
          controls.object.position.copy(newPos);
          controls.object.lookAt(controls.target);
        }
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        {...props}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        onStart={() => setIsDragging(true)}
        onEnd={() => setIsDragging(false)}
      />
    );
  }
);

function TexturedScreen({ image }: any) {
  const texture = useTexture(image);
  return (
    <mesh position={[0, 0, 0.228]}>
      <planeGeometry args={[1.5, 0.85]} />
      <meshBasicMaterial
        map={texture as THREE.Texture<unknown>}
        toneMapped={false}
      />
    </mesh>
  );
}

function Monitor({
  position,
  rotation = [0, 0, 0],
  text,
  subtext,
  isDark,
  screenColor = "#1a1a2e",
  image,
  screenImage,
}: any) {
  const emissiveIntensity = isDark ? 1.5 : 0.3;

  return (
    <group position={position} rotation={rotation}>
      {/* Monitor Stand - Base plate (oval shape) */}
      <mesh position={[0, -0.7, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.28, 0.02, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Monitor Stand - Neck/pole */}
      <mesh position={[0, -0.5, 0.145]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 0.45, 0.06]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen Frame/Bezel - Smaller, realistic 24" monitor size */}
      <RoundedBox
        args={[1.6, 0.95, 0.05]}
        radius={0.015}
        smoothness={4}
        position={[0, 0, 0.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </RoundedBox>

      {/* Screen Display */}
      {screenImage ? (
        <TexturedScreen image={screenImage} />
      ) : (
        <mesh position={[0, 0, 0.228]}>
          <planeGeometry args={[1.5, 0.85]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={isDark ? "#0f172b" : "#ffffff"}
            emissiveIntensity={emissiveIntensity}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* Screen glass reflection layer */}
      <mesh position={[0, 0, 0.23]}>
        <planeGeometry args={[1.5, 0.85]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Text Content */}
      {text && (
        <Html
          transform
          occlude="blending"
          position={[0, 0, 0.231]}
          scale={0.04}
          style={{
            width: "1500px",
            height: "850px",
            userSelect: "none",
            paddingBottom: isIOS ? "850px" : "0px",
          }}
        >
          <div className="flex flex-col justify-center gap-36 w-full h-full p-16">
            {/* Main Content Group */}
            <div className="flex flex-row items-start justify-center gap-12 mt-12">
              {/* Image */}
              {image && (
                <img
                  src={image}
                  alt="Profile"
                  className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg pointer-events-none select-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}

              {/* Text Group */}
              <div className="flex flex-col items-start justify-center h-64">
                <h1
                  className={`cursive text-8xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {text}
                </h1>
                <h2
                  className={`text-5xl font-medium mb-8 ${
                    isDark ? "text-orange-300" : "text-gray-700"
                  }`}
                >
                  {subtext}
                </h2>

                {/* Links */}
                <div className="flex gap-8">
                  <a
                    href="https://github.com/michaelongaro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl underline hover:opacity-80 pointer-events-auto ${
                      isDark ? "text-orange-600" : "text-orange-600"
                    }`}
                  >
                    GitHub
                  </a>
                  <a
                    href="/assets/MichaelOngaroResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl underline hover:opacity-80 pointer-events-auto ${
                      isDark ? "text-orange-600" : "text-orange-600"
                    }`}
                  >
                    Resume
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michaelongaro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl underline hover:opacity-80 pointer-events-auto ${
                      isDark ? "text-orange-600" : "text-orange-600"
                    }`}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col gap-12 md:gap-8 items-center justify-center mb-8">
              <h3 className="text-6xl font-bold mb-4 text-gray-700 dark:text-gray-200 ">
                Controls
              </h3>
              <div className="hidden md:flex items-center gap-16 font-medium text-6xl text-gray-400">
                <div className="flex gap-2 items-center">
                  <PiMouseLeftClickFill className="size-16" />
                  Pan
                </div>
                <div className="flex gap-2 items-center">
                  <PiMouseScroll className="size-16" />
                  Zoom
                </div>
                <div className="flex gap-2 items-center">
                  <PiMouseRightClickFill className="size-16" />
                  Rotate
                </div>
              </div>
              <div className="flex md:hidden md:flex-col items-center gap-24 md:gap-12 font-medium text-6xl text-gray-400">
                <div className="flex gap-8 items-center">
                  <div className="relative size-16 flex justify-center items-center">
                    <div className="rounded-full size-8 bg-gray-400"></div>
                  </div>
                  Pan
                </div>
                <div className="flex gap-12 items-center">
                  <div className="relative size-16 flex justify-center items-center">
                    <div className="absolute bottom-0 left-0 rounded-full size-8 bg-gray-400"></div>
                    <div className="absolute top-0 right-0 rounded-full size-8 bg-gray-400"></div>
                  </div>
                  Zoom + Rotate
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Key({ position, width = 0.09, depth = 0.09, label, isDark }: any) {
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const time = state.clock.getElapsedTime();
      // RGB Wave effect
      // Position based offset for wave
      const xOffset = position[0];
      const yOffset = position[2];
      const hue = (time * 0.1 + (xOffset + yOffset) * 0.1) % 1;
      const color = new THREE.Color().setHSL(hue, 0.95, 0.5);

      glowRef.current.color = color;
      glowRef.current.emissive = color;
      glowRef.current.emissiveIntensity = 4;
    }
  });

  // Font size adjustment
  const isSmall = label && (label.length > 1 || !/^[a-zA-Z0-9]$/.test(label));
  const fontSize = isSmall ? 0.022 : 0.035;

  return (
    <group position={position}>
      {/* Switch / Underglow */}
      <mesh position={[0, -0.005, 0]}>
        <boxGeometry args={[width * 0.9, 0.015, depth * 0.9]} />
        <meshStandardMaterial ref={glowRef} toneMapped={false} />
      </mesh>

      {/* Key cap */}
      <RoundedBox
        args={[width, 0.025, depth]}
        radius={0.005}
        smoothness={2}
        position={[0, 0.015, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={isDark ? "#1a1a1a" : "#f0f0f0"}
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>
      {/* Key label */}
      {label && (
        <Text
          fontSize={fontSize}
          color={isDark ? "#ffffff" : "#000000"}
          fillOpacity={0.75}
          anchorX="center"
          anchorY="middle"
          position={[0, 0.029, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

function Keyboard({ position, rotation, isDark }: any) {
  const keys = useMemo(() => {
    const keySize = 0.08;
    const keyGap = 0.01;
    const keyUnit = keySize + keyGap;

    // Helper to create key data
    const k = (label: string, widthUnits = 1) => ({
      label,
      width: widthUnits * keySize + (widthUnits - 1) * keyGap,
    });

    // TKL Layout Definition
    const rows = [
      // Row 0: F-keys
      [
        k("Esc"),
        k("", 1), // Gap
        k("F1"),
        k("F2"),
        k("F3"),
        k("F4"),
        k("", 0.5), // Gap
        k("F5"),
        k("F6"),
        k("F7"),
        k("F8"),
        k("", 0.5), // Gap
        k("F9"),
        k("F10"),
        k("F11"),
        k("F12"),
        k("", 0.5), // Gap
        k("PrtSc"),
        k("ScrLk"),
        k("Pause"),
      ],
      // Row 1: Numbers
      [
        k("~"),
        k("1"),
        k("2"),
        k("3"),
        k("4"),
        k("5"),
        k("6"),
        k("7"),
        k("8"),
        k("9"),
        k("0"),
        k("-"),
        k("="),
        k("⌫", 2),
        k("", 0.5), // Gap
        k("Ins"),
        k("Home"),
        k("PgUp"),
      ],
      // Row 2: QWERTY
      [
        k("Tab", 1.5),
        k("Q"),
        k("W"),
        k("E"),
        k("R"),
        k("T"),
        k("Y"),
        k("U"),
        k("I"),
        k("O"),
        k("P"),
        k("["),
        k("]"),
        k("\\", 1.5),
        k("", 0.5), // Gap
        k("Del"),
        k("End"),
        k("PgDn"),
      ],
      // Row 3: ASDF
      [
        k("Caps", 1.75),
        k("A"),
        k("S"),
        k("D"),
        k("F"),
        k("G"),
        k("H"),
        k("J"),
        k("K"),
        k("L"),
        k(";"),
        k("'"),
        k("Enter", 2.25),
        k("", 0.5), // Gap
        k("", 3), // Empty space above arrows
      ],
      // Row 4: ZXCV
      [
        k("Shift", 2.25),
        k("Z"),
        k("X"),
        k("C"),
        k("V"),
        k("B"),
        k("N"),
        k("M"),
        k(","),
        k("."),
        k("/", 1),
        k("Shift", 2.75),
        k("", 0.5), // Gap
        k("", 1),
        k("↑"),
        k("", 1),
      ],
      // Row 5: Bottom
      [
        k("Ctrl", 1.25),
        k("Win", 1.25),
        k("Alt", 1.25),
        k("Space", 6.25),
        k("Alt", 1.25),
        k("Win", 1.25),
        k("Menu", 1.25),
        k("Ctrl", 1.25),
        k("", 0.5), // Gap
        k("←"),
        k("↓"),
        k("→"),
      ],
    ];

    const generatedKeys: React.ReactNode[] = [];

    // Calculate total width of main block to center it
    const startX = -0.95; // Adjusted to center the wider TKL layout
    const startZ = -0.3;

    rows.forEach((row, rowIndex) => {
      let currentX = startX;
      // Add extra gap for F-row
      const zPos = startZ + rowIndex * keyUnit + (rowIndex > 0 ? 0.05 : 0);

      row.forEach((keyConfig, i) => {
        const label = keyConfig.label === "Space" ? "" : keyConfig.label;

        if (keyConfig.label === "") {
          // Just a gap
          currentX += keyConfig.width + keyGap;
          return;
        }

        generatedKeys.push(
          <Key
            key={`${rowIndex}-${i}`}
            position={[currentX + keyConfig.width / 2, 0, zPos]}
            width={keyConfig.width}
            depth={keySize}
            label={label}
            isDark={isDark}
          />
        );
        currentX += keyConfig.width + keyGap;
      });
    });

    return generatedKeys;
  }, [isDark]);

  return (
    <group position={position} rotation={rotation}>
      {/* Keyboard Base - Wider for TKL */}
      <RoundedBox
        args={[1.7, 0.015, 0.65]}
        radius={0.01}
        smoothness={4}
        position={[-0.125, 0, -0.05]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color={isDark ? "#1a1a1a" : "#d4d4d4"}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>
      {/* Keys */}
      <group position={[0, 0.02, 0]}>{keys}</group>
    </group>
  );
}

function MouseMaterial({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.3}
      metalness={0.25}
      onBeforeCompile={(shader) => {
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>
          varying vec3 vLocalPos;
          `
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          vLocalPos = position;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `#include <common>
          varying vec3 vLocalPos;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `#include <dithering_fragment>
          
          // Cut-out lines
          float lineWidth = 0.001;
          float zSplit = 0.03;
          
          // Vertical line (center split)
          float vLine = smoothstep(lineWidth, 0.0, abs(vLocalPos.x));
          vLine *= step(zSplit, vLocalPos.z); // Only in front of the horizontal split
          
          // Horizontal line (button separation)
          float hLine = smoothstep(lineWidth, 0.0, abs(vLocalPos.z - zSplit));
          // Limit horizontal line to not go all the way down the sides
          hLine *= step(abs(vLocalPos.x), 0.5);
          
          float lines = max(vLine, hLine);
          
          // Only apply on top hemisphere
          lines *= step(0.0, vLocalPos.y);
          
          // Apply dark line
          vec3 cutColor = gl_FragColor.rgb * 0.1;
          gl_FragColor.rgb = mix(gl_FragColor.rgb, cutColor, lines);
          `
        );
      }}
    />
  );
}

function Mouse({ position = [0, 0, 0], isDark = true }: any) {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      {/* Mouse body */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        scale={[0.7, 0.52, 1.15]}
      >
        <sphereGeometry args={[0.11, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <MouseMaterial color={isDark ? "#111111" : "#222222"} />

        {/* The Flat Bottom Cap */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.11, 32]} />
          <MouseMaterial color={isDark ? "#111111" : "#222222"} />
        </mesh>
      </mesh>

      {/* Scroll wheel */}
      <mesh
        position={[0, 0.035, 0.075]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.02, 0.02, 0.019, 24]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

function MousePad({ position }: any) {
  return (
    <group position={position}>
      <RoundedBox
        args={[0.8, 0.01, 0.6]}
        radius={0}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="#121212" roughness={1} metalness={0.5} />
      </RoundedBox>
    </group>
  );
}

// Wood grain shader material
function WoodMaterial({ isDark }: { isDark: boolean }) {
  // Darker, richer wood tones (Walnut/Mahogany style)
  const woodColor = isDark ? "#2a1d15" : "#5c4033";
  const grainColor = isDark ? "#150e0a" : "#3e2b22";
  const darkGrainColor = isDark ? "#080503" : "#261a15";

  return (
    <meshStandardMaterial
      color={woodColor}
      roughness={0.6}
      metalness={0.1}
      onBeforeCompile={(shader) => {
        shader.uniforms.grainColor = { value: new THREE.Color(grainColor) };
        shader.uniforms.darkGrainColor = {
          value: new THREE.Color(darkGrainColor),
        };
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>
          varying vec2 vUv2;
          varying vec3 vWorldPos;
          `
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <uv_vertex>",
          `#include <uv_vertex>
          vUv2 = uv;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `#include <common>
          uniform vec3 grainColor;
          uniform vec3 darkGrainColor;
          varying vec2 vUv2;
          varying vec3 vWorldPos;
          
          // Gradient Noise 2D
          vec2 hash2(vec2 p) {
              p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
              return -1.0 + 2.0*fract(sin(p)*43758.5453123);
          }
          
          float gnoise(vec2 p) {
              vec2 i = floor(p);
              vec2 f = fract(p);
              vec2 u = f*f*(3.0-2.0*f);
              return mix( mix( dot( hash2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                               dot( hash2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                          mix( dot( hash2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                               dot( hash2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
          }
          
          float fbm(vec2 p) {
              float f = 0.0;
              mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
              f  = 0.5000*gnoise( p ); p = m*p;
              f += 0.2500*gnoise( p ); p = m*p;
              f += 0.1250*gnoise( p ); p = m*p;
              f += 0.0625*gnoise( p ); p = m*p;
              return f;
          }
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          `
          // Scale UVs for wood grain density - Higher scale for sharper details
          vec2 uv = vUv2 * vec2(15.0, 80.0); 
          
          // Domain warping
          float n = fbm(uv);
          vec2 q = vec2(fbm(uv + vec2(0.0,0.0)), fbm(uv + vec2(5.2,1.3)));
          vec2 r = vec2(fbm(uv + 4.0*q + vec2(1.7,9.2)), fbm(uv + 4.0*q + vec2(8.3,2.8)));
          
          float f = fbm(uv + 4.0*r);
          
          // Wood grain pattern mixing - Sharper contrast
          float grain = smoothstep(0.2, 0.8, f * 0.5 + 0.5);
          
          // Add rings/streaks - Sharper transitions
          float streaks = smoothstep(0.4, 0.5, sin(uv.y * 2.0 + n * 5.0));
          
          // Combine with higher contrast
          vec3 col = mix(diffuse, grainColor, grain * 0.8);
          col = mix(col, darkGrainColor, streaks * 0.5 * grain);
          
          // Add fine high frequency noise for wood pores/texture
          float noise = gnoise(vUv2 * 800.0);
          col -= noise * 0.04; // Subtract noise for pores

          vec4 diffuseColor = vec4(col, opacity);
          `
        );
      }}
    />
  );
}

function WoodenDesk({ isDark }: { isDark: boolean }) {
  return (
    <group>
      {/* Desktop surface */}
      <mesh position={[0, -2.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[5, 0.08, 2.5]} />
        <WoodMaterial isDark={isDark} />
      </mesh>

      {/* Front edge/lip of desk */}
      <mesh position={[0, -2.08, 1.2]} receiveShadow castShadow>
        <boxGeometry args={[5, 0.14, 0.1]} />
        <WoodMaterial isDark={isDark} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-2.3, -3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 2, 2.3]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Right leg */}
      <mesh position={[2.3, -3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 2, 2.3]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Back support beam */}
      <mesh position={[0, -2.8, -1.1]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.1, 0.08]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function usePlasterTexture() {
  return useMemo(() => {
    const width = 512;
    const height = 512;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Add subtle noise
      for (let i = 0; i < 80000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const alpha = Math.random() * 0.05 + 0.01;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }, []);
}

function Walls({ isDark }: { isDark: boolean }) {
  const texture = usePlasterTexture();

  const wallMaterialProps = {
    map: texture,
    color: isDark ? "#2a2a2a" : "#f0ebe3",
    roughness: 0.8,
    metalness: 0.05,
    bumpMap: texture,
    bumpScale: 0.02,
  };

  const baseboardMaterialProps = {
    color: isDark ? "#111111" : "#e8e0d5",
    roughness: 0.7,
    metalness: 0,
  };

  return (
    <group>
      {/* Back wall */}
      <group position={[0, -0.23, -2.5]}>
        {/* Left Panel */}
        <mesh position={[-4.875, 0, 0]} receiveShadow castShadow>
          <planeGeometry args={[5.25, 8]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        {/* Right Panel */}
        <mesh position={[4.875, 0, 0]} receiveShadow castShadow>
          <planeGeometry args={[5.25, 8]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        {/* Top Panel */}
        <mesh position={[0, 3.365, 0]} receiveShadow castShadow>
          <planeGeometry args={[4.5, 1.27]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        {/* Bottom Panel */}
        <mesh position={[0, -2.135, 0]} receiveShadow castShadow>
          <planeGeometry args={[4.5, 3.73]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        <mesh position={[0, -3.8, 0.05]} receiveShadow>
          <boxGeometry args={[15, 0.15, 0.08]} />
          <meshStandardMaterial {...baseboardMaterialProps} />
        </mesh>
      </group>

      {/* Left wall */}
      <group position={[-7.5, -0.23, 2.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow castShadow>
          <planeGeometry args={[10, 8]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        <mesh position={[0, -3.8, 0.05]} receiveShadow>
          <boxGeometry args={[10, 0.15, 0.08]} />
          <meshStandardMaterial {...baseboardMaterialProps} />
        </mesh>
      </group>

      {/* Right wall */}
      <group position={[7.5, -0.23, 2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow castShadow>
          <planeGeometry args={[10, 8]} />
          <meshStandardMaterial {...wallMaterialProps} />
        </mesh>
        <mesh position={[0, -3.8, 0.05]} receiveShadow>
          <boxGeometry args={[10, 0.15, 0.08]} />
          <meshStandardMaterial {...baseboardMaterialProps} />
        </mesh>
      </group>

      {/* Front wall */}
      <group position={[0, -0.23, 7.5]}>
        <mesh receiveShadow castShadow>
          <planeGeometry args={[15, 8]} />
          <meshStandardMaterial {...wallMaterialProps} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, -3.8, -0.05]} receiveShadow>
          <boxGeometry args={[15, 0.15, 0.08]} />
          <meshStandardMaterial {...baseboardMaterialProps} />
        </mesh>
      </group>
    </group>
  );
}

function Ceiling({ isDark }: { isDark: boolean }) {
  const texture = usePlasterTexture();

  return (
    <mesh
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 3.75, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[15.8, 15]} />
      <meshStandardMaterial
        map={texture}
        color={isDark ? "#2a2a2a" : "#f0ebe3"}
        roughness={0.8}
        metalness={0.05}
        bumpMap={texture}
        bumpScale={0.02}
      />
    </mesh>
  );
}

function Floor({ isDark }: { isDark: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.1, 0]} receiveShadow>
      <planeGeometry args={[15.8, 15]} />
      <WoodMaterial isDark={isDark} />
    </mesh>
  );
}

function Pencil({ position, rotation, color = "#FFC107" }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Ferrule */}
      <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Eraser */}
      <mesh position={[0, 0.145, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 16]} />
        <meshStandardMaterial color="#FF69B4" roughness={0.9} />
      </mesh>
      {/* Wood Tip */}
      <mesh
        position={[0, -0.135, 0]}
        rotation={[0, 0, Math.PI]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[0.008, 0.02, 6]} />
        <meshStandardMaterial color="#DEB887" roughness={0.8} />
      </mesh>
      {/* Lead */}
      <mesh position={[0, -0.14, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.002, 0.005, 6]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Pen({ position, rotation, color = "#1E90FF" }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Cap/Clicker */}
      <mesh position={[0, 0.135, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.02, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
      {/* Tip Cone */}
      <mesh
        position={[0, -0.135, 0]}
        rotation={[0, 0, Math.PI]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[0.008, 0.02, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Ballpoint */}
      <mesh position={[0, -0.141, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.002, 8, 8]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function PencilHolder({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isDark,
}: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Cup Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cup Mesh Body */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.07, 0.2, 60, 60, true]} />
        <meshStandardMaterial
          color={isDark ? "#555555" : "#333333"}
          wireframe
          side={THREE.DoubleSide}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Top Rim */}
      <mesh
        position={[0, 0.2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[0.1, 0.005, 8, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Contents */}
      <group position={[0, 0.15, 0]}>
        {/* Item 1: Pencil Yellow */}
        <group rotation={[0, 0.1, 0]}>
          <Pencil
            position={[0, 0, 0.067]}
            rotation={[0.35, 0, 0]}
            color="#FFC107"
          />
        </group>
        {/* Item 2: Pen Blue */}
        <group rotation={[0, 1.1, 0]}>
          <Pen
            position={[0, 0, 0.066]}
            rotation={[0.38, 0, 0]}
            color="#2196F3"
          />
        </group>
        {/* Item 3: Pencil Green */}
        <group rotation={[0, 2.0, 0]}>
          <Pencil
            position={[0, 0, 0.068]}
            rotation={[0.34, 0, 0]}
            color="#4CAF50"
          />
        </group>
        {/* Item 4: Pen Red */}
        <group rotation={[0, 3.2, 0]}>
          <Pen
            position={[0, 0, 0.071]}
            rotation={[0.36, 0, 0]}
            color="#F44336"
          />
        </group>
        {/* Item 5: Pencil Orange */}
        <group rotation={[0, 4.1, 0]}>
          <Pencil
            position={[0, 0, 0.069]}
            rotation={[0.33, 0, 0]}
            color="#FF5722"
          />
        </group>
        {/* Item 6: Pen Purple */}
        <group rotation={[0, 5.3, 0]}>
          <Pen
            position={[0, 0, 0.067]}
            rotation={[0.37, 0, 0]}
            color="#9C27B0"
          />
        </group>
      </group>
    </group>
  );
}

function DeskLamp({ position, rotation = [0, 0, 0], scale = 1, isDark }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Lamp base */}
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.03, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Lower arm segment */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.45, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Joint/hinge */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Upper arm segment - angled forward */}
      <mesh
        position={[0, 0.65, 0.14]}
        rotation={[0.7, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.018, 0.018, 0.45, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lamp Head Assembly - Attached to end of upper arm */}
      <group position={[0, 0.82, 0.29]}>
        {/* Connection Hinge (Horizontal cylinder) */}
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 16]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Lamp Head Pivot Group */}
        {/* Rotated to point down and slightly back towards base */}
        <group rotation={[3.1, 0, 0]}>
          {/* Connector from hinge to shade */}
          <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.08, 16]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Shade Group */}
          <group position={[0, 0.08, 0]}>
            {/* Lamp Shade */}
            <mesh rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
              <coneGeometry args={[0.12, 0.18, 32, 1, true]} />
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.85}
                roughness={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Inner Shade */}
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.11, 0.16, 32, 1, true]} />
              <meshStandardMaterial
                color={isDark ? "#ffeaa7" : "#f5f5f5"}
                emissive={isDark ? "#ffeaa7" : "#000000"}
                emissiveIntensity={isDark ? 0.3 : 0}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Light Bulb */}
            <mesh position={[0, 0.04, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color="#fffbe6"
                emissive={isDark ? "#ffeaa7" : "#000000"}
                emissiveIntensity={isDark ? 2 : 0}
              />
            </mesh>

            {/* Twist Switch */}
            <group position={[0, -0.12, 0]}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} />
                <meshStandardMaterial
                  color="#111111"
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
            </group>

            {/* Light Source */}
            {isDark && (
              <pointLight
                position={[0, -0.05, 0]}
                intensity={3.5}
                color="#ffeaa7"
                distance={3}
                decay={2}
              />
            )}
          </group>
        </group>
      </group>
    </group>
  );
}

function MugDesign({ scale = 1 }: { scale?: number }) {
  const mnPlaid = useTexture("/assets/mnPlaid.png");

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Transparent background
      ctx.clearRect(0, 0, 800, 800);

      // Apply scale
      ctx.save();
      ctx.translate(306, 426);
      ctx.scale(scale, scale);
      ctx.translate(-256, -256);

      // Draw Text
      ctx.fillStyle = "#000000";
      ctx.font = "900 200px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Grid positions - Adjusted to be more centered to avoid clipping
      const pos1 = 160;
      const pos2 = 322;

      // Top Left: H
      ctx.fillText("H", pos1, pos1);
      // Bottom Left: M
      ctx.fillText("M", pos1, pos2);
      // Bottom Right: E
      ctx.fillText("E", pos2, pos2);

      // Top Right: MN Image
      if (mnPlaid.image) {
        const imgSize = 180;
        ctx.drawImage(
          mnPlaid.image as CanvasImageSource,
          pos2 - imgSize / 2 + 25,
          pos1 - imgSize / 2 - 25,
          imgSize,
          imgSize
        );
      }

      ctx.restore();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [mnPlaid, scale]);

  return (
    <mesh position={[0, 0, 0]}>
      {/* Tapered cylinder segment to match mug */}
      <cylinderGeometry
        args={[
          0.0805, // radiusTop
          0.0805, // radiusBottom
          0.19, // height
          32, // radialSegments
          1, // heightSegments
          true, // openEnded
          Math.PI / 16, // thetaStart
          Math.PI / 2, // thetaLength
        ]}
      />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        roughness={0.3}
        metalness={0.0}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function CoffeeMug({ position, scale = 1, isDark }: any) {
  const mugColor = "#f8f8f8";
  const innerColor = "#eeeeee";

  return (
    <group position={position} scale={scale}>
      {/* Mug body - ceramic (Outer Shell) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.065, 0.18, 32, 1, true]} />
        <meshStandardMaterial
          color={mugColor}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      <MugDesign scale={1.75} />

      {/* Mug Bottom */}
      <mesh
        position={[0, -0.09, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.065, 32]} />
        <meshStandardMaterial
          color={mugColor}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Mug inner wall */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.07, 0.055, 0.16, 32, 1, true]} />
        <meshStandardMaterial
          color={innerColor}
          roughness={0.3}
          metalness={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Mug Rim */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.07, 0.08, 32]} />
        <meshStandardMaterial
          color={mugColor}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Handle */}
      <mesh
        position={[-0.05, 0, 0.05]}
        rotation={[0, Math.PI * 0.25, -Math.PI * 1.48]}
      >
        <torusGeometry args={[0.045, 0.012, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={mugColor}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.068, 0.068, 0.01, 32]} />
        <meshStandardMaterial color="#3c2f2f" roughness={0.2} metalness={0.0} />
      </mesh>
    </group>
  );
}

function Window({ position, rotation, isDark }: any) {
  const width = 4.5;
  const height = 3;
  const frameThickness = 0.15;
  const frameDepth = 0.2;

  // Vertical Blinds
  const slats: any[] = [];
  const count = 15;
  const slatWidth = 0.25;
  const gap = width / count;

  for (let i = 0; i < count; i++) {
    slats.push(
      <mesh
        key={i}
        position={[(i - (count - 1) / 2) * gap, 0, 0]}
        rotation={[0, Math.PI / 2.35, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[slatWidth, height - 0.05, 0.02]} />
        <meshStandardMaterial
          color={isDark ? "#2a2a2a" : "#f0f0f0"}
          roughness={0.5}
        />
      </mesh>
    );
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Window Frame Group */}
      <group>
        {/* Top */}
        <mesh
          position={[0, height / 2 + frameThickness / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[width + frameThickness * 2, frameThickness, frameDepth]}
          />
          <WoodMaterial isDark={isDark} />
        </mesh>
        {/* Bottom */}
        <mesh
          position={[0, -(height / 2 + frameThickness / 2), 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[width + frameThickness * 2, frameThickness, frameDepth]}
          />
          <WoodMaterial isDark={isDark} />
        </mesh>
        {/* Left */}
        <mesh
          position={[-(width / 2 + frameThickness / 2), 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[frameThickness, height, frameDepth]} />
          <WoodMaterial isDark={isDark} />
        </mesh>
        {/* Right */}
        <mesh
          position={[width / 2 + frameThickness / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[frameThickness, height, frameDepth]} />
          <WoodMaterial isDark={isDark} />
        </mesh>
      </group>

      {/* Glass Pane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial
          transparent
          opacity={1}
          roughness={0}
          metalness={0.95}
          clearcoat={1}
          clearcoatRoughness={0}
          color={isDark ? "#03002e" : "#FFFFFF"}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Blinds */}
      <group position={[0, 0, 0.05]}>{slats}</group>
    </group>
  );
}

function Marker({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      {/* Body - White tapered cylinder */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 0.15, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Cap - Colored */}
      <mesh position={[0, 0.045, 0]} castShadow>
        <cylinderGeometry args={[0.017, 0.017, 0.045, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* End cap - Colored small detail */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.045, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Whiteboard({ position, rotation, isDark }: any) {
  const texture = useTexture("/assets/whiteboard.png");

  return (
    <group position={position} rotation={rotation}>
      {/* Board Surface */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Whiteboard Image */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.1}
          transparent
        />
      </mesh>

      {/* Frame - Metal Bezel */}
      {/* Top */}
      <mesh position={[0, 1.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.05, 0.08]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -1.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.05, 0.08]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Left */}
      <mesh position={[-1.525, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 2.1, 0.08]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Right */}
      <mesh position={[1.525, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 2.1, 0.08]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Tray */}
      <mesh position={[0, -1.05, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Markers & Eraser on Tray */}
      <group position={[-0.5, -1.03, 0.1]}>
        {/* Black Marker */}
        <Marker position={[-0.4, 0.012, 0]} color="#1a1a1a" />
        {/* Blue Marker */}
        <Marker position={[-0.1, 0.012, 0]} color="#0000cc" />
        {/* Green Marker */}
        <Marker position={[0.2, 0.012, 0]} color="#00cc00" />

        {/* Eraser */}
        <mesh position={[0.6, 0.02, 0.02]} castShadow>
          <boxGeometry args={[0.15, 0.04, 0.08]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
    </group>
  );
}

function BookCoverMaterial({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.8}
      metalness={0.1}
      onBeforeCompile={(shader) => {
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>
          varying vec2 vUv2;
          `
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <uv_vertex>",
          `#include <uv_vertex>
          vUv2 = uv;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `#include <common>
          varying vec2 vUv2;
          
          float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `#include <dithering_fragment>
          
          // Simple noise for texture
          float noise = random(vUv2 * 100.0);
          float texture = mix(0.85, 1.0, noise);
          
          gl_FragColor.rgb *= texture;
          `
        );
      }}
    />
  );
}

function BookPageMaterial() {
  return (
    <meshStandardMaterial
      color="#fdfbf7"
      roughness={0.9}
      onBeforeCompile={(shader) => {
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>
          varying vec3 vLocalPos;
          `
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          vLocalPos = position;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `#include <common>
          varying vec3 vLocalPos;
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `#include <dithering_fragment>
          
          // Use x position to create page lines
          float pagePos = vLocalPos.x * 800.0;
          
          // Consistent spacing: every 8 "units" we have a dark line
          // This creates a regular pattern of lines
          float pattern = mod(pagePos, 8.0);
          
          // Create a dark line when the pattern is near the end of the cycle
          float isDarkLine = step(7.5, pattern);
          
          // Also add some subtle variation to all pages
          float subtleVariation = 0.95 + 0.05 * sin(pagePos * 0.5);
          
          // Dark lines are significantly darker to look like gaps
          float brightness = mix(subtleVariation, 0.4, isDarkLine);
          
          gl_FragColor.rgb *= brightness;
          `
        );
      }}
    />
  );
}

function Book({ position, width, height, depth, color, title }: any) {
  // Dynamic font size based on spine width and title length
  const fontSize = Math.min(width * 0.65, 0.05);
  const coverThickness = 0.005;

  return (
    <group position={position}>
      {/* Spine */}
      <mesh
        position={[0, 0, depth / 2 - coverThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, coverThickness]} />
        <BookCoverMaterial color={color} />
      </mesh>

      {/* Front Cover (Right) */}
      <mesh
        position={[width / 2 - coverThickness / 2, 0, -coverThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[coverThickness, height, depth - coverThickness]} />
        <BookCoverMaterial color={color} />
      </mesh>

      {/* Back Cover (Left) */}
      <mesh
        position={[-width / 2 + coverThickness / 2, 0, -coverThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[coverThickness, height, depth - coverThickness]} />
        <BookCoverMaterial color={color} />
      </mesh>

      {/* Pages */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[width - coverThickness * 2.5, height - 0.02, depth - 0.02]}
        />
        <BookPageMaterial />
      </mesh>

      <Text
        position={[0, 0, depth / 2 + 0.001]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={fontSize}
        anchorX="center"
        anchorY="middle"
        maxWidth={height * 0.9}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        // @ts-expect-error asdf
        text={title}
      >
        <meshStandardMaterial
          attach="material"
          color="#ffffff"
          roughness={0.5}
        />
      </Text>
    </group>
  );
}

function Chain({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  const vec = useMemo(
    () => new THREE.Vector3().subVectors(endVec, startVec),
    [startVec, endVec]
  );
  const length = vec.length();
  const linkSize = 0.04;
  const linkThickness = 0.006;
  const count = Math.floor(length / (linkSize * 0.65));

  const quaternion = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    return new THREE.Quaternion().setFromUnitVectors(
      up,
      vec.clone().normalize()
    );
  }, [vec]);

  const links = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  return (
    <group position={start} quaternion={quaternion}>
      {links.map((i) => (
        <group
          key={i}
          position={[0, i * (length / count), 0]}
          rotation={[0, ((i % 2) * Math.PI) / 2, 0]}
        >
          <mesh castShadow receiveShadow scale={[1, 1.4, 1]}>
            <torusGeometry args={[linkSize / 2, linkThickness, 8, 16]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Bookend({ position }: any) {
  const start: [number, number, number] = [0, 0, 0.25];
  const end: [number, number, number] = [0, 0.4, -0.15];

  return (
    <group position={position}>
      {/* Shelf Mount */}
      <mesh position={start} castShadow receiveShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 16]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh
        position={[start[0], start[1] + 0.005, start[2]]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[0.01, 0.003, 8, 16]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wall Mount */}
      <mesh
        position={end}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.02, 0.02, 0.005, 16]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Chain */}
      <Chain start={start} end={end} />
    </group>
  );
}

function Bookshelf({ position, isDark, books }: any) {
  const shelfWidth = 1.8;
  const shelfDepth = 0.55;
  const shelfThickness = 0.05;
  const bookendThickness = 0.02;

  // LED strip settings
  const ledStripWidth = shelfWidth - 0.1;
  const ledStripHeight = 0.015;
  const ledStripDepth = 0.02;
  const ledColor = "#ffcc66";
  const ledIntensity = isDark ? 1.5 : 0;

  let currentX = -shelfWidth / 2 + bookendThickness + 0.05;

  return (
    <group position={position}>
      {/* Shelf Board */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[shelfWidth, shelfThickness, shelfDepth]} />
        <WoodMaterial isDark={isDark} />
      </mesh>

      {/* LED Strip - mounted under the front lip of shelf above books */}
      <group
        position={[
          0,
          shelfThickness / 2 + ledStripHeight / 2,
          shelfDepth / 2 - ledStripDepth / 2,
        ]}
      >
        {/* LED Strip Housing */}
        <mesh>
          <boxGeometry args={[ledStripWidth, ledStripHeight, ledStripDepth]} />
          <meshStandardMaterial
            color={isDark ? "#333333" : "#444444"}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        {/* Individual LED lights along the strip */}
        {Array.from({ length: 7 }).map((_, i) => {
          const ledSpacing = ledStripWidth / 7;
          const xPos = -ledStripWidth / 2 + ledSpacing / 2 + i * ledSpacing;
          return (
            <group key={i} position={[xPos, -ledStripHeight / 2, 0]}>
              {/* LED Light Surface - angled upward toward books */}
              <mesh
                rotation={[Math.PI * 0.015, 0, 0]}
                position={[0, 0, -0.005]}
              >
                <boxGeometry args={[0.08, 0.005, 0.015]} />
                <meshStandardMaterial
                  color={ledColor}
                  emissive={ledColor}
                  emissiveIntensity={ledIntensity}
                  toneMapped={false}
                />
              </mesh>
              {/* Spot light for actual illumination in dark mode - angled up */}
              {isDark && (
                <spotLight
                  position={[0, 0, -0.2]}
                  target-position={[0, 0.5, -0.4]}
                  color={ledColor}
                  intensity={0.4}
                  distance={1}
                  angle={Math.PI * 10}
                  penumbra={0.5}
                  decay={1.5}
                />
              )}
            </group>
          );
        })}
      </group>

      {/* Left Bookend */}
      <Bookend position={[-shelfWidth / 2, shelfThickness / 2, 0]} />

      {/* Right Bookend */}
      <Bookend position={[shelfWidth / 2, shelfThickness / 2, 0]} />

      {/* Books */}
      {books.map((book: any, i: number) => {
        const bookPos = [
          currentX + book.width / 2,
          book.height / 2 + shelfThickness / 2,
          0,
        ];
        currentX += book.width + 0.05;
        return (
          <Book
            key={i}
            position={bookPos}
            width={book.width}
            height={book.height}
            depth={shelfDepth * 0.85}
            color={book.color}
            title={book.title}
          />
        );
      })}
    </group>
  );
}

function TrashCan({ position, scale = 1, isDark }: any) {
  const canColor = isDark ? "#2a2a2a" : "#dddddd";

  return (
    <group position={position} scale={scale}>
      {/* Can Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.6, 32, 1, true]} />
        <meshStandardMaterial
          color={canColor}
          roughness={0.5}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Can Bottom */}
      <mesh
        position={[0, -0.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial
          color={canColor}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Rim */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.24, 0.26, 32]} />
        <meshStandardMaterial
          color={canColor}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Trash inside */}
      <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#000000" roughness={1} />
      </mesh>

      {/* Crumpled paper */}
      <mesh position={[0.1, -0.28, 0.05]} rotation={[1, 2, 3]} castShadow>
        <dodecahedronGeometry args={[0.06, 0]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      <mesh position={[-0.1, -0.28, -0.05]} rotation={[2, 1, 0]} castShadow>
        <dodecahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      <mesh
        position={[0.02, -0.28, -0.02]}
        rotation={[0.5, 0.5, 0.5]}
        castShadow
      >
        <dodecahedronGeometry args={[0.065, 0]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
    </group>
  );
}

function PC({ position, scale = 1, isDark }: any) {
  return (
    <group position={position} scale={scale}>
      {/* Main Case Body */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 1.2, 1.2]} />
        <meshStandardMaterial
          color={"#e0e0e0"}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Case Legs */}
      {[
        [-0.2, 0.05, 0.5],
        [0.2, 0.05, 0.5],
        [-0.2, 0.05, -0.5],
        [0.2, 0.05, -0.5],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={new THREE.Vector3(...pos)}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}

      {/* Front Panel Details Group */}
      <group position={[0, 1.3, 0.53]} rotation={[Math.PI * 1.5, 0, 0]}>
        {/* Headphone Jack */}
        <mesh position={[-0.01, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.01, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* USB "C" */}
        <mesh position={[0.03, 0, 0]}>
          <boxGeometry args={[0.015, 0.035, 0.01]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* USB A */}
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.025, 0.055, 0.01]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* Power Button */}
        <group position={[0.15, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 32]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* LED Ring */}
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0.001]}>
            <ringGeometry args={[0.02, 0.03, 32]} />
            <meshBasicMaterial color={"#ffffff"} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function DeskGroup({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isDark,
}: any) {
  return (
    <group position={position} rotation={rotation}>
      <WoodenDesk isDark={isDark} />

      {/* Main Monitor - centered on desk */}
      <Monitor
        position={[0, -1.3, -0.7]}
        text="Michael Ongaro"
        subtext="Full Stack Developer"
        isDark={isDark}
        screenColor={isDark ? "#0a0a15" : "#f8f9fa"}
        image={headshot}
      />

      {/* Side Monitor - angled */}
      <Monitor
        position={[-1.62, -1.3, -0.35]}
        rotation={[0, 0.5, 0]}
        isDark={isDark}
        screenColor={isDark ? "#0a0512" : "#f8f9fa"}
        screenImage="/assets/altMonitor.png"
      />

      {/* Keyboard */}
      <Keyboard position={[0, -2, 0.6]} rotation={[0, 0, 0]} isDark={isDark} />

      {/* Mouse Pad */}
      <MousePad position={[1.3, -2.008, 0.55]} />

      {/* Mouse - to the right of keyboard */}
      <Mouse position={[1.3, -2.005, 0.55]} isDark={isDark} />

      {/* Desk accessories */}
      <PencilHolder
        position={[1.15, -2, -0.7]}
        rotation={[0, 0.5, 0]}
        scale={1.8}
        isDark={isDark}
      />

      <DeskLamp
        position={[1.8, -2, -0.5]}
        rotation={[0, -1.2, 0]}
        scale={1.8}
        isDark={isDark}
      />
      <CoffeeMug position={[-1.6, -1.9, 0.5]} scale={1.35} isDark={isDark} />

      {/* Trash Can - Left of desk */}
      <TrashCan position={[-3.2, -3.65, 0.5]} scale={1.5} isDark={isDark} />

      {/* PC - Right of desk */}
      <PC position={[3.2, -4.1, 0.5]} isDark={isDark} />
    </group>
  );
}

function CanvasLoader({ isDark }: any) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50 pointer-events-none">
      <div className="flex flex-col gap-8 justify-center size-64 shadow-lg rounded-lg z-10 items-center bg-white dark:bg-stone-800 border dark:border-stone-700 p-8">
        <LoadingSpinner className="size-16" />
        <span className="text-lg font-medium">Loading</span>
      </div>

      <img
        src={isDark ? darkPlaceholder : lightPlaceholder}
        style={{
          filter: "blur(8px)",
        }}
        className="w-full absolute inset-0 h-full object-cover"
        alt="Loading Scene"
      />
    </div>
  );
}

function SceneReady({ setLoaded }: { setLoaded: (loaded: boolean) => void }) {
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  return null;
}

export default function Scene() {
  const { theme, toggleTheme } = useTheme();
  const { isExploring, setIsExploring } = useExploration();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isPending, startTransition] = useTransition();

  const controlsRef = useRef<any>(null);
  const [isAtDefault, setIsAtDefault] = useState(true);

  const handleReset = () => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object;

    // Default values
    const defaultPos = new THREE.Vector3(0, -1, 1.7);
    const defaultTarget = new THREE.Vector3(0, -1.35, 0);

    // Animate
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();

    const obj = { t: 0 };
    anime({
      targets: obj,
      t: 1,
      duration: 1000,
      easing: "easeInOutQuad",
      update: () => {
        camera.position.lerpVectors(startPos, defaultPos, obj.t);
        controls.target.lerpVectors(startTarget, defaultTarget, obj.t);
        controls.update();
      },
      complete: () => {
        setIsAtDefault(true);
      },
    });
  };

  const checkIsAtDefault = () => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object;

    const defaultPos = new THREE.Vector3(0, -1, 3.5);
    const defaultTarget = new THREE.Vector3(0, -1.3, -0.3);

    const distPos = camera.position.distanceTo(defaultPos);
    const distTarget = controls.target.distanceTo(defaultTarget);

    const isDefault = distPos < 0.05 && distTarget < 0.05;
    if (isDefault !== isAtDefault) {
      setIsAtDefault(isDefault);
    }
  };

  useEffect(() => {
    // Delay the heavy canvas rendering to allow the spinner to appear smoothly
    const timer = setTimeout(() => {
      startTransition(() => {
        setShouldRender(true);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topShelfBooks = [
    {
      title: "The Pragmatic Programmer",
      color: "#2c3e50",
      width: 0.1404,
      height: 0.4992,
    },
    { title: "Clean Code", color: "#f1c40f", width: 0.1248, height: 0.468 },
    { title: "Refactoring", color: "#e74c3c", width: 0.1248, height: 0.4836 },
    {
      title: "The Mythical Man-Month",
      color: "#3498db",
      width: 0.1812,
      height: 0.4368,
    },
  ];

  const middleShelfBooks = [
    {
      title: "Introduction to Algorithms",
      color: "#27ae60",
      width: 0.1716,
      height: 0.546,
    },
    {
      title: "Design Patterns",
      color: "#7f8c8d",
      width: 0.1452,
      height: 0.468,
    },
    {
      title: "Designing Data-Intensive Applications",
      color: "#c0392b",
      width: 0.2244,
      height: 0.4992,
    },
    {
      title: "Clean Architecture",
      color: "#f39c12",
      width: 0.1452,
      height: 0.468,
    },
  ];

  const bottomShelfBooks = [
    {
      title: "Eloquent JavaScript",
      color: "#f1c40f",
      width: 0.1608,
      height: 0.468,
    },
    {
      title: "CSS: The Definitive Guide",
      color: "#2980b9",
      width: 0.156,
      height: 0.5148,
    },
    {
      title: "Refactoring UI",
      color: "#8e44ad",
      width: 0.1092,
      height: 0.4524,
    },
    {
      title: "Test Driven Development",
      color: "#16a085",
      width: 0.1536,
      height: 0.4368,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-10 ${
        isLoaded && isExploring ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {!isLoaded && <CanvasLoader isDark={isDark} />}

      {isLoaded && (
        <div className="absolute bottom-12 sm:bottom-16 z-20 w-full flex items-center justify-center gap-4 pointer-events-none">
          {/* Reset Button */}
          <div
            className={`${
              isExploring
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={handleReset}
              disabled={isAtDefault}
              className={`flex items-center border dark:border-stone-700 justify-center size-[40px] sm:size-[50px] rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Reset View"
            >
              <IoRefresh className="size-5 sm:size-7" />
            </button>
          </div>

          {/* Explore Button */}
          <button
            onClick={() => {
              if (isExploring === false) {
                window.scroll(0, 0);
                setTimeout(() => {
                  // very hacky solution, trying to force mobile browser's controls
                  // to appear so there isn't "dead space" since <Hero> is capped at 100svh,
                  // not dvh (caused visual flickering otherwise)
                  window.scrollBy(0, -300);
                }, 1000);
              }

              setIsExploring(!isExploring);
            }}
            className={`pointer-events-auto flex font-medium sm:h-[60px] h-[50px] z-20 text-lg sm:text-xl items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg ${
              isExploring
                ? "p-2 sm:p-4 w-[50px] sm:w-[60px] justify-center"
                : "sm:px-8 sm:py-4 py-3 px-6"
            }`}
          >
            {isExploring ? (
              <IoClose className="size-6 sm:size-8 w-[34px] sm:w-[28px]" />
            ) : (
              <>
                <LuRotate3D className="size-5 sm:size-6" />
                Explore
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <div
            className={`${
              isExploring
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={toggleTheme}
              className="flex items-center border dark:border-stone-700 justify-center size-[40px] sm:size-[50px] rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? (
                <IoSunny className="size-5 sm:size-7" />
              ) : (
                <IoMoon className="size-5 sm:size-7" />
              )}
            </button>
          </div>
        </div>
      )}

      {shouldRender && (
        <Canvas
          shadows={"percentage"}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
          }}
          style={{
            // pointerEvents: isExploring ? "auto" : "none",
            touchAction: isExploring ? "none" : "pan-y",
          }}
          className="z-10"
        >
          <PerspectiveCamera makeDefault position={[0, -1, 1.7]} fov={50} />

          <Suspense fallback={null}>
            <SceneReady setLoaded={setIsLoaded} />

            {/* Environment for reflections */}
            <Environment
              // preset={isDark ? "night" : "forest"}
              files={
                isDark
                  ? "/assets/rogland_clear_night_1k.exr"
                  : "/assets/pretoria_gardens_1k.exr"
              }
            />

            {/* Lighting Setup */}
            {isDark ? (
              <>
                {/* Dark mode - only monitor glow */}
                <ambientLight intensity={0.02} />

                {/* Main monitor glow */}
                <pointLight
                  position={[0, -0.5, -0.5]}
                  intensity={1.5}
                  color="#4a90d9"
                  distance={5}
                  decay={2}
                />

                {/* Side monitor glow */}
                <pointLight
                  position={[-2.8, -0.5, -0.3]}
                  intensity={0.8}
                  color="#9b59b6"
                  distance={4}
                  decay={2}
                />

                {/* Subtle fill light */}
                <pointLight
                  position={[0, 2, 2]}
                  intensity={0.1}
                  color="#4a90d9"
                  distance={8}
                  decay={2}
                />
              </>
            ) : (
              <>
                {/* Light mode - warm sunlight through blinds */}
                <ambientLight intensity={0.3} color="#fff0e0" />

                {/* Main sunlight source - Warm and bright */}
                <directionalLight
                  position={[0.5, 2.75, -3]}
                  intensity={10}
                  color="#ffaa55" // Warm golden hour color
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-far={30}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                  shadow-bias={-0.0005}
                  shadow-radius={2} // Soften edges slightly
                />

                {/* Cool fill light from opposite side */}
                <pointLight
                  position={[5, 2, 2]}
                  intensity={0.4}
                  color="#d0e0ff"
                  distance={10}
                  decay={2}
                />
              </>
            )}

            {/* Scene Content */}
            <group position={[0, 0, 0]}>
              <group position={[-4.5, 0, -2.35]}>
                <Bookshelf
                  position={[0, 1.8, 0]}
                  isDark={isDark}
                  books={topShelfBooks}
                />
                <Bookshelf
                  position={[0, 0.9, 0]}
                  isDark={isDark}
                  books={middleShelfBooks}
                />
                <Bookshelf
                  position={[0, 0, 0]}
                  isDark={isDark}
                  books={bottomShelfBooks}
                />
              </group>

              <Window
                position={[0, 1, -2.4]}
                rotation={[0, 0, 0]}
                isDark={isDark}
              />

              <Whiteboard
                position={[4.5, 1, -2.45]}
                rotation={[0, 0, 0]}
                isDark={isDark}
              />

              <Walls isDark={isDark} />

              <Ceiling isDark={isDark} />

              <Floor isDark={isDark} />

              <DeskGroup position={[0, 0, -1]} isDark={isDark} />
            </group>

            {/* Post-processing */}
            <EffectComposer>
              <Bloom
                luminanceThreshold={isDark ? 0.8 : 2}
                mipmapBlur
                intensity={isDark ? 0.5 : 0.2}
                radius={0.3}
              />
              <Vignette
                eskil={false}
                offset={0.2}
                darkness={isDark ? 0.6 : 0.3}
              />
            </EffectComposer>
          </Suspense>

          <ElasticOrbitControls
            ref={controlsRef}
            onChange={checkIsAtDefault}
            enabled={isExploring}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.75}
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 3}
            minDistance={1}
            maxDistance={isMobile ? 10.5 : 6.5}
            target={[0, -1.35, 0]}
            enableZoom={isExploring}
            enablePan={isExploring}
            mouseButtons={{
              LEFT: isExploring ? THREE.MOUSE.PAN : null,
              MIDDLE: isExploring ? THREE.MOUSE.DOLLY : null,
              RIGHT: isExploring ? THREE.MOUSE.ROTATE : null,
            }}
            touches={{
              ONE: isExploring ? THREE.TOUCH.PAN : null,
              TWO: isExploring ? THREE.TOUCH.DOLLY_ROTATE : null,
            }}
          />
          <Preload all />
        </Canvas>
      )}
    </div>
  );
}
