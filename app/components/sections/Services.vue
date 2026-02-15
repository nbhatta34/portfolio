<template>
  <section class="py-32 px-6 bg-background">
    <div class="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h2 class="text-4xl md:text-6xl font-display font-bold text-white sticky top-32">
          Expertise & <br /> <span class="text-accent">Services</span>
        </h2>
      </div>

      <div class="space-y-12">
        <div v-for="(service, index) in services" :key="index" class="service-item border-b border-white/10 pb-8 group">
          <h3 class="text-3xl font-bold text-white mb-4 flex items-center justify-between group-hover:text-accent transition-colors">
            {{ service.title }}
            <span class="opacity-0 group-hover:opacity-100 transition-opacity text-2xl">→</span>
          </h3>
          <p class="text-gray-400 text-lg">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  { 
    title: 'Full Stack Development', 
    description: 'End-to-end web application development using modern frameworks like Nuxt, Vue, and Node.js.' 
  },
  { 
    title: 'Mobile App Development', 
    description: 'Cross-platform mobile applications for iOS and Android using React Native or Flutter.' 
  },
  { 
    title: 'Interactive Frontend', 
    description: 'Award-winning animations and interactions using GSAP and Three.js to bring brands to life.' 
  },
  { 
    title: 'UI/UX Implementation', 
    description: 'Pixel-perfect implementation of complex designs with a focus on accessibility and performance.' 
  }
]
</script>
