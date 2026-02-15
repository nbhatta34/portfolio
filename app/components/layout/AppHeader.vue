<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-40 transition-transform duration-500"
    :class="{ '-translate-y-full': shouldHideHeader }"
  >
    <div class="max-w-[1500px] mx-auto w-full flex items-center justify-between px-6 py-4">
      <div class="text-xl font-bold font-display tracking-tighter mix-blend-difference text-white">
        PORTFOLIO
      </div>

      <nav class="hidden md:flex gap-8 mix-blend-difference text-white">
        <a href="#work" class="hover:text-accent transition-colors" @click.prevent="scrollTo('work')">Work</a>
        <a href="#about" class="hover:text-accent transition-colors" @click.prevent="scrollTo('about')">About</a>
        <a href="#contact" class="hover:text-accent transition-colors" @click.prevent="scrollTo('contact')">Contact</a>
      </nav>

      <button class="md:hidden text-white mix-blend-difference">
        Menu
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const lastY = ref(0)
const shouldHideHeader = ref(false)

watch(y, (newY) => {
  if (newY > lastY.value && newY > 100) {
    shouldHideHeader.value = true
  } else {
    shouldHideHeader.value = false
  }
  lastY.value = newY
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
