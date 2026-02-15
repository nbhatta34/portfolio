<template>
  <section id="about" class="py-32 px-6 bg-surface">
    <div class="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      <div class="md:col-span-6 relative">
          <!-- Image Placeholder with parallax or reveal effect in real implementation -->
          <div class="aspect-square rounded-2xl overflow-hidden relative group">
             <img src="https://picsum.photos/seed/devportrait/800/800" alt="Developer portrait" class="w-full h-full object-cover" />
             <div class="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
      </div>
      
      <div class="md:col-span-6 md:pl-10">
        <h2 class="section-title text-4xl md:text-6xl font-display font-bold text-white mb-8">
          Driven by <span class="text-accent">Design</span>, <br />
          Powered by <span class="text-white">Code</span>.
        </h2>
        
        <div class="space-y-6 text-lg text-gray-400">
          <p class="about-text">
            I'm a full-stack developer with a passion for creating digital experiences that are not only functional but also visually stunning.
          </p>
          <p class="about-text">
            With expertise in both web and mobile technologies, I bridge the gap between design and engineering, ensuring every pixel serves a purpose.
          </p>
        </div>

        <div class="mt-12 flex gap-4">
            <div class="flex flex-col">
                <span class="text-4xl font-bold text-white">5+</span>
                <span class="text-sm text-gray-500">Years Experience</span>
            </div>
            <div class="w-px bg-white/10 h-16 mx-4"></div>
            <div class="flex flex-col">
                <span class="text-4xl font-bold text-white">50+</span>
                <span class="text-sm text-gray-500">Projects Delivered</span>
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

onMounted(() => {
    const texts = gsap.utils.toArray('.about-text')
    
    gsap.from(texts, {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
        }
    })
})
</script>
