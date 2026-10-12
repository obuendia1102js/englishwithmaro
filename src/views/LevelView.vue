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

    <!-- Lecciones Básicas de Vocabulario -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      
      <!-- Tema 1: Animales -->
      <router-link to="/topic/animals" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-emerald-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex flex-col items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          🦁
        </div>
        <div class="flex-grow">
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">1. Animales</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">Granja, domésticos y selva. ¡Conoce a todos!</p>
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
          <p class="text-slate-500 font-medium text-sm mb-3">Frutas, verduras, platillos ricos y colores clave.</p>
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
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">3. Cosas del Día a Día</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">Objetos de la casa, la escuela y la calle.</p>
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
          <p class="text-slate-500 font-medium text-sm mb-3">I, You, He, She, It, We, They. ¡A dominarlos!</p>
        </div>
        <div class="font-bold text-primary text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
          Practicar <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>
    </div>

    <!-- SECCIÓN DE CUENTOS Y LECTURAS (REFUERZO DE PRONOMBRES) -->
    <div class="mt-12 space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <span class="text-3xl">📚</span> Cuentos y Lecturas de Manuel
          </h3>
          <p class="text-slate-500 text-sm font-medium">
            Historias especiales para practicar comprensión y reforzar pronombres con voz en inglés.
          </p>
        </div>
        <span class="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full">
          4 Historias Disponibles
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <!-- Cuento 1: Dinosaurio -->
        <router-link to="/reading/toby-dinosaur" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-teal-500 p-5 text-left transition-all hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1 flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <div class="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🦖
            </div>
            <span class="text-[11px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg">Aventura</span>
          </div>
          <h4 class="font-fredoka text-lg font-bold text-slate-800 mb-1">Toby the T-Rex</h4>
          <p class="text-slate-500 text-xs font-medium mb-3 flex-grow">
            Un bebé dinosaurio muy amistoso que ama comer pizza y jugar fútbol.
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
            <span>Leer cuento</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </router-link>

        <!-- Cuento 2: Tortuga Cayman -->
        <router-link to="/reading/cayman-turtle" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-emerald-500 p-5 text-left transition-all hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🐢
            </div>
            <span class="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg">He • We • You</span>
          </div>
          <h4 class="font-fredoka text-lg font-bold text-slate-800 mb-1">Cayman the Super Turtle</h4>
          <p class="text-slate-500 text-xs font-medium mb-3 flex-grow">
            ¿Lento? ¡Para nada! Cayman corre a toda velocidad cuando huele lechuga fresca.
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Leer cuento</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </router-link>

        <!-- Cuento 3: Conejos Honey y Locho -->
        <router-link to="/reading/honey-locho-rabbits" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-500 p-5 text-left transition-all hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🐰
            </div>
            <span class="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg">They • She • He</span>
          </div>
          <h4 class="font-fredoka text-lg font-bold text-slate-800 mb-1">Honey & Locho</h4>
          <p class="text-slate-500 text-xs font-medium mb-3 flex-grow">
            Honey es tierna y come zanahorias; Locho no para de saltar sobre las cajas.
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
            <span>Leer cuento</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </router-link>

        <!-- Cuento 4: Familia Papá y Mamá -->
        <router-link to="/reading/family-adventure" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-purple-500 p-5 text-left transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              👨‍👩‍👦
            </div>
            <span class="text-[11px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg">She • He • They • We</span>
          </div>
          <h4 class="font-fredoka text-lg font-bold text-slate-800 mb-1">With Mom & Dad</h4>
          <p class="text-slate-500 text-xs font-medium mb-3 flex-grow">
            Hot cakes con mamá, jugo fresco con papá y una divertida tarde en el parque.
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
            <span>Leer cuento</span>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </router-link>
      </div>
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
