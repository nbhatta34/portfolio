<template>
  <section id="contact" class="py-32 px-6 bg-background relative overflow-hidden">
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <h2 class="text-[clamp(3rem,8vw,8rem)] font-display font-bold text-white leading-none mb-10">
        Have an Idea?
      </h2>
      <p class="text-xl md:text-2xl text-gray-400 mb-12">
        Let's create something extraordinary together.
      </p>
      
      <a 
        href="mailto:hello@portfolio.com" 
        class="inline-block px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        Start a Project
      </a>

      <div class="mt-20 flex justify-center gap-8">
        <a href="#" class="text-white/50 hover:text-white transition-colors">LinkedIn</a>
        <a href="#" class="text-white/50 hover:text-white transition-colors">GitHub</a>
        <a href="#" class="text-white/50 hover:text-white transition-colors">Twitter</a>
        <a href="#" class="text-white/50 hover:text-white transition-colors">Instagram</a>
      </div>
    </div>
    
    <!-- Decorative Circle -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
  </section>
</template>

<script setup lang="ts">
</script>
