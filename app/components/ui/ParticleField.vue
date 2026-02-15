<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full z-0 pointer-events-none"
  />
</template>

<script setup lang="ts">
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  baseAlpha: number
  alpha: number
  color: [number, number, number]
  pulsePhase: number
  pulseSpeed: number
}

// Star-like color palette
const STAR_COLORS: [number, number, number][] = [
  [255, 255, 255],   // pure white
  [255, 245, 230],   // warm white
  [200, 220, 255],   // pale blue
  [255, 223, 140],   // soft gold
  [200, 180, 255],   // lavender
  [255, 20, 147],    // hot pink
  [100, 220, 255],   // cyan
  [255, 180, 220],   // soft pink
]

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null
let mouseX = -1000
let mouseY = -1000

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 120
const MOUSE_RADIUS = 180
const MOUSE_FORCE = 0.08

function createParticles(w: number, h: number) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const baseR = Math.random() * 1.5 + 0.5
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: baseR,
      baseRadius: baseR,
      baseAlpha: Math.random() * 0.4 + 0.1,
      alpha: 0,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]!,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.3 + Math.random() * 0.7
    })
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return
  const dpr = window.devicePixelRatio || 1
  const w = parent.clientWidth
  const h = parent.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  createParticles(w, h)
}

function onMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

function onMouseLeave() {
  mouseX = -1000
  mouseY = -1000
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const w = canvas.clientWidth
  const h = canvas.clientHeight

  ctx.clearRect(0, 0, w, h)

  const time = performance.now() / 1000

  // Update and draw particles
  for (const p of particles) {
    // Pulsing
    const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase)
    const pulseAlphaFactor = 0.7 + pulse * 0.3  // oscillates 0.4–1.0
    const pulseRadiusFactor = 0.85 + pulse * 0.15  // oscillates 0.7–1.0

    // Mouse repulsion
    const dx = p.x - mouseX
    const dy = p.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force
      p.alpha = Math.min(1, (p.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.6) * pulseAlphaFactor)
    } else {
      const target = p.baseAlpha * pulseAlphaFactor
      p.alpha += (target - p.alpha) * 0.05
    }

    p.radius = p.baseRadius * pulseRadiusFactor

    // Damping
    p.vx *= 0.98
    p.vy *= 0.98

    // Move
    p.x += p.vx
    p.y += p.vy

    // Wrap around edges
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    // Draw particle with subtle glow
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha * 0.15})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha})`
    ctx.fill()
  }

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]!
      const b = particles[j]!
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONNECTION_DISTANCE) {
        // Brighter connections near the mouse
        const midX = (a.x + b.x) / 2
        const midY = (a.y + b.y) / 2
        const mouseDist = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2)
        const mouseProximity = mouseDist < MOUSE_RADIUS * 1.5
          ? 1 - mouseDist / (MOUSE_RADIUS * 1.5)
          : 0

        const baseLineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.08
        const lineAlpha = baseLineAlpha + mouseProximity * 0.15

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        // Use hot pink for mouse-proximate connections
        if (mouseProximity > 0.3) {
          ctx.strokeStyle = `rgba(255, 20, 147, ${lineAlpha})`
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`
        }
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  resize()

  // Listen on the parent element so particles react to cursor over the hero
  const parent = canvasRef.value?.parentElement
  if (parent) {
    parent.addEventListener('mousemove', onMouseMove)
    parent.addEventListener('mouseleave', onMouseLeave)
    parent.style.pointerEvents = 'auto'
  }

  window.addEventListener('resize', resize)
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)

  const parent = canvasRef.value?.parentElement
  if (parent) {
    parent.removeEventListener('mousemove', onMouseMove)
    parent.removeEventListener('mouseleave', onMouseLeave)
  }
})
</script>
