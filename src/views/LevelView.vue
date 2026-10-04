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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <!-- Tema Pronombres (El que el usuario ya creó) -->
      <router-link to="/topic/pronouns" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-primary p-6 text-left transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 flex items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
          👦🏽
        </div>
        <div>
          <h3 class="font-fredoka text-xl font-bold text-slate-800 mb-1">Pronombres Personales</h3>
          <p class="text-slate-500 font-medium text-sm mb-3">I, You, He, She, It, We, They. ¡Aprende a identificarlos!</p>
          <div class="font-bold text-primary text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Practicar <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </router-link>
      
      <!-- Próximos temas -->
      <div class="opacity-60 cursor-not-allowed group relative overflow-hidden rounded-3xl bg-slate-50 border-2 border-slate-200 p-6 flex items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center text-3xl shrink-0">
          🍎
        </div>
        <div>
          <h3 class="font-fredoka text-xl font-bold text-slate-500 mb-1">Comida y Colores</h3>
          <p class="text-slate-400 font-medium text-sm mb-3">Vocabulario básico sobre tus alimentos favoritos.</p>
          <div class="font-bold text-slate-400 text-sm flex items-center gap-2">
            <i class="fa-solid fa-lock"></i> Próximamente
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const levelId = computed(() => route.params.levelId || 'a1')
</script>
