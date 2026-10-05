<template>
  <div class="space-y-6">
    <!-- Header interno del tema -->
    <div class="flex items-center justify-between mb-4">
      <router-link v-if="currentTab === 'menu'" to="/level/a1" class="text-slate-500 hover:text-primary font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <i class="fa-solid fa-arrow-left"></i> Niveles
      </router-link>
      <button v-else @click="currentTab = 'menu'" class="text-slate-500 hover:text-primary font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <i class="fa-solid fa-arrow-left"></i> Volver al menú
      </button>
      
      <h2 class="font-fredoka text-2xl font-bold text-slate-800">Objetos del Día a Día</h2>
    </div>

    <!-- Menú Principal del Tema -->
    <section v-if="currentTab === 'menu'" class="flex-grow flex flex-col justify-center pb-10">
      <div class="text-center space-y-3 mb-6">
        <p class="text-slate-600 text-lg max-w-xl mx-auto">
          ¡A explorar! Vamos a aprender cómo se llaman las cosas que usamos todos los días en casa, la escuela y la calle.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        <button @click="currentTab = 'study'" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-images"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">1. Conocer Objetos</h3>
          <p class="text-slate-500 font-medium">Mira tarjetas de cosas de la escuela, del hogar y de la calle.</p>
        </button>

        <button @click="startQuiz" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-primary p-6 text-left transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-gamepad"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">2. Jugar el Quiz Visual</h3>
          <p class="text-slate-500 font-medium">¡Pon a prueba tu memoria! Identifica el objeto correcto.</p>
        </button>
      </div>
    </section>

    <!-- Sección de Estudio -->
    <section v-if="currentTab === 'study'" class="space-y-6">
      <div class="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-2xl flex gap-3 items-start shadow-sm mb-6">
        <i class="fa-solid fa-lightbulb text-xl text-warning mt-0.5 animate-bounce-subtle"></i>
        <div>
          <p class="font-bold text-sm sm:text-base">Instrucciones para Manuel:</p>
          <p class="text-sm">Toca cada tarjeta para ver cómo se dice en español. Usa la bocina para escuchar la pronunciación.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        <div v-for="p in objectsData" :key="p.id" class="perspective w-full h-72 cursor-pointer group flashcard" :class="{'flipped': flippedCards[p.id]}" @click="flipCard(p.id)">
          <div class="flashcard-inner relative w-full h-full rounded-3xl shadow-lg border border-slate-100 bg-white">
            <div class="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-slate-50 rounded-3xl">
              <div class="text-7xl mb-4 emoji-shadow transition-transform group-hover:scale-110">{{ p.emoji }}</div>
              <h3 class="text-4xl font-fredoka font-black text-slate-800 tracking-wide">{{ p.eng }}</h3>
              <button @click.stop="speak(p.eng)" class="absolute top-4 right-4 w-12 h-12 bg-indigo-100 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm text-lg z-10">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
            <div :class="['absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br text-white', p.color]">
              <h3 class="text-3xl font-fredoka font-black mb-3">{{ p.spa }}</h3>
              <p class="text-center text-sm font-semibold opacity-90 leading-relaxed px-2">{{ p.desc }}</p>
              <button @click.stop="speak(p.eng)" class="mt-6 bg-white/20 hover:bg-white text-white hover:text-slate-800 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors">
                <i class="fa-solid fa-volume-high"></i> Escuchar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quiz View -->
    <section v-if="currentTab === 'quiz'" class="max-w-2xl mx-auto w-full">
      <!-- ProgressBar y estado del Quiz similar a tu html original -->
      <div class="text-sm font-bold text-slate-500 text-right mb-2">Pregunta {{ qIndex + 1 }} / {{ quizQuestions.length }}</div>
      <div class="w-full bg-slate-200 rounded-full h-3 mb-8 shadow-inner overflow-hidden">
        <div class="bg-gradient-to-r from-info to-primary h-3 rounded-full transition-all duration-500" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <div v-if="currentQuestion" class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-popIn">
        <div class="bg-slate-50 py-10 flex flex-col items-center justify-center border-b border-slate-100 relative">
          <div class="text-8xl sm:text-9xl mb-4 emoji-shadow animate-bounce-subtle">{{ currentQuestion.emoji }}</div>
          <button @click="speakCurrent" class="absolute top-4 right-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="p-6 sm:p-8">
          <p class="text-center text-slate-400 text-sm font-semibold mb-2">Pista: "{{ currentQuestion.translation }}"</p>
          <h3 class="text-center text-2xl sm:text-3xl font-fredoka font-bold text-slate-800 mb-8" v-html="formattedSentence"></h3>
          
          <div class="grid grid-cols-2 gap-4">
            <button v-for="opt in currentOptions" :key="opt" @click="selectOption(opt)" 
              :disabled="hasAnswered"
              :class="getOptionClass(opt)"
              class="quiz-opt-btn border-2 py-4 px-2 rounded-2xl transition-all font-fredoka font-bold text-xl">
              {{ opt }}
            </button>
          </div>

          <div v-if="hasAnswered" class="mt-6 flex justify-end">
            <button @click="nextQuestion" class="bg-primary hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/30">
              Siguiente <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <section v-if="currentTab === 'results'" class="max-w-lg mx-auto w-full text-center space-y-6 pt-10">
      <div class="text-8xl mb-2 emoji-shadow animate-bounce">🏆</div>
      <h2 class="text-4xl font-fredoka font-bold text-slate-800">¡Reto Completado!</h2>
      <button @click="currentTab = 'menu'" class="bg-primary hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/30 mt-4">
        <i class="fa-solid fa-house mr-2"></i> Ir al Menú
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'

