"use client"

/**
 * InteractiveGlobe Component
 * 
 * A 3D interactive globe built with React Three Fiber (Three.js) showing:
 * - Current location (London)
 * - Target destination (Dubai/Abu Dhabi) with emphasis
 * - Other favorite travel destinations
 * - An animated arc connecting London to Dubai
 * 
 * Dependencies required:
 * - @react-three/fiber
 * - @react-three/drei
 * - three
 * 
 * Install with: npm install @react-three/fiber @react-three/drei three
 */

import { useRef, useMemo, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Html, Line } from "@react-three/drei"
import * as THREE from "three"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type Location = {
  name: string
  lat: number  // Latitude in degrees (-90 to 90)
  lng: number  // Longitude in degrees (-180 to 180)
  type: "home" | "destination" | "favorite"
  label?: string  // Optional label to display on the globe
}

// ============================================================================
// LOCATION DATA
// ============================================================================

/**
 * Array of locations to display on the globe
 * Coordinates are real-world lat/lng values
 */
const locations: Location[] = [
  { name: "London", lat: 51.5074, lng: -0.1278, type: "home", label: "Home" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, type: "destination", label: "Relocating Soon" },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773, type: "destination" },
  { name: "New York", lat: 40.7128, lng: -74.006, type: "favorite" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, type: "favorite" },
  { name: "Lagos", lat: 6.5244, lng: 3.3792, type: "favorite" },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734, type: "favorite" },
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Converts latitude/longitude coordinates to 3D cartesian coordinates
 * Uses spherical coordinate system where:
 * - phi is the polar angle (from north pole)
 * - theta is the azimuthal angle (around the equator)
 * 
 * @param lat - Latitude in degrees
 * @param lng - Longitude in degrees  
 * @param radius - Radius of the sphere
 * @returns THREE.Vector3 position on the sphere surface
 */
const latLngToVector3 = (lat: number, lng: number, radius: number): [number, number, number] => {
  // Convert degrees to radians
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  // Calculate cartesian coordinates
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  
  return [x, y, z]
}

/**
 * Generates points along a curved arc between two locations on the globe
 * The arc rises above the surface to create a flight-path effect
 * 
 * @param start - Starting location
 * @param end - Ending location
 * @param radius - Globe radius
 * @param segments - Number of points to generate (more = smoother curve)
 * @returns Array of [x, y, z] coordinates for the arc
 */
const generateArcPoints = (
  start: Location,
  end: Location,
  radius: number,
  segments: number = 50
): [number, number, number][] => {
  const startVec = new THREE.Vector3(...latLngToVector3(start.lat, start.lng, radius))
  const endVec = new THREE.Vector3(...latLngToVector3(end.lat, end.lng, radius))
  
  // Calculate the midpoint and raise it above the surface
  const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
  const distance = startVec.distanceTo(endVec)
  
  // Normalize and push outward to create arc height
  // The arc height is proportional to the distance between points
  midPoint.normalize().multiplyScalar(radius + distance * 0.25)
  
  // Create a quadratic bezier curve through the three points
  const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec)
  
  // Generate evenly spaced points along the curve
  return curve.getPoints(segments).map(p => [p.x, p.y, p.z] as [number, number, number])
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * LocationMarker Component
 * Renders a single location marker on the globe surface
 * Includes the dot marker and optional HTML label
 */
