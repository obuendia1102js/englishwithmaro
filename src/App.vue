<template>
  <!-- Header Global -->
  <header class="bg-white sticky top-0 z-40 border-b border-indigo-100 shadow-sm px-4 py-3">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 cursor-pointer">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-info text-white flex items-center justify-center font-fredoka font-bold text-2xl shadow-lg shadow-primary/30">
          M
        </div>
        <div>
          <h1 class="font-fredoka text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
            Inglés con Maro
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 font-semibold">Especial para Manuel 🚀</p>
        </div>
      </router-link>

      <div class="flex items-center gap-2 sm:gap-4">
        <div class="flex items-center gap-1.5 bg-warning/10 border border-warning/30 px-3 py-1.5 rounded-xl text-warning font-bold shadow-sm">
          <i class="fa-solid fa-fire animate-pulse"></i>
          <span>{{ progressStore.streak }}</span>
        </div>
        <div class="flex items-center gap-1.5 bg-success/10 border border-success/30 px-3 py-1.5 rounded-xl text-success font-bold shadow-sm">
          <i class="fa-solid fa-star"></i>
          <span>{{ progressStore.score }}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Contenido de las vistas -->
  <main class="max-w-5xl mx-auto w-full px-4 py-6 flex-grow flex flex-col relative">
    <router-view />
  </main>
</template>

<script setup>
import { useProgressStore } from './stores/progress'

const progressStore = useProgressStore()
</script>
