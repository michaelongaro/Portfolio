import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  PerspectiveCamera,
  ContactShadows,
  Environment,
  Float,
  RoundedBox,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useTheme } from "../../context/ThemeContext";
import * as THREE from "three";
import { useMemo, useRef } from "react";

// --- Components ---

function Monitor({
  position,
  rotation = [0, 0, 0],
  text,
  subtext,
  isDark,
  screenColor = "#1a1a2e",
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
      <mesh position={[0, -0.5, 0.12]} castShadow receiveShadow>
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
      <mesh position={[0, 0, 0.228]}>
        <planeGeometry args={[1.5, 0.85]} />
        <meshStandardMaterial
          color={screenColor}
          emissive={isDark ? "#4a90d9" : "#ffffff"}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

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
        <group position={[0, 0, 0.232]}>
          <Text
            fontSize={0.12}
            color={isDark ? "#ffffff" : "#1a1a1a"}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.08, 0]}
            maxWidth={1.4}
            textAlign="center"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {text}
          </Text>
          {subtext && (
            <Text
              fontSize={0.06}
              color={isDark ? "#8ab4f8" : "#4a5568"}
              anchorX="center"
              anchorY="middle"
              position={[0, -0.08, 0]}
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
              {subtext}
            </Text>
          )}
        </group>
      )}
    </group>
  );
}

