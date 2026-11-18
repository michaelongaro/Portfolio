import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const guitarFinishes = {
  yellow: { color: "#ffc20b", roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.12 },
  spruce: { color: "#f5d6ab", roughness: 0.46 },
  maple: { color: "#d9aa76", roughness: 0.42 },
  rosewood: { color: "#513729", roughness: 0.68 },
  walnut: { color: "#583725", roughness: 0.45 },
  cavity: { color: "#231610", roughness: 0.95 },
  white: { color: "#f4f2ec", roughness: 0.35 },
  ivory: { color: "#f2e4c8", roughness: 0.52 },
  black: { color: "#151619", roughness: 0.48 },
  decal: { color: "#ffffff", roughness: 0.48, alphaTest: 0.3 },
  rosette: { color: "#465660", roughness: 0.48 },
  chrome: { color: "#c7cbd0", metalness: 0.74, roughness: 0.26 },
  wire: { color: "#c5b69e", metalness: 0.57, roughness: 0.4 },
  frame: { color: "#222326", metalness: 0.35, roughness: 0.56 },
  rubber: { color: "#151516", roughness: 0.94 },
} satisfies Record<string, THREE.MeshPhysicalMaterialParameters>;

export type GuitarFinish = keyof typeof guitarFinishes;
export type GuitarKind = "electric" | "acoustic";

export const woodFinishes = new Set<GuitarFinish>([
  "spruce",
  "maple",
  "rosewood",
  "walnut",
]);

type Point = [number, number, number];
type Tuner = [x: number, y: number, side: -1 | 1];
type AddPart = (finish: GuitarFinish, geometry: THREE.BufferGeometry) => void;

function slab(shape: THREE.Shape, z: number, depth: number, bevel = 0) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 3,
    curveSegments: 16,
  }).translate(0, 0, z);
}

function roundedRectangle(width: number, height: number, radius: number) {
  const x = width / 2;
  const y = height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-x + radius, -y);
  shape.lineTo(x - radius, -y);
  shape.quadraticCurveTo(x, -y, x, -y + radius);
  shape.lineTo(x, y - radius);
  shape.quadraticCurveTo(x, y, x - radius, y);
  shape.lineTo(-x + radius, y);
  shape.quadraticCurveTo(-x, y, -x, y - radius);
  shape.lineTo(-x, -y + radius);
  shape.quadraticCurveTo(-x, -y, -x + radius, -y);
  return shape;
}

function rod(from: Point, to: Point, radius: number, sides = 8) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const axis = end.clone().sub(start);
  const rotation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    axis.clone().normalize(),
  );
  const matrix = new THREE.Matrix4()
    .makeRotationFromQuaternion(rotation)
    .setPosition(start.lerp(end, 0.5));
  return new THREE.CylinderGeometry(radius, radius, axis.length(), sides)
    .applyMatrix4(matrix);
}

function disk(x: number, y: number, z: number, radius: number, depth: number) {
  return new THREE.CylinderGeometry(radius, radius, depth, 12)
    .rotateX(Math.PI / 2)
    .translate(x, y, z);
}

function block(size: Point, position: Point) {
  return new THREE.BoxGeometry(...size).translate(...position);
}

function electricBody() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-0.103, 0, -0.158, 0.01, -0.164, 0.068);
  shape.bezierCurveTo(-0.17, 0.134, -0.114, 0.191, -0.116, 0.254);
  shape.bezierCurveTo(-0.116, 0.295, -0.159, 0.361, -0.14, 0.418);
  shape.bezierCurveTo(-0.133, 0.443, -0.109, 0.457, -0.098, 0.449);
  shape.bezierCurveTo(-0.09, 0.441, -0.098, 0.415, -0.087, 0.395);
  shape.bezierCurveTo(-0.076, 0.369, -0.041, 0.372, -0.027, 0.389);
  shape.lineTo(0.028, 0.373);
  shape.bezierCurveTo(0.034, 0.32, 0.09, 0.326, 0.1, 0.363);
  shape.bezierCurveTo(0.108, 0.404, 0.129, 0.397, 0.138, 0.375);
  shape.bezierCurveTo(0.157, 0.327, 0.105, 0.276, 0.112, 0.232);
  shape.bezierCurveTo(0.118, 0.186, 0.162, 0.137, 0.161, 0.071);
  shape.bezierCurveTo(0.162, 0.011, 0.118, 0, 0, 0);
  return shape;
}