const LocationMarker = ({ 
  location, 
  radius 
}: { 
  location: Location
  radius: number 
}) => {
  const position = latLngToVector3(location.lat, location.lng, radius)
  
  // Determine marker appearance based on location type
  const isDestination = location.type === "destination"
  const isHome = location.type === "home"
  const markerColor = isDestination || isHome ? "#1d1d1d" : "#a1a1aa"
  const markerSize = isDestination ? 0.04 : isHome ? 0.035 : 0.02
  
  return (
    <group position={position}>
      {/* Main marker sphere */}
      <mesh>
        <sphereGeometry args={[markerSize, 16, 16]} />
        <meshStandardMaterial color={markerColor} />
      </mesh>
      
      {/* Pulse ring animation for destination markers */}
      {isDestination && (
        <mesh>
          <ringGeometry args={[markerSize * 1.5, markerSize * 2, 32]} />
          <meshBasicMaterial 
            color={markerColor} 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* HTML label floating above the marker */}
      {location.label && (
        <Html
          position={[0, 0.08, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <div className="rounded-full bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow-lg">
            {location.label}
          </div>
        </Html>
      )}
    </group>
  )
}

/**
 * ArcLine Component
 * Renders the curved flight path between London and Dubai
 */
const ArcLine = ({ 
  start, 
  end, 
  radius 
}: { 
  start: Location
  end: Location
  radius: number 
}) => {
  // Memoize arc points calculation for performance
  const points = useMemo(
    () => generateArcPoints(start, end, radius, 50),
    [start, end, radius]
  )
  
  return (
    <Line
      points={points}
      color="#1d1d1d"
      lineWidth={1.5}
      dashed
      dashScale={50}
      dashSize={0.5}
      dashOffset={0}
      transparent
      opacity={0.6}
    />
  )
}

/**
 * Globe Component
 * The main 3D globe with rotation animation
 * Contains the sphere, markers, and arc
 */
const Globe = ({ radius = 1.5 }: { radius?: number }) => {
  const globeRef = useRef<THREE.Group>(null)
  
  // Animate globe rotation on each frame
  // Delta ensures consistent speed regardless of frame rate
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1  // Slow rotation
    }
  })
  
  // Get London and Dubai for the arc
  const london = locations.find(l => l.name === "London")!
  const dubai = locations.find(l => l.name === "Dubai")!
  
  return (
    <group ref={globeRef}>
      {/* Main globe sphere - solid color */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial
          color="#f5f5f4"  // Light stone color matching site aesthetic
          roughness={0.9}
          metalness={0}
        />
      </Sphere>
      
      {/* Subtle wireframe overlay for visual texture */}
      <Sphere args={[radius * 1.001, 24, 24]}>
        <meshBasicMaterial
          color="#d6d3d1"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
      
      {/* Flight path arc from London to Dubai */}
      <ArcLine start={london} end={dubai} radius={radius} />
      
      {/* Render all location markers */}
      {locations.map((location) => (
        <LocationMarker 
          key={location.name} 
          location={location} 
          radius={radius * 1.01}  // Slightly above surface
        />
      ))}
    </group>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * InteractiveGlobe
 * 
 * Main exported component that sets up the Three.js canvas
 * and renders the interactive globe visualization
 * 
 * Mobile considerations:
 * - Responsive height (smaller on mobile)
 * - Touch-enabled orbit controls
 * - Adjusted camera distance for smaller screens
 * - Repositioned overlays to avoid overlap
 * - Touch action CSS to prevent scroll conflicts
 */
const InteractiveGlobe = memo(function InteractiveGlobe() {
  return (
    <div className="relative h-[300px] w-full sm:h-[350px] md:h-[450px]">
      {/* Three.js Canvas - this is the WebGL rendering context */}
      <Canvas
        camera={{
          position: [0, 0, 4.2],  // Camera distance from globe
          fov: 50  // Slightly wider FOV helps on mobile
        }}
        style={{ background: "transparent", touchAction: "pan-y" }}
        // Enable touch events for mobile interaction
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        // Reduce pixel ratio on mobile for performance
        dpr={[1, 2]}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.6} />
        
        {/* Key light from top-right */}
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* Fill light from opposite side */}
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        
        {/* The globe with all markers */}
        <Globe />
        
        {/* Orbit controls for user interaction (touch-enabled) */}
        <OrbitControls
          enableZoom={false}  // Disable zoom for cleaner UX
          enablePan={false}   // Disable panning
          minPolarAngle={Math.PI / 4}  // Limit vertical rotation
          maxPolarAngle={Math.PI - Math.PI / 4}
          autoRotate  // Gentle auto-rotation
          autoRotateSpeed={0.5}
          // Touch settings
          touches={{
            ONE: THREE.TOUCH.ROTATE,  // Single finger rotates
            TWO: THREE.TOUCH.DOLLY_ROTATE  // Two fingers also rotate (no zoom)
          }}
          // Damping for smoother feel on touch
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Legend overlay - repositioned for mobile */}
      <div className="absolute bottom-2 left-2 flex flex-col gap-1 rounded-lg border border-border/60 bg-card/90 p-2 backdrop-blur-sm sm:bottom-4 sm:left-4 sm:gap-2 sm:rounded-xl sm:p-3">
        <div className="flex items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
          <span className="h-2 w-2 rounded-full bg-foreground sm:h-2.5 sm:w-2.5" />
          <span className="text-muted-foreground">Home / Destination</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground sm:h-2 sm:w-2" />
          <span className="text-muted-foreground">Places I Love</span>
        </div>
      </div>
      
      {/* Title overlay - repositioned for mobile */}
      <div className="absolute right-2 top-2 rounded-lg border border-border/60 bg-card/90 px-2.5 py-1.5 backdrop-blur-sm sm:right-4 sm:top-4 sm:rounded-xl sm:px-4 sm:py-2">
        <p className="text-xs font-medium text-foreground sm:text-sm">London → Dubai</p>
      </div>
      
      {/* Touch hint for mobile - only shown on small screens */}
      <div className="absolute bottom-2 right-2 rounded-lg border border-border/60 bg-card/90 px-2 py-1 backdrop-blur-sm sm:hidden">
        <p className="text-[10px] text-muted-foreground">
          <i className="fa-solid fa-hand-pointer mr-1" aria-hidden="true" />
          Drag to rotate
        </p>
      </div>
    </div>
  )
})

export default InteractiveGlobe
