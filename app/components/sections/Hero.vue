<template>
  <section class="relative h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
    <div ref="container" class="max-w-[1500px] mx-auto w-full relative z-10">
      <h1 class="text-[clamp(3rem,8vw,10rem)] leading-[0.9] font-display font-bold tracking-wide mix-blend-difference text-white">
        <div class="overflow-hidden"><span class="block translate-y-full hero-text">CREATIVE</span></div>
        <div class="overflow-hidden"><span class="block translate-y-full hero-text">FULL STACK</span></div>
        <div class="overflow-hidden"><span class="block translate-y-full hero-text text-accent">DEVELOPER</span></div>
      </h1>

      <div class="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:items-center overflow-hidden">
        <p class="hero-sub opacity-0 text-xl md:text-2xl max-w-xl text-gray-400">
          Building digital experiences that blend performance with premium aesthetics.
        </p>
        <button class="hero-btn opacity-0 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-accent hover:text-white transition-colors duration-300 pointer-events-auto">
          View Projects
        </button>
      </div>
    </div>
    
    <!-- Interactive Particle Background -->
    <ParticleField />

    <!-- Background glow -->
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[120px]"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ParticleField from '~/components/ui/ParticleField.vue'

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline()

  tl.to('.hero-text', {
    y: 0,
    duration: 1.5,
    ease: 'power4.out',
    stagger: 0.1,
    delay: 0.5
  })
  .to('.hero-sub', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=1')
  .to('.hero-btn', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.8')
})
</script>
