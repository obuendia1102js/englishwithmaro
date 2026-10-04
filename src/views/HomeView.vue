<template>
  <div class="space-y-6 flex-grow flex flex-col pb-10 mt-8">
    <div class="text-center space-y-3 mb-6">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-fredoka font-bold text-slate-800">
        ¡Hola <span class="text-primary">Manuel</span>!
      </h2>
      <p class="text-slate-600 text-lg max-w-xl mx-auto">
        ¿Qué nivel quieres practicar hoy? ¡Vamos a aprender juntos!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      
      <!-- Nivel Inicial -->
      <router-link to="/level/a1" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-info p-6 text-left transition-all hover:shadow-2xl hover:shadow-info/20 hover:-translate-y-1 block">
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-info/10 rounded-full blur-2xl group-hover:bg-info/20 transition-all"></div>
        <div class="w-16 h-16 rounded-2xl bg-info/10 text-info flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
          <i class="fa-solid fa-seedling"></i>
        </div>
        <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">Nivel A1 (Básico)</h3>
        <p class="text-slate-500 font-medium mb-4">Aprende los pronombres, colores, animales y saludos.</p>
        <div class="w-full bg-slate-100 rounded-full h-2.5 mb-2">
          <div class="bg-info h-2.5 rounded-full" style="width: 20%"></div>
        </div>
        <p class="text-xs text-right text-slate-400 font-bold mb-4">20% Completado</p>
        
        <div class="mt-auto font-bold text-info flex items-center gap-2 group-hover:translate-x-2 transition-transform">
          Entrar al nivel <i class="fa-solid fa-arrow-right"></i>
        </div>
      </router-link>

      <!-- Nivel A2 -->
      <div class="opacity-75 cursor-not-allowed group relative overflow-hidden rounded-3xl bg-slate-50 border-2 border-slate-200 p-6 text-left transition-all">
        <div class="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-3xl mb-4">
          <i class="fa-solid fa-tree"></i>
        </div>
        <h3 class="font-fredoka text-2xl font-bold text-slate-500 mb-2">Nivel A2 (Pronto)</h3>
        <p class="text-slate-400 font-medium mb-4">Frases completas, rutinas diarias y vocabulario nuevo.</p>
        <div class="mt-auto font-bold text-slate-400 flex items-center gap-2">
          <i class="fa-solid fa-lock"></i> Bloqueado
        </div>
      </div>

    </div>
  </div>
</template>
