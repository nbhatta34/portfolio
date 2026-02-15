<template>
  <div class="bg-background">
    <Hero />
    <About />
    <ProjectShowcase />
    <Services />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/sections/Hero.vue'
import About from '~/components/sections/About.vue'
import ProjectShowcase from '~/components/sections/ProjectShowcase.vue'
import Services from '~/components/sections/Services.vue'
import Contact from '~/components/sections/Contact.vue'

definePageMeta({
  title: 'Portfolio - Full Stack Developer'
})
</script>