function pickguard() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.029, 0.34);
  shape.bezierCurveTo(-0.046, 0.359, -0.062, 0.358, -0.055, 0.327);
  shape.bezierCurveTo(-0.036, 0.238, -0.1, 0.197, -0.075, 0.153);
  shape.quadraticCurveTo(-0.065, 0.13, -0.039, 0.137);
  shape.lineTo(-0.038, 0.153);
  shape.lineTo(0.041, 0.153);
  shape.lineTo(0.042, 0.139);
  shape.bezierCurveTo(0.115, 0.143, 0.127, 0.088, 0.146, 0.103);
  shape.bezierCurveTo(0.16, 0.117, 0.12, 0.18, 0.105, 0.222);
  shape.bezierCurveTo(0.088, 0.271, 0.143, 0.317, 0.126, 0.362);
  shape.bezierCurveTo(0.116, 0.392, 0.117, 0.341, 0.093, 0.325);
  shape.quadraticCurveTo(0.068, 0.301, 0.029, 0.326);
  shape.closePath();
  return shape;
}

function electricHeadstock() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.021, 0.803);
  shape.bezierCurveTo(-0.021, 0.822, -0.043, 0.821, -0.036, 0.84);
  shape.bezierCurveTo(-0.021, 0.877, -0.003, 0.942, 0.008, 0.971);
  shape.bezierCurveTo(0.017, 1.006, 0.059, 1.005, 0.064, 0.971);
  shape.bezierCurveTo(0.07, 0.938, 0.043, 0.944, 0.041, 0.931);
  shape.bezierCurveTo(0.039, 0.914, 0.054, 0.873, 0.054, 0.851);
  shape.quadraticCurveTo(0.021, 0.836, 0.021, 0.803);
  shape.closePath();
  return shape;
}

function acousticBody() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-0.122, 0, -0.197, 0.015, -0.199, 0.132);
  shape.bezierCurveTo(-0.2, 0.197, -0.135, 0.241, -0.139, 0.308);
  shape.bezierCurveTo(-0.139, 0.344, -0.152, 0.374, -0.148, 0.408);
  shape.bezierCurveTo(-0.141, 0.473, -0.087, 0.502, 0, 0.494);
  shape.bezierCurveTo(0.087, 0.502, 0.141, 0.473, 0.148, 0.408);
  shape.bezierCurveTo(0.152, 0.374, 0.139, 0.344, 0.139, 0.308);
  shape.bezierCurveTo(0.135, 0.241, 0.2, 0.197, 0.199, 0.132);
  shape.bezierCurveTo(0.197, 0.015, 0.122, 0, 0, 0);
  return shape;
}

function acousticHeadstock() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.022, 0.852);
  shape.quadraticCurveTo(-0.022, 0.871, -0.033, 0.88);
  shape.lineTo(-0.032, 0.95);
  shape.lineTo(-0.038, 0.993);
  shape.quadraticCurveTo(-0.022, 0.998, -0.018, 1.005);
  shape.quadraticCurveTo(0, 1.019, 0.018, 1.005);
  shape.quadraticCurveTo(0.022, 0.998, 0.038, 0.993);
  shape.lineTo(0.032, 0.95);
  shape.lineTo(0.033, 0.88);
  shape.quadraticCurveTo(0.022, 0.871, 0.022, 0.852);
  shape.closePath();
  return shape;
}

const electricTuners: Tuner[] = Array.from({ length: 6 }, (_, index) => [
  -0.024 + index * 0.008,
  0.842 + index * 0.026,
  -1,
]);

