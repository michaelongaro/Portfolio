import { memo, useEffect, useMemo } from "react";
import * as THREE from "three";
import { createGuitarModel, guitarFinishes, woodFinishes } from "./guitarModels";

const guitars = [
  { kind: "electric", side: -1, name: "Yellow electric guitar" },
  { kind: "acoustic", side: 1, name: "Natural acoustic guitar" },
] as const;

const GUITAR_SCALE = 2.7;
const WALL_CLEARANCE = 0.85;

function createWoodGrain() {
  const width = 256;
  const height = 128;
  const pixels = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const warpedX = x + 0.9 * Math.sin(y * 0.046 + x * 0.017);
      const latewood = Math.sin(warpedX * 0.74 + 1.8 * Math.sin(x * 0.095));
      const fineGrain = Math.sin(warpedX * 2.1 + Math.sin(y * 0.12));
      const color = Math.round(242 + 5 * latewood + 4 * fineGrain);
      const offset = (y * width + x) * 4;
      pixels[offset] = color;
      pixels[offset + 1] = color;
      pixels[offset + 2] = color;
      pixels[offset + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(pixels, width, height);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function createHeadstockDecal() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 112;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "#211c19";
    context.textBaseline = "middle";
    context.font = "italic 700 64px 'Segoe Script', 'Brush Script MT', cursive";
    context.fillText("Squier", 14, 54, 235);
    context.font = "600 25px Arial, sans-serif";
    context.fillText("STRATOCASTER", 264, 54, 234);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type GuitarsProps = {
  floorY: number;
  sideWallX: number;
  deskWallZ: number;
  centerZ: number;
};

export const Guitars = memo(function Guitars({
  floorY,
  sideWallX,
  deskWallZ,
  centerZ,
}: GuitarsProps) {
  const grain = useMemo(createWoodGrain, []);
  const decal = useMemo(createHeadstockDecal, []);
  const models = useMemo(
    () => guitars.map((guitar) => ({ ...guitar, parts: createGuitarModel(guitar.kind) })),
    [],
  );

  useEffect(() => () => {
    grain.dispose();
    decal.dispose();
    for (const { parts } of models) {
      for (const { geometry } of parts) geometry.dispose();
    }
  }, [grain, decal, models]);

  const z = deskWallZ + WALL_CLEARANCE;

  return models.map(({ kind, side, name, parts }) => {
    const x = side * (sideWallX - WALL_CLEARANCE);
    // The guitar's local +Z axis points from its stand toward the room center.
    const yaw = Math.atan2(-x, centerZ - z);

    return (
      <group
        key={kind}
        name={name}
        position={[x, floorY, z]}
        rotation={[0, yaw, 0]}
        scale={GUITAR_SCALE}
      >
        {parts.map(({ finish, geometry }) => (
          <mesh
            key={finish}
            geometry={geometry}
            castShadow={finish !== "wire" && finish !== "chrome" && finish !== "rosette" && finish !== "decal"}
            receiveShadow
          >
            {finish === "yellow" ? (
              <meshPhysicalMaterial {...guitarFinishes[finish]} />
            ) : (
              <meshStandardMaterial
                {...guitarFinishes[finish]}
                map={finish === "decal" ? decal : woodFinishes.has(finish) ? grain : null}
              />
            )}
          </mesh>
        ))}
      </group>
    );
  });
});
