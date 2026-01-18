'use client';

/**
 * InteractiveGlobe Component
 *
 * A 3D interactive globe built with React Three Fiber showing:
 * - Grayscale Earth with visible continents
 * - Current location (London)
 * - Target destination (Dubai/Abu Dhabi) with emphasis
 * - An animated arc connecting London to Dubai
 */

import { useRef, useMemo, memo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Sphere,
  Html,
  Line,
  useTexture,
  Preload,
} from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type Location = {
  name: string;
  lat: number;
  lng: number;
  type: 'home' | 'destination' | 'favorite';
  label?: string;
};

// ============================================================================
// LOCATION DATA
// ============================================================================

const locations: Location[] = [
  {
    name: 'London',
    lat: 51.5074,
    lng: -0.1278,
    type: 'home',
    label: 'Home (London)',
  },
  {
    name: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
    type: 'destination',
    label: 'Relocating Soon (Dubai)',
  },
  { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773, type: 'destination' },
  {
    name: 'New York',
    lat: 40.7128,
    lng: -74.006,
    type: 'favorite',
    label: 'NYC',
  },
  {
    name: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    type: 'favorite',
    label: 'Tokyo',
  },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, type: 'favorite', label: 'Lagos' },
  {
    name: 'Barcelona',
    lat: 41.3851,
    lng: 2.1734,
    type: 'favorite',
    label: 'BCN',
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const latLngToVector3 = (
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
};

const generateArcPoints = (
  start: Location,
  end: Location,
  radius: number,
  segments = 30,
): [number, number, number][] => {
  const startVec = new THREE.Vector3(
    ...latLngToVector3(start.lat, start.lng, radius),
  );
  const endVec = new THREE.Vector3(
    ...latLngToVector3(end.lat, end.lng, radius),
  );

  const midPoint = new THREE.Vector3()
    .addVectors(startVec, endVec)
    .multiplyScalar(0.5);
  const distance = startVec.distanceTo(endVec);

  midPoint.normalize().multiplyScalar(radius + distance * 0.25);

  const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);

  return curve
    .getPoints(segments)
    .map((p) => [p.x, p.y, p.z] as [number, number, number]);
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const LocationMarker = ({
  location,
  radius,
}: {
  location: Location;
  radius: number;
}) => {
  const position = latLngToVector3(location.lat, location.lng, radius);

  const isDestination = location.type === 'destination';
  const isHome = location.type === 'home';
  const isFavorite = location.type === 'favorite';
  // Amber for Home/Destination, bright cyan for favorites
  // Using emissive-friendly bright cyan that won't be dulled by lighting
  const markerColor = isFavorite ? '#00d4ff' : '#f59e0b';
  const markerSize = isDestination ? 0.055 : isHome ? 0.05 : 0.035;

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[markerSize, 12, 12]} />
        <meshBasicMaterial color={markerColor} toneMapped={false} />
      </mesh>

      {location.label && (
        <Html
          position={[0, 0.08, 0]}
          center
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          <div
            className={
              location.type === 'favorite'
                ? 'rounded-full border bg-background/90 px-1.5 py-0.5 text-[8px] font-medium shadow-sm backdrop-blur-sm'
                : 'rounded-full bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow-sm'
            }
            style={
              location.type === 'favorite'
                ? { borderColor: 'rgba(0, 212, 255, 0.6)', color: '#00a8cc' }
                : undefined
            }
          >
            {location.label}
          </div>
        </Html>
      )}
    </group>
  );
};

const ArcLine = ({
  start,
  end,
  radius,
}: {
  start: Location;
  end: Location;
  radius: number;
}) => {
  const points = useMemo(
    () => generateArcPoints(start, end, radius, 30),
    [start, end, radius],
  );

  return (
    <Line
      points={points}
      color="#f59e0b"
      lineWidth={2.5}
      dashed
      dashScale={30}
      dashSize={0.5}
      dashOffset={0}
    />
  );
};

const GlobeContent = ({ radius = 1.5 }: { radius?: number }) => {
  const globeRef = useRef<THREE.Group>(null);

  // Load texture with error handling
  const earthTexture = useTexture('/textures/earth-grayscale.png');

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.08;
    }
  });

  const london = locations.find((l) => l.name === 'London')!;
  const dubai = locations.find((l) => l.name === 'Dubai')!;

  return (
    <group ref={globeRef}>
      {/* Main globe sphere with grayscale earth texture */}
      <Sphere args={[radius, 48, 48]}>
        <meshStandardMaterial
          map={earthTexture}
          color="#d4d4d4"
          roughness={1}
          metalness={0}
        />
      </Sphere>

      {/* Subtle wireframe overlay */}
      <Sphere args={[radius * 1.002, 24, 24]}>
        <meshBasicMaterial
          color="#a3a3a3"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Flight path arc */}
      <ArcLine start={london} end={dubai} radius={radius} />

      {/* Location markers */}
      {locations.map((location) => (
        <LocationMarker
          key={location.name}
          location={location}
          radius={radius * 1.02}
        />
      ))}
    </group>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const InteractiveGlobe = memo(() => (
  <div className="relative h-[300px] w-full sm:h-[350px] md:h-[450px]">
    <Canvas
      camera={{
        position: [0, 0, 4.2],
        fov: 50,
      }}
      style={{ background: 'transparent', touchAction: 'pan-y' }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        preserveDrawingBuffer: true,
      }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <Suspense fallback={null}>
        <GlobeContent />
        <Preload all />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>

    {/* Legend overlay */}
    <div className="absolute bottom-2 left-2 flex flex-col gap-1 rounded-lg border border-border/60 bg-card/90 p-2 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:gap-2 sm:rounded-xl sm:p-3">
      <div className="flex items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
        <span className="h-2 w-2 rounded-full bg-amber-500 sm:h-2.5 sm:w-2.5" />
        <span className="text-muted-foreground">Home / Destination</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
        <span
          className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
          style={{ backgroundColor: '#00d4ff' }}
        />
        <span className="text-muted-foreground">Places I Love</span>
      </div>
    </div>

    {/* Title overlay */}
    <div className="absolute right-2 top-2 rounded-lg border border-border/60 bg-card/90 px-2.5 py-1.5 backdrop-blur-sm sm:right-4 sm:top-4 sm:rounded-xl sm:px-4 sm:py-2">
      <p className="text-xs font-medium text-foreground sm:text-sm">
        London → Dubai
      </p>
    </div>

    {/* Touch hint for mobile */}
    <div className="absolute bottom-2 right-2 rounded-lg border border-border/60 bg-card/90 px-2 py-1 backdrop-blur-sm sm:hidden">
      <p className="text-[10px] text-muted-foreground">Drag to rotate</p>
    </div>
  </div>
));

InteractiveGlobe.displayName = 'InteractiveGlobe';

export default InteractiveGlobe;