const progressStore = useProgressStore()

const currentTab = ref('menu')
const flippedCards = ref({})

const objectsData = [
  // Escuela
  { id: "Backpack", eng: "Backpack", spa: "Mochila", emoji: "🎒", color: "from-blue-400 to-blue-600", desc: "Para llevar tus cosas a la escuela." },
  { id: "Book", eng: "Book", spa: "Libro", emoji: "📖", color: "from-indigo-400 to-indigo-600", desc: "Tiene historias y dibujos." },
  { id: "Pencil", eng: "Pencil", spa: "Lápiz", emoji: "✏️", color: "from-yellow-400 to-yellow-600", desc: "Para escribir y dibujar." },
  { id: "Pen", eng: "Pen", spa: "Pluma / Bolígrafo", emoji: "🖊️", color: "from-blue-600 to-blue-800", desc: "Escribe con tinta." },
  { id: "Notebook", eng: "Notebook", spa: "Cuaderno", emoji: "📓", color: "from-slate-400 to-slate-600", desc: "Donde tomas tus apuntes." },
  { id: "Ruler", eng: "Ruler", spa: "Regla", emoji: "📏", color: "from-amber-400 to-amber-600", desc: "Para medir y hacer líneas rectas." },
  { id: "Eraser", eng: "Eraser", spa: "Goma de borrar", emoji: "🖍️", color: "from-pink-400 to-pink-600", desc: "Para corregir errores." },
  { id: "Desk", eng: "Desk", spa: "Escritorio / Pupitre", emoji: "🪑", color: "from-amber-600 to-amber-800", desc: "Tu mesa en la escuela." },

  // Hogar
  { id: "Bed", eng: "Bed", spa: "Cama", emoji: "🛏️", color: "from-cyan-400 to-cyan-600", desc: "Donde duermes muy cómodo." },
  { id: "Table", eng: "Table", spa: "Mesa", emoji: "🪵", color: "from-amber-700 to-amber-900", desc: "Donde te sientas a comer." },
  { id: "Chair", eng: "Chair", spa: "Silla", emoji: "🪑", color: "from-stone-400 to-stone-600", desc: "Para sentarte a descansar." },
  { id: "Sofa", eng: "Sofa", spa: "Sofá", emoji: "🛋️", color: "from-rose-400 to-rose-600", desc: "Para ver la tele en la sala." },
  { id: "TV", eng: "TV", spa: "Televisión", emoji: "📺", color: "from-slate-700 to-slate-900", desc: "Para ver tus caricaturas favoritas." },
  { id: "Door", eng: "Door", spa: "Puerta", emoji: "🚪", color: "from-amber-800 to-yellow-900", desc: "La abres para entrar a tu cuarto." },
  { id: "Window", eng: "Window", spa: "Ventana", emoji: "🪟", color: "from-sky-300 to-sky-500", desc: "Para mirar hacia afuera." },
  { id: "Clock", eng: "Clock", spa: "Reloj", emoji: "🕰️", color: "from-slate-300 to-slate-500", desc: "Nos dice la hora." },
  { id: "Lamp", eng: "Lamp", spa: "Lámpara", emoji: "💡", color: "from-yellow-300 to-yellow-500", desc: "Nos da luz en la oscuridad." },

  // Calle
  { id: "Car", eng: "Car", spa: "Auto / Coche", emoji: "🚗", color: "from-red-500 to-red-700", desc: "Tiene 4 ruedas y va rápido." },
  { id: "Bus", eng: "Bus", spa: "Autobús", emoji: "🚌", color: "from-yellow-500 to-yellow-700", desc: "Lleva a muchas personas juntas." },
  { id: "Bicycle", eng: "Bicycle", spa: "Bicicleta", emoji: "🚲", color: "from-teal-400 to-teal-600", desc: "Tienes que pedalear para avanzar." },
  { id: "Tree", eng: "Tree", spa: "Árbol", emoji: "🌳", color: "from-green-500 to-green-700", desc: "Nos da sombra y oxígeno." },
  { id: "House", eng: "House", spa: "Casa", emoji: "🏠", color: "from-orange-400 to-orange-600", desc: "El lugar donde vivimos." },
  { id: "Street", eng: "Street", spa: "Calle", emoji: "🛣️", color: "from-slate-500 to-slate-700", desc: "Por donde pasan los autos." },
  { id: "TrafficLight", eng: "Traffic Light", spa: "Semáforo", emoji: "🚥", color: "from-slate-700 to-black", desc: "Rojo: Alto. Verde: Siga." }
]

