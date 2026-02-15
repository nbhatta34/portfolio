<template>
  <section id="work" ref="sectionRef" class="project-section relative py-20 bg-surface overflow-hidden">
    <div class="max-w-[1500px] mx-auto">
      <div class="px-6 mb-10 md:mb-20">
        <h2 class="text-4xl md:text-6xl font-display font-bold text-white">Selected Work</h2>
      </div>

      <div ref="wrapperRef" class="flex flex-nowrap gap-6 px-6 w-[200%] md:w-[120%] h-[35vh] md:h-[45vh]">
        <div v-for="(project, index) in projects" :key="index" class="project-card relative w-[40vw] md:w-[25vw] h-full flex-shrink-0 bg-background border border-white/10 rounded-2xl overflow-hidden group">
          <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
             <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
          </div>
        
          <div class="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="text-3xl font-display font-bold text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-300">{{ project.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

const projects = [
  { title: 'E-Commerce Platform', category: 'Web App', image: 'https://picsum.photos/seed/ecommerce/800/600' },
  { title: 'Fintech Dashboard', category: 'SaaS', image: 'https://picsum.photos/seed/fintech/800/600' },
  { title: 'Social Media App', category: 'Mobile (React Native)', image: 'https://picsum.photos/seed/social/800/600' },
  { title: 'AI Content Generator', category: 'Web App', image: 'https://picsum.photos/seed/aicontent/800/600' },
]

onMounted(() => {
  if (!sectionRef.value || !wrapperRef.value) return

  const sections = gsap.utils.toArray('.project-card')
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + (wrapperRef.value?.offsetWidth || 0)
    }
  })
})
</script>

<style scoped>
/* Optional: hide scrollbar if needed */
</style>