const acousticTuners: Tuner[] = [
  [-0.020, 0.903, -1],
  [-0.020, 0.936, -1],
  [-0.021, 0.972, -1],
  [0.021, 0.972, 1],
  [0.020, 0.936, 1],
  [0.020, 0.903, 1],
];

const instruments = {
  electric: {
    backOffset: 0.022,
    board: "maple",
    inlay: "black",
    neckJoin: 0.37,
    boardEnd: 0.316,
    nut: 0.805,
    saddle: 0.147,
    stringZ: 0.041,
    saddleSpacing: 0.0104,
    frets: 21,
    tuners: electricTuners,
  },
  acoustic: {
    backOffset: 0.057,
    board: "rosewood",
    inlay: "ivory",
    neckJoin: 0.48,
    boardEnd: 0.39,
    nut: 0.854,
    saddle: 0.199,
    stringZ: 0.073,
    saddleSpacing: 0.0109,
    frets: 20,
    tuners: acousticTuners,
  },
} as const;

function taperedBoard(bottom: number, top: number, baseWidth: number, tipWidth: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-baseWidth / 2, bottom + 0.005);
  shape.lineTo(-tipWidth / 2, top);
  shape.lineTo(tipWidth / 2, top);
  shape.lineTo(baseWidth / 2, bottom + 0.005);
  shape.quadraticCurveTo(baseWidth / 2, bottom, baseWidth / 2 - 0.005, bottom);
  shape.lineTo(-baseWidth / 2 + 0.005, bottom);
  shape.quadraticCurveTo(-baseWidth / 2, bottom, -baseWidth / 2, bottom + 0.005);
  return shape;
}

function addNeck(add: AddPart, kind: GuitarKind) {
  const { backOffset, board, inlay, neckJoin, boardEnd, nut, saddle, stringZ, saddleSpacing, frets, tuners } =
    instruments[kind];
  const nutWidth = 0.043;
  const boardZ = stringZ - 0.0038;
  const headZ = boardZ - 0.0055;
  const neckWood = kind === "electric" ? "maple" : "walnut";
  const widthAt = (y: number) => THREE.MathUtils.mapLinear(y, boardEnd, nut, 0.057, nutWidth);
  const fretY = (fret: number) => saddle + (nut - saddle) * 2 ** (-fret / 12);

  add(neckWood, slab(
    taperedBoard(neckJoin, nut, widthAt(neckJoin) - 0.003, nutWidth - 0.003),
    boardZ - 0.024, 0.016, 0.003,
  ));
  add(neckWood, slab(
    taperedBoard(boardEnd + 0.003, neckJoin + 0.012, 0.053, widthAt(neckJoin) - 0.003),
    backOffset - 0.003, boardZ - backOffset - 0.003,
  ));
  add(board, slab(taperedBoard(boardEnd, nut, widthAt(boardEnd), nutWidth), boardZ - 0.007, 0.007));
  add("ivory", block([nutWidth, 0.0032, 0.009], [0, nut, boardZ - 0.001]));

  const head = kind === "electric" ? electricHeadstock() : acousticHeadstock();
  add(kind === "electric" ? "maple" : "black", slab(head, headZ - 0.013, 0.012, 0.001));

  for (let fret = 1; fret <= frets; fret++) {
    const y = fretY(fret);
    const halfWidth = widthAt(y) / 2 - 0.0007;
    add("chrome", rod([-halfWidth, y, boardZ], [halfWidth, y, boardZ], 0.00085, 6));
  }

  for (const fret of [3, 5, 7, 9, 12, 15, 17, 19, 21]) {
    if (fret > frets) break;
    const y = (fretY(fret - 1) + fretY(fret)) / 2;
    for (const x of fret === 12 ? [-0.012, 0.012] : [0]) {
      add(inlay, disk(x, y, boardZ, 0.00235, 0.0006));
    }
  }

  tuners.forEach(([x, y, side], string) => {
    const nutPoint: Point = [(string - 2.5) * 0.007, nut, stringZ];
    const tunerPoint: Point = [x, y, headZ + 0.0047];
    const radius = 0.00054 - string * 0.000049;
    add("wire", rod([(string - 2.5) * saddleSpacing, saddle, stringZ + 0.001], nutPoint, radius, 5));
    add("wire", rod(nutPoint, tunerPoint, radius, 5));

    add("chrome", disk(x, y, headZ + 0.001, 0.0051, 0.002));
    add("chrome", disk(...tunerPoint, 0.00245, 0.007));
    const pegX = x + side * 0.024;
    add("chrome", rod([x, y, headZ - 0.008], [pegX, y, headZ - 0.008], 0.0024));
    add("chrome", slab(roundedRectangle(0.010, 0.013, 0.003), headZ - 0.012, 0.007, 0.001)
      .translate(pegX, y, 0));
  });

  if (kind === "electric") {
    add("black", disk(0, 0, headZ, 0.0041, 0.0006).scale(1, 1.4, 1).translate(0, 0.82, 0));
    add("chrome", block([0.009, 0.004, 0.004], [0.011, 0.874, headZ + 0.002]));
    add("decal", new THREE.PlaneGeometry(0.107, 0.023)
      .rotateZ(Math.PI / 2).translate(0.027, 0.898, headZ + 0.0004));
  }
}

