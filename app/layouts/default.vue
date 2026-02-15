<template>
  <div class="min-h-screen bg-background text-primary selection:bg-accent selection:text-white overflow-hidden">
    <CustomCursor />
    <AppHeader />
    <main class="relative z-10">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import CustomCursor from '~/components/ui/CustomCursor.vue'
</script>
