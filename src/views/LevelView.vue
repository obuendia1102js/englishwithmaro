<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4 mb-6">
      <router-link to="/" class="text-slate-500 hover:text-primary font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </router-link>
      <h2 class="font-fredoka text-3xl font-bold text-slate-800">
        Temas del Nivel {{ levelId.toUpperCase() }}
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      
      <!-- Tema 1: Animales -->
      <router-link to="/topic/animals" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-emerald-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex flex-col items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          🦁
        </div>
        <div class="flex-grow">
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">1. Animales (Granja, Domésticos y Selva)</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">Perros, leones, elefantes... ¡Vamos a conocerlos a todos!</p>
        </div>
        <div class="font-bold text-emerald-600 text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
          Practicar <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>

      <!-- Tema 2: Comida y Colores -->
      <router-link to="/topic/food-colors" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-rose-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1 flex flex-col items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          🍎
        </div>
        <div class="flex-grow">
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">2. Comida y Colores</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">Frutas, verduras, platos deliciosos y muchos colores.</p>
        </div>
        <div class="font-bold text-rose-500 text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
          Practicar <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>

      <!-- Tema 3: Objetos del Día a Día -->
      <router-link to="/topic/objects" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 flex flex-col items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          🎒
        </div>
        <div class="flex-grow">
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">3. Objetos del Día a Día</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">Cosas de la casa, la escuela y la calle.</p>
        </div>
        <div class="font-bold text-amber-500 text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
          Practicar <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>

      <!-- Tema 4: Pronombres -->
      <router-link to="/topic/pronouns" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-primary p-6 text-left transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 flex flex-col items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          👦🏽
        </div>
        <div class="flex-grow">
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">4. Pronombres Personales</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">I, You, He, She, It, We, They. ¡Aprende a identificarlos!</p>
        </div>
        <div class="font-bold text-primary text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
          Practicar <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>
    </div>

    <!-- Examen Final -->
    <div class="mt-10">
      <router-link to="/exam/a1" class="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 border-none p-8 text-left transition-all hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full text-white">
        <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">
          🏆
        </div>
        <div class="flex-grow text-center sm:text-left">
          <h3 class="font-fredoka text-2xl font-bold mb-2">Examen Final: Nivel A1</h3>
          <p class="font-medium text-indigo-100 mb-4 max-w-xl">
            ¡Demuestra todo lo que aprendiste sobre Animales, Comida, Colores, Objetos y Pronombres! 
          </p>
          <div class="inline-flex items-center gap-2 bg-white text-purple-600 font-bold px-6 py-3 rounded-xl shadow-lg group-hover:bg-purple-50 transition-colors">
            ¡Comenzar el Gran Reto! <i class="fa-solid fa-play"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const levelId = computed(() => route.params.levelId || 'a1')
</script>