function addElectricBody(add: AddPart) {
  add("yellow", slab(electricBody(), -0.017, 0.034, 0.005));
  const guard = pickguard();
  add("black", slab(guard, 0.0216, 0.0012));
  add("white", slab(guard, 0.0228, 0.0015));

  const guardScrews = [
    [-0.047, 0.342], [0.035, 0.324], [0.121, 0.353], [0.116, 0.286],
    [0.102, 0.217], [0.138, 0.113], [0.041, 0.144], [-0.059, 0.148],
    [-0.071, 0.198], [-0.055, 0.248],
  ];
  for (const [x, y] of guardScrews) {
    add("chrome", disk(x, y, 0.0247, 0.0024, 0.0011));
  }

  for (const [y, angle] of [[0.292, 0], [0.236, 0], [0.181, -0.16]]) {
    const cover = roundedRectangle(0.072, 0.017, 0.007);
    add("black", slab(cover, 0.0241, 0.0008).rotateZ(angle).translate(0, y, 0));
    add("ivory", slab(cover, 0.0249, 0.004).rotateZ(angle).translate(0, y, 0));
    for (let pole = 0; pole < 6; pole++) {
      add("chrome", disk((pole - 2.5) * 0.010, 0, 0.0293, 0.0019, 0.001)
        .rotateZ(angle).translate(0, y, 0));
    }
    for (const x of [-0.041, 0.041]) {
      add("chrome", disk(x, 0, 0.0248, 0.0022, 0.001).rotateZ(angle).translate(0, y, 0));
    }
  }

  add("chrome", slab(roundedRectangle(0.081, 0.042, 0.004), 0.022, 0.004, 0.0008)
    .translate(0, 0.127, 0));
  for (let string = 0; string < 6; string++) {
    const x = (string - 2.5) * instruments.electric.saddleSpacing;
    add("chrome", block([0.009, 0.020, 0.012], [x, 0.137, 0.0355]));
    add("chrome", rod([x, 0.11, 0.031], [x, 0.137, 0.031], 0.00185));
  }

  for (const [x, y] of [[0.055, 0.166], [0.092, 0.147], [0.126, 0.122]]) {
    add("white", new THREE.CylinderGeometry(0.0072, 0.011, 0.009, 20)
      .rotateX(Math.PI / 2).translate(x, y, 0.029));
    add("ivory", disk(x, y, 0.034, 0.0066, 0.0015));
  }

  add("black", rod([0.083, 0.202, 0.025], [0.102, 0.183, 0.025], 0.0017));
  add("chrome", rod([0.096, 0.189, 0.025], [0.106, 0.179, 0.035], 0.0016));
  add("ivory", rod([0.104, 0.181, 0.033], [0.109, 0.176, 0.038], 0.003));

  const jack = new THREE.Shape().absellipse(0, 0, 0.043, 0.015, 0, Math.PI * 2);
  jack.holes.push(new THREE.Path().absellipse(0, 0, 0.029, 0.009, 0, Math.PI * 2, true));
  add("chrome", slab(jack, 0.021, 0.0034, 0.0014).rotateZ(-0.64).translate(0.092, 0.078, 0));
  add("black", new THREE.CircleGeometry(1, 32).scale(0.030, 0.010, 1)
    .rotateZ(-0.64).translate(0.092, 0.078, 0.0222));
  add("chrome", disk(0.096, 0.075, 0.025, 0.005, 0.003));
  add("black", disk(0.096, 0.075, 0.027, 0.0028, 0.001));
  add("chrome", rod([-0.104, 0.45, 0], [-0.104, 0.459, 0], 0.0043));
  add("chrome", rod([0, -0.003, 0], [0, -0.009, 0], 0.0044));

  add("white", slab(roundedRectangle(0.089, 0.134, 0.009), -0.024, 0.002)
    .translate(0, 0.204, 0));
  for (const x of [-0.037, 0.037]) {
    for (const y of [0.148, 0.204, 0.26]) {
      add("chrome", disk(x, y, -0.0242, 0.002, 0.001));
    }
  }
}