const quizDatabase = [
  // School
  { emoji: "🎒", sentence: "I put my books in my ___.", translation: "Pongo mis libros en mi mochila.", options: ["Desk", "Backpack", "Ruler", "Bed"], correct: "Backpack" },
  { emoji: "📖", sentence: "I like to read a ___.", translation: "Me gusta leer un libro.", options: ["Book", "Tree", "TV", "Pencil"], correct: "Book" },
  { emoji: "✏️", sentence: "I write with a ___.", translation: "Yo escribo con un lápiz.", options: ["Pen", "Ruler", "Pencil", "Lamp"], correct: "Pencil" },
  { emoji: "🪑", sentence: "I sit on a ___.", translation: "Me siento en una silla.", options: ["Table", "Chair", "Door", "House"], correct: "Chair" },
  
  // Home
  { emoji: "🛏️", sentence: "I sleep in my ___.", translation: "Duermo en mi cama.", options: ["Sofa", "Bed", "Car", "Desk"], correct: "Bed" },
  { emoji: "📺", sentence: "I watch ___.", translation: "Yo veo televisión.", options: ["Clock", "TV", "Window", "Door"], correct: "TV" },
  { emoji: "🚪", sentence: "Open the ___.", translation: "Abre la puerta.", options: ["Street", "Table", "Notebook", "Door"], correct: "Door" },
  { emoji: "💡", sentence: "Turn on the ___.", translation: "Enciende la lámpara.", options: ["Lamp", "Tree", "Bicycle", "Eraser"], correct: "Lamp" },
  
  // Street
  { emoji: "🚗", sentence: "My dad drives a ___.", translation: "Mi papá maneja un auto.", options: ["Car", "Bus", "Bicycle", "Street"], correct: "Car" },
  { emoji: "🚌", sentence: "The school ___ is yellow.", translation: "El autobús escolar es amarillo.", options: ["Car", "Tree", "House", "Bus"], correct: "Bus" },
  { emoji: "🌳", sentence: "The bird is in the ___.", translation: "El pájaro está en el árbol.", options: ["Traffic Light", "Tree", "Street", "Lamp"], correct: "Tree" },
  { emoji: "🏠", sentence: "We live in a ___.", translation: "Vivimos en una casa.", options: ["House", "Sofa", "Desk", "Bed"], correct: "House" }
]

const flipCard = (id) => {
  flippedCards.value[id] = !flippedCards.value[id]
}

const speak = (text) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// Quiz state
const quizQuestions = ref([])
const qIndex = ref(0)
const hasAnswered = ref(false)
const selectedOption = ref(null)

const currentQuestion = computed(() => quizQuestions.value[qIndex.value])
const currentOptions = computed(() => currentQuestion.value ? [...currentQuestion.value.options].sort(() => Math.random() - 0.5) : [])
const progressPercent = computed(() => (qIndex.value / quizQuestions.value.length) * 100)

const formattedSentence = computed(() => {
  if (!currentQuestion.value) return ''
  if (!hasAnswered.value) return currentQuestion.value.sentence
  
  if (selectedOption.value === currentQuestion.value.correct) {
    return currentQuestion.value.sentence.replace('___', `<span class="text-success underline">${currentQuestion.value.correct}</span>`)
  } else {
    return currentQuestion.value.sentence.replace('___', `<span class="text-danger line-through">${selectedOption.value}</span> <span class="text-success underline">${currentQuestion.value.correct}</span>`)
  }
})

const startQuiz = () => {
  quizQuestions.value = [...quizDatabase].sort(() => Math.random() - 0.5)
  qIndex.value = 0
  hasAnswered.value = false
  selectedOption.value = null
  currentTab.value = 'quiz'
}

const selectOption = (opt) => {
  if (hasAnswered.value) return
  hasAnswered.value = true
  selectedOption.value = opt
  
  if (opt === currentQuestion.value.correct) {
    progressStore.addScore(50)
    progressStore.updateStreak(progressStore.streak + 1)
    if(window.confetti) confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#4f46e5', '#10b981', '#f59e0b'] })
  } else {
    progressStore.resetStreak()
  }
}

const getOptionClass = (opt) => {
  if (!hasAnswered.value) return 'bg-white border-slate-200 text-slate-700 hover:border-primary hover:bg-indigo-50/50'
  
  if (opt === currentQuestion.value.correct) {
    return 'bg-success/20 border-success text-success'
  }
  if (opt === selectedOption.value) {
    return 'bg-danger/10 border-danger text-danger'
  }
  return 'bg-white border-slate-200 text-slate-400 opacity-50'
}

const speakCurrent = () => {
  if (hasAnswered.value) {
    speak(currentQuestion.value.sentence.replace('___', currentQuestion.value.correct))
  } else {
    speak('Blank')
  }
}

const nextQuestion = () => {
  if (qIndex.value < quizQuestions.value.length - 1) {
    qIndex.value++
    hasAnswered.value = false
    selectedOption.value = null
  } else {
    currentTab.value = 'results'
  }
}
</script>
