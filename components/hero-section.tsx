"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  scrollY: number
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const trainRef = useRef<THREE.Group | null>(null)
  const wheelsRef = useRef<THREE.Mesh[]>([])
  const imagesRef = useRef<THREE.Mesh[]>([])
  const clockRef = useRef<THREE.Clock | null>(null)
  const trainPathRef = useRef<{ x: number; y: number; z: number }[]>([])
  const trainPathIndexRef = useRef(0)
  const trainTargetRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 })

  // Initialize Three.js scene
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!canvasRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1.5, 5)
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    rendererRef.current = renderer

    // Create clock for animations
    clockRef.current = new THREE.Clock()

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x9945ff, 1, 10)
    pointLight1.position.set(-2, 1, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x45a6ff, 1, 10)
    pointLight2.position.set(2, 1, 2)
    scene.add(pointLight2)

    // Create platform
    const platformGeometry = new THREE.BoxGeometry(10, 0.2, 10)
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
    })
    const platform = new THREE.Mesh(platformGeometry, platformMaterial)
    platform.position.y = -0.5
    platform.receiveShadow = true
    scene.add(platform)

    // Create grid lines on platform
    const gridHelper = new THREE.GridHelper(10, 20, 0x9945ff, 0x45a6ff)
    gridHelper.position.y = -0.39
    scene.add(gridHelper)

    // Create train tracks (square path)
    const trackWidth = 6
    const trackHeight = 0.05
    const trackDepth = 0.1
    const trackGeometry = new THREE.BoxGeometry(trackWidth, trackHeight, trackDepth)
    const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 })

    // Create four tracks for a square path
    const track1 = new THREE.Mesh(trackGeometry, trackMaterial)
    track1.position.set(0, -0.35, trackWidth / 2 - trackDepth / 2)
    track1.receiveShadow = true
    scene.add(track1)

    const track2 = new THREE.Mesh(trackGeometry, trackMaterial)
    track2.position.set(0, -0.35, -trackWidth / 2 + trackDepth / 2)
    track2.receiveShadow = true
    scene.add(track2)

    const track3 = new THREE.Mesh(new THREE.BoxGeometry(trackDepth, trackHeight, trackWidth), trackMaterial)
    track3.position.set(trackWidth / 2 - trackDepth / 2, -0.35, 0)
    track3.receiveShadow = true
    scene.add(track3)

    const track4 = new THREE.Mesh(new THREE.BoxGeometry(trackDepth, trackHeight, trackWidth), trackMaterial)
    track4.position.set(-trackWidth / 2 + trackDepth / 2, -0.35, 0)
    track4.receiveShadow = true
    scene.add(track4)

    // Create a detailed train model
    const createDetailedTrain = () => {
      const trainGroup = new THREE.Group()

      // Engine body
      const engineGeometry = new THREE.BoxGeometry(1, 0.6, 0.5)
      const engineMaterial = new THREE.MeshStandardMaterial({ color: 0x9945ff })
      const engine = new THREE.Mesh(engineGeometry, engineMaterial)
      engine.castShadow = true
      trainGroup.add(engine)

      // Cabin
      const cabinGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.4)
      const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x45a6ff })
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
      cabin.position.set(0, 0.3, 0)
      cabin.castShadow = true
      trainGroup.add(cabin)

      // Chimney
      const chimneyGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.3, 8)
      const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
      chimney.position.set(-0.3, 0.5, 0)
      chimney.castShadow = true
      trainGroup.add(chimney)

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16)
      const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const wheelPositions = [
        [0.3, -0.3, 0.3],
        [0.3, -0.3, -0.3],
        [-0.3, -0.3, 0.3],
        [-0.3, -0.3, -0.3],
      ]

      wheelPositions.forEach((pos) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(pos[0], pos[1], pos[2])
        wheel.castShadow = true
        trainGroup.add(wheel)
        wheelsRef.current.push(wheel)
      })

      // Add details
      const detailGeometry = new THREE.BoxGeometry(1.1, 0.1, 0.6)
      const detailMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const detail = new THREE.Mesh(detailGeometry, detailMaterial)
      detail.position.set(0, -0.25, 0)
      detail.castShadow = true
      trainGroup.add(detail)

      return trainGroup
    }

    const train = createDetailedTrain()
    train.scale.set(0.5, 0.5, 0.5)
    train.position.set(-trackWidth / 2 + 1, -0.2, -trackWidth / 2 + 1)
    scene.add(train)
    trainRef.current = train

    // Create square path for train
    const pathSize = trackWidth - 1
    const pathPoints = 100
    trainPathRef.current = []

    // Top side (moving right)
    for (let i = 0; i <= pathPoints; i++) {
      trainPathRef.current.push({
        x: -pathSize / 2 + (i * pathSize) / pathPoints,
        y: -0.2 + Math.sin((i * Math.PI * 2) / pathPoints) * 0.05, // Vertical motion
        z: -pathSize / 2,
      })
    }

    // Right side (moving down)
    for (let i = 0; i <= pathPoints; i++) {
      trainPathRef.current.push({
        x: pathSize / 2,
        y: -0.2 + Math.sin(((i + pathPoints) * Math.PI * 2) / pathPoints) * 0.05, // Vertical motion
        z: -pathSize / 2 + (i * pathSize) / pathPoints,
      })
    }

    // Bottom side (moving left)
    for (let i = 0; i <= pathPoints; i++) {
      trainPathRef.current.push({
        x: pathSize / 2 - (i * pathSize) / pathPoints,
        y: -0.2 + Math.sin(((i + pathPoints * 2) * Math.PI * 2) / pathPoints) * 0.05, // Vertical motion
        z: pathSize / 2,
      })
    }

    // Left side (moving up)
    for (let i = 0; i <= pathPoints; i++) {
      trainPathRef.current.push({
        x: -pathSize / 2,
        y: -0.2 + Math.sin(((i + pathPoints * 3) * Math.PI * 2) / pathPoints) * 0.05, // Vertical motion
        z: pathSize / 2 - (i * pathSize) / pathPoints,
      })
    }

    // Set initial target
    trainTargetRef.current = trainPathRef.current[0]

    // Create floating destination images
    const createFloatingImages = () => {
      const imageSize = 0.8
      const imageGeometry = new THREE.PlaneGeometry(imageSize, imageSize)
      const imagePositions = [
        [-2, 0.5, -1.5],
        [2, 0.3, -2],
        [-1.5, 0.7, 1],
        [1.8, 0.2, 1.5],
      ]

      const imageUrls = [
        "https://picsum.photos/id/240/256/256", // Kyoto
        "https://picsum.photos/id/164/256/256", // Santorini
        "https://picsum.photos/id/142/256/256", // Northern Lights
        "https://picsum.photos/id/137/256/256", // Machu Picchu
      ]

      imageUrls.forEach((url, index) => {
        const texture = new THREE.TextureLoader().load(url)
        const imageMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        })

        const image = new THREE.Mesh(imageGeometry, imageMaterial)
        image.position.set(imagePositions[index][0], imagePositions[index][1], imagePositions[index][2])
        image.castShadow = true
        scene.add(image)
        imagesRef.current.push(image)
      })
    }

    createFloatingImages()

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (!clockRef.current) return
      const delta = clockRef.current.getDelta()

      // Animate train along path
      if (trainRef.current && trainPathRef.current.length > 0) {
        // Move toward target point
        const target = trainTargetRef.current
        const train = trainRef.current

        // Move train toward target
        train.position.x += (target.x - train.position.x) * 2 * delta
        train.position.y += (target.y - train.position.y) * 2 * delta
        train.position.z += (target.z - train.position.z) * 2 * delta

        // Calculate direction for train to face
        const nextIndex = (trainPathIndexRef.current + 1) % trainPathRef.current.length
        const nextPoint = trainPathRef.current[nextIndex]

        if (nextPoint) {
          const direction = new THREE.Vector3(
            nextPoint.x - train.position.x,
            0,
            nextPoint.z - train.position.z,
          ).normalize()

          if (direction.length() > 0.1) {
            const angle = Math.atan2(direction.x, direction.z)
            train.rotation.y = angle
          }
        }

        // Check if we've reached the target
        const distanceToTarget = new THREE.Vector3(
          target.x - train.position.x,
          target.y - train.position.y,
          target.z - train.position.z,
        ).length()

        if (distanceToTarget < 0.05) {
          // Move to next point
          trainPathIndexRef.current = (trainPathIndexRef.current + 1) % trainPathRef.current.length
          trainTargetRef.current = trainPathRef.current[trainPathIndexRef.current]
        }

        // Rotate wheels
        wheelsRef.current.forEach((wheel) => {
          wheel.rotation.x += 2 * delta
        })
      }

      // Animate floating images
      imagesRef.current.forEach((image, index) => {
        image.position.y += Math.sin(clockRef.current!.getElapsedTime() * 0.5 + index) * 0.002
        image.rotation.y = Math.sin(clockRef.current!.getElapsedTime() * 0.3 + index) * 0.1
      })

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      scene.clear()
      renderer.dispose()
    }
  }, [])

  // Update camera position based on scroll
  useEffect(() => {
    if (!cameraRef.current) return

    cameraRef.current.position.y = 1.5 + scrollY * 0.002
    cameraRef.current.position.z = 5 - scrollY * 0.005
  }, [scrollY])

  return (
    <div ref={heroRef} className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">Journey</span>
          <span className="hero-title-line">Beyond</span>
          <span className="hero-title-line">Boundaries</span>
        </h1>
        <p className="hero-subtitle">Craft your perfect adventure with our immersive 3D travel planner</p>
        <Link href="/planner" className="hero-cta">
          Start Planning <ArrowRight className="icon" />
        </Link>
      </div>
      <div className="hero-overlay"></div>
    </div>
  )
}