function addAcousticBody(add: AddPart) {
  const outline = acousticBody();
  const shell = outline.clone();
  const perimeter = outline.getPoints(16);
  const insetPoints = (scale: number) => perimeter.map(
    ({ x, y }) => new THREE.Vector2(x * scale, 0.245 + (y - 0.245) * scale),
  );
  shell.holes.push(new THREE.Path(insetPoints(0.968)));
  add("walnut", slab(shell, -0.055, 0.1085));

  const faceContour = insetPoints(0.991);
  add("walnut", slab(new THREE.Shape(faceContour), -0.057, 0.004));
  add("cavity", new THREE.ShapeGeometry(new THREE.Shape(faceContour)).translate(0, 0, -0.0526));

  const soundHoleY = 0.345;
  const soundHoleRadius = 0.0495;
  const top = new THREE.Shape(faceContour);
  top.holes.push(new THREE.Path().absarc(0, soundHoleY, soundHoleRadius, 0, Math.PI * 2, true));
  add("spruce", slab(top, 0.0535, 0.0035));

  const binding = outline.clone();
  binding.holes.push(new THREE.Path(faceContour));
  add("ivory", slab(binding, 0.0535, 0.0035));
  add("ivory", slab(binding, -0.057, 0.002));

  for (const [radius, width] of [[0.052, 0.0012], [0.057, 0.0023], [0.0602, 0.0012], [0.065, 0.0011]]) {
    add("rosette", new THREE.RingGeometry(radius, radius + width, 64)
      .translate(0, soundHoleY, 0.05715));
  }

  const bridge = new THREE.Shape();
  bridge.moveTo(-0.074, 0.211);
  bridge.lineTo(0.074, 0.211);
  bridge.lineTo(0.077, 0.185);
  bridge.quadraticCurveTo(0.054, 0.187, 0.042, 0.178);
  bridge.quadraticCurveTo(0, 0.17, -0.042, 0.178);
  bridge.quadraticCurveTo(-0.055, 0.187, -0.077, 0.185);
  bridge.closePath();
  add("rosewood", slab(bridge, 0.057, 0.0085, 0.0015));
  add("ivory", rod([-0.033, 0.198, 0.071], [0.033, 0.200, 0.071], 0.0021));

  for (let string = 0; string < 6; string++) {
    const x = (string - 2.5) * instruments.acoustic.saddleSpacing;
    add("black", disk(x, 0.185, 0.0677, 0.0032, 0.0025));
    add("ivory", disk(x, 0.185, 0.0691, 0.001, 0.0006));
    add("wire", rod([x, 0.185, 0.0695], [x, 0.199, 0.074], 0.0004, 5));
  }
}

