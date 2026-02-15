<template>
  <div
    ref="cursorRef"
    class="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
    :class="cursorClass"
  />
</template>

<script setup lang="ts">
import gsap from 'gsap'

const cursorRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isTextInput = ref(false)

const cursorClass = computed(() => {
  if (isTextInput.value) return 'cursor-text-mode'
  if (isHovering.value) return 'cursor-hover'
  return 'cursor-default'
})

const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input[type="submit"], summary, [onclick], label[for]'
const TEXT_INPUT_SELECTORS = 'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="url"], input[type="tel"], input[type="number"], textarea, [contenteditable="true"]'

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseover', onMouseOver)
  document.addEventListener('mouseout', onMouseOut)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
})

function onMouseMove(e: MouseEvent) {
  if (cursorRef.value) {
    gsap.to(cursorRef.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}

function onMouseOver(e: Event) {
  const target = e.target as HTMLElement
  if (!target?.closest) return

  if (target.closest(TEXT_INPUT_SELECTORS)) {
    isTextInput.value = true
    isHovering.value = false
  } else if (target.closest(INTERACTIVE_SELECTORS)) {
    isHovering.value = true
    isTextInput.value = false
  }
}

function onMouseOut(e: Event) {
  const target = e.target as HTMLElement
  if (!target?.closest) return

  if (target.closest(TEXT_INPUT_SELECTORS)) {
    isTextInput.value = false
  } else if (target.closest(INTERACTIVE_SELECTORS)) {
    isHovering.value = false
  }
}
</script>

<style scoped>
.cursor-ring {
  transform: translate(-50%, -50%);
  transition: width 0.25s ease, height 0.25s ease, background-color 0.25s ease,
              border-width 0.25s ease, border-radius 0.25s ease, opacity 0.25s ease;
}

.cursor-default {
  width: 32px;
  height: 32px;
  border: 1px solid white;
  background: transparent;
}

.cursor-hover {
  width: 48px;
  height: 48px;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.15);
}

.cursor-text-mode {
  width: 3px;
  height: 24px;
  border: none;
  border-radius: 1px;
  background: white;
  opacity: 0.8;
}
</style>