function Key({ position, width = 0.09, depth = 0.09, label, isDark }: any) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      // RGB Wave effect
      // Position based offset for wave
      const xOffset = position[0] * 2;
      const yOffset = position[2] * 2;
      const hue = (time * 0.2 + xOffset + yOffset) % 1;
      const color = new THREE.Color().setHSL(hue, 1, 0.6);

      materialRef.current.emissive = color;
      materialRef.current.emissiveIntensity = 0.8;
      materialRef.current.color = new THREE.Color(0.1, 0.1, 0.1); // Dark base
    }
  });

  // Font size adjustment
  const isSmall = label && (label.length > 1 || !/^[a-zA-Z0-9]$/.test(label));
  const fontSize = isSmall ? 0.022 : 0.035;

  return (
    <group position={position}>
      {/* Key cap */}
      <RoundedBox
        args={[width, 0.025, depth]}
        radius={0.005}
        smoothness={2}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={materialRef}
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
          anchorX="center"
          anchorY="middle"
          position={[0, 0.014, 0]}
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

function Mouse({ position = [0, 0, 0], isDark = true }: any) {
  // Color scheme
  const bodyColor = isDark ? "#111111" : "#222222";
  const buttonColor = isDark ? "#1a1a1a" : "#2a2a2a";
  const accentColor = isDark ? "#080808" : "#151515";

  return (
    <group position={position}>
      {/* Mouse body: an ellipsoid sphere */}
      <mesh
        position={[0, 0.04, 0]}
        castShadow
        receiveShadow
        scale={[0.7, 0.26, 1.15]}
      >
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial
          color={bodyColor}
          roughness={0.3}
          metalness={0.25}
        />
      </mesh>

      {/* Skirt/chassis for definition */}
      <mesh position={[0, 0.01, 0]} scale={[0.74, 0.045, 1.18]}>
        <sphereGeometry args={[0.105, 24, 24]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Left button */}
      <mesh position={[-0.038, 0.062, 0.07]} scale={[0.33, 0.09, 0.43]}>
        <sphereGeometry args={[0.13, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial
          color={buttonColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* Right button */}
      <mesh position={[0.038, 0.062, 0.07]} scale={[0.33, 0.09, 0.43]}>
        <sphereGeometry args={[0.13, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial
          color={buttonColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Scroll wheel */}
      <mesh
        position={[0, 0.082, 0.09]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.012, 0.012, 0.019, 24]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Wood grain shader material
function WoodMaterial({ isDark }: { isDark: boolean }) {
  const woodColor = isDark ? "#3d2810" : "#8b6331";
  const grainColor = isDark ? "#1a0f05" : "#4a3215";
  const darkGrainColor = isDark ? "#0d0804" : "#2a1a08";

  return (
    <meshStandardMaterial
      color={woodColor}
      roughness={0.82}
      metalness={0.0}
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
          
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
              f.y
            );
          }
          
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            for (int i = 0; i < 5; i++) {
              value += amplitude * noise(p * frequency);
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            return value;
          }
          
          float woodRings(vec2 p) {
            float distortion = fbm(p * 3.0) * 0.3;
            float rings = sin((p.y + distortion) * 60.0) * 0.5 + 0.5;
            rings = pow(rings, 0.8);
            return rings;
          }
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          `
          // Fine grain lines
          float fineGrain = noise(vUv2 * vec2(3.0, 120.0)) * 0.4 + 
                           noise(vUv2 * vec2(6.0, 200.0)) * 0.3 +
                           noise(vUv2 * vec2(2.0, 80.0)) * 0.3;
          fineGrain = smoothstep(0.25, 0.75, fineGrain);
          
          // Medium grain pattern
          float mediumGrain = fbm(vUv2 * vec2(4.0, 50.0));
          mediumGrain = smoothstep(0.3, 0.6, mediumGrain);
          
          // Wood ring pattern
          float rings = woodRings(vUv2 * vec2(1.5, 8.0));
          
          // Knot simulation
          float knot1 = 1.0 - smoothstep(0.0, 0.08, length(vUv2 - vec2(0.3, 0.6)));
          float knot2 = 1.0 - smoothstep(0.0, 0.05, length(vUv2 - vec2(0.7, 0.3)));
          float knots = max(knot1, knot2) * 0.6;
          
          // Combine all grain patterns
          float combinedGrain = fineGrain * 0.5 + mediumGrain * 0.3 + rings * 0.2;
          combinedGrain = clamp(combinedGrain + knots, 0.0, 1.0);
          
          // Create color variation with darker streaks
          vec3 woodCol = mix(diffuse, grainColor, combinedGrain * 0.65);
          
          // Add extra dark grain lines
          float darkLines = noise(vUv2 * vec2(2.0, 150.0));
          darkLines = smoothstep(0.55, 0.65, darkLines);
          woodCol = mix(woodCol, darkGrainColor, darkLines * 0.7);
          
          // Add subtle color variation
          float colorVar = fbm(vUv2 * 5.0) * 0.15;
          woodCol *= (0.9 + colorVar);
          
          vec4 diffuseColor = vec4(woodCol, opacity);
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
        <WoodMaterial isDark={isDark} />
      </mesh>

      {/* Right leg */}
      <mesh position={[2.3, -3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 2, 2.3]} />
        <WoodMaterial isDark={isDark} />
      </mesh>

      {/* Back support beam */}
      <mesh position={[0, -2.8, -1.1]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.1, 0.08]} />
        <WoodMaterial isDark={isDark} />
      </mesh>
    </group>
  );
}

function Wall({ isDark }: { isDark: boolean }) {
  return (
    <group>
      {/* Main wall */}
      <mesh position={[0, 0, -2.5]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial
          color={isDark ? "#1a1a1a" : "#f0ebe3"}
          roughness={0.95}
          metalness={0}
          onBeforeCompile={(shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <common>",
              `#include <common>
              float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
              }
              `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              "vec4 diffuseColor = vec4( diffuse, opacity );",
              `
              vec2 uv = gl_FragCoord.xy / 200.0;
              float noise = hash(floor(uv * 50.0)) * 0.03;
              vec3 wallCol = diffuse + noise - 0.015;
              vec4 diffuseColor = vec4(wallCol, opacity);
              `
            );
          }}
        />
      </mesh>
      {/* Subtle baseboard */}
      <mesh position={[0, -3.8, -2.45]} receiveShadow>
        <boxGeometry args={[12, 0.15, 0.08]} />
        <meshStandardMaterial
          color={isDark ? "#111111" : "#e8e0d5"}
          roughness={0.7}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function Floor({ isDark }: { isDark: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.1, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial
        color={isDark ? "#0a0a0a" : "#e0d5c5"}
        roughness={0.8}
        metalness={0}
      />
    </mesh>
  );
}

function DeskLamp({ position, rotation = [0, 0, 0], isDark }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Lamp base - heavy weighted base */}
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.05, 32]} />
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
            <mesh position={[0, -0.02, 0]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial
                color="#fffbe6"
                emissive={isDark ? "#ffeaa7" : "#000000"}
                emissiveIntensity={isDark ? 2 : 0}
              />
            </mesh>

            {/* Twist Switch */}
            <group position={[0, 0, 0]}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
                <meshStandardMaterial
                  color="#111111"
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
              <mesh
                position={[0, 0.015, 0]}
                rotation={[0, 0, Math.PI / 4]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.008, 0.04, 0.008]} />
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
                intensity={0.8}
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

function CoffeeMug({ position, isDark }: any) {
  return (
    <group position={position}>
      {/* Mug body - ceramic */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.065, 0.18, 32]} />
        <meshStandardMaterial
          color={isDark ? "#4a4a4a" : "#f8f8f8"}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
      {/* Mug inner wall (darker) */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.07, 0.055, 0.16, 32, 1, true]} />
        <meshStandardMaterial
          color={isDark ? "#3a3a3a" : "#eeeeee"}
          roughness={0.3}
          metalness={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI * 1.48]}>
        <torusGeometry args={[0.045, 0.015, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={isDark ? "#4a4a4a" : "#f8f8f8"}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.068, 0.068, 0.01, 32]} />
        <meshStandardMaterial
          color="#2d1810"
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 z-10">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={40} />

        {/* Environment for reflections */}
        <Environment preset={isDark ? "night" : "apartment"} />

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
            {/* Light mode - warm natural sunlight from left */}
            <ambientLight intensity={0.3} color="#fff8f0" />

            {/* Main sunlight from left window */}
            <directionalLight
              position={[-8, 6, 2]}
              intensity={3}
              color="#fff4e6"
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={20}
              shadow-camera-left={-8}
              shadow-camera-right={8}
              shadow-camera-top={8}
              shadow-camera-bottom={-8}
              shadow-bias={-0.0001}
            />

            {/* Secondary fill light from right */}
            <directionalLight
              position={[5, 3, 3]}
              intensity={0.5}
              color="#e6f0ff"
            />

            {/* Soft top fill */}
            <pointLight
              position={[0, 3, 1]}
              intensity={0.3}
              color="#ffffff"
              distance={10}
              decay={2}
            />
          </>
        )}

        {/* Scene Content */}
        <group position={[0, 0, 0]}>
          {/* Wall */}
          <Wall isDark={isDark} />

          {/* Floor */}
          <Floor isDark={isDark} />

          {/* Wooden Desk */}
          <WoodenDesk isDark={isDark} />

          {/* Main Monitor - centered on desk */}
          <Monitor
            position={[0.3, -1.3, -0.7]}
            text="Hi, I'm Michael"
            subtext="Full Stack Developer"
            isDark={isDark}
            screenColor={isDark ? "#0a0a15" : "#f8f9fa"}
          />

          {/* Side Monitor - angled */}
          <Monitor
            position={[-1.35, -1.3, -0.35]}
            rotation={[0, 0.45, 0]}
            isDark={isDark}
            screenColor={isDark ? "#0a0512" : "#f8f9fa"}
          />

          {/* Keyboard */}
          <Keyboard
            position={[0.2, -2, 0.6]}
            rotation={[0, 0, 0]}
            isDark={isDark}
          />

          {/* Mouse - to the right of keyboard */}
          <Mouse position={[1.5, -2.01, 0.55]} isDark={isDark} />

          {/* Desk accessories */}
          <DeskLamp
            position={[1.9, -2, -0.5]}
            rotation={[0, -2, 0]}
            isDark={isDark}
          />
          <CoffeeMug position={[-1.6, -1.92, 0.5]} isDark={isDark} />
        </group>

        {/* Contact shadows on desk */}
        <ContactShadows
          position={[0, -2.01, 0]}
          opacity={isDark ? 0.3 : 0.5}
          scale={6}
          blur={1.5}
          far={2}
        />

        {/* Post-processing - minimal to keep scene sharp */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={isDark ? 0.8 : 2}
            mipmapBlur
            intensity={isDark ? 0.5 : 0.2}
            radius={0.3}
          />
          <Vignette eskil={false} offset={0.2} darkness={isDark ? 0.6 : 0.3} />
        </EffectComposer>

        <OrbitControls
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 8}
          maxAzimuthAngle={Math.PI / 8}
          target={[0, -1.3, -0.3]}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
}