function addStand(add: AddPart, bodyDepth: number) {
  const frontPadZ = bodyDepth + 0.006;
  for (const side of [-1, 1]) {
    const frontFoot: Point = [side * 0.14, 0.013, frontPadZ + 0.023];
    const rearFoot: Point = [side * 0.115, 0.013, -0.205];
    const hinge: Point = [side * 0.071, 0.313, -0.070];
    const cradle: Point = [side * 0.106, 0.083, frontPadZ];
    const cradleBack: Point = [side * 0.106, 0.083, -0.039];

    for (const foot of [frontFoot, rearFoot]) {
      add("frame", rod(foot, hinge, 0.0083, 12));
      const collar = pointAlong(foot, hinge, 0.092);
      add("rubber", rod(foot, collar, 0.013, 12));
      add("rubber", new THREE.SphereGeometry(0.013, 12, 6).translate(...foot));
    }

    add("frame", rod(pointAlong(frontFoot, hinge, 0.39), pointAlong(rearFoot, hinge, 0.39), 0.005));
    add("rubber", rod(cradleBack, cradle, 0.0118, 12));
    add("rubber", rod(cradle, [side * 0.108, 0.128, frontPadZ + 0.003], 0.0118, 12));
    add("rubber", new THREE.SphereGeometry(0.0118, 12, 6).translate(...cradle));
    add("chrome", disk(hinge[0], hinge[1], hinge[2] + 0.009, 0.0044, 0.002));
  }

  add("frame", rod([-0.106, 0.083, -0.039], [0.106, 0.083, -0.039], 0.008));
  add("frame", rod([-0.071, 0.313, -0.07], [0.071, 0.313, -0.07], 0.008));
  add("rubber", rod([-0.071, 0.312, -0.041], [0.071, 0.312, -0.041], 0.014, 12));
}

function pointAlong(from: Point, to: Point, position: number): Point {
  return [
    THREE.MathUtils.lerp(from[0], to[0], position),
    THREE.MathUtils.lerp(from[1], to[1], position),
    THREE.MathUtils.lerp(from[2], to[2], position),
  ];
}

export function createGuitarModel(kind: GuitarKind) {
  const groups = new Map<GuitarFinish, THREE.BufferGeometry[]>();
  const add = (finish: GuitarFinish, geometry: THREE.BufferGeometry, transform?: THREE.Matrix4) => {
    // Reuse one grain texture with a mirrored seam down the soundboard.
    if (woodFinishes.has(finish)) {
      const position = geometry.getAttribute("position");
      const uv = geometry.getAttribute("uv");
      for (let i = 0; i < uv.count; i++) {
        const x = position.getX(i) + (finish === "walnut" ? position.getZ(i) * 0.6 : 0);
        uv.setXY(i, x * 4.5, position.getY(i) * 1.65);
      }
    }
    if (transform) geometry.applyMatrix4(transform);
    const parts = groups.get(finish) ?? [];
    parts.push(geometry.index ? geometry.toNonIndexed() : geometry);
    groups.set(finish, parts);
  };

  const { backOffset } = instruments[kind];
  const lean = new THREE.Matrix4().makeRotationX(-0.115).setPosition(0, 0.077, backOffset);
  const addInstrument: AddPart = (finish, geometry) => add(finish, geometry, lean);

  const addBody = kind === "electric" ? addElectricBody : addAcousticBody;
  addBody(addInstrument);
  addNeck(addInstrument, kind);
  addStand(add, backOffset * 2);

  // Batch the hardware, frets and other repeated pieces by material.
  return Array.from(groups, ([finish, parts]) => ({
    finish,
    geometry: mergeGeometries(parts)!,
  }));
}
