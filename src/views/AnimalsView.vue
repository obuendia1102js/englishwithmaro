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
      
      <h2 class="font-fredoka text-2xl font-bold text-slate-800">Animales</h2>
    </div>

    <!-- Menú Principal del Tema -->
    <section v-if="currentTab === 'menu'" class="flex-grow flex flex-col justify-center pb-10">
      <div class="text-center space-y-3 mb-6">
        <p class="text-slate-600 text-lg max-w-xl mx-auto">
          Vamos a conocer a los animales de granja, domésticos y de la selva. ¿Qué quieres hacer primero?
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        <button @click="currentTab = 'study'" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-emerald-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-images"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">1. Conocer a los Animales</h3>
          <p class="text-slate-500 font-medium">Mira tarjetas interactivas de 30 animales y escucha sus nombres en inglés.</p>
        </button>

        <button @click="startQuiz" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-primary p-6 text-left transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-gamepad"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">2. Jugar el Quiz Visual</h3>
          <p class="text-slate-500 font-medium">¡Pon a prueba tu memoria! Identifica de qué animal estamos hablando.</p>
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
        <div v-for="p in animalsData" :key="p.id" class="perspective w-full h-72 cursor-pointer group flashcard" :class="{'flipped': flippedCards[p.id]}" @click="flipCard(p.id)">
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

const animalsData = [
  { id: "Dog", eng: "Dog", spa: "Perro", emoji: "🐶", color: "from-amber-400 to-amber-600", desc: "El mejor amigo del hombre." },
  { id: "Cat", eng: "Cat", spa: "Gato", emoji: "🐱", color: "from-orange-400 to-orange-600", desc: "Un felino doméstico muy ágil." },
  { id: "Cow", eng: "Cow", spa: "Vaca", emoji: "🐮", color: "from-slate-400 to-slate-600", desc: "Un animal de granja que da leche." },
  { id: "Pig", eng: "Pig", spa: "Cerdo", emoji: "🐷", color: "from-pink-400 to-pink-600", desc: "Un animal rosado muy inteligente." },
  { id: "Horse", eng: "Horse", spa: "Caballo", emoji: "🐴", color: "from-amber-600 to-amber-800", desc: "Un animal fuerte para montar." },
  { id: "Sheep", eng: "Sheep", spa: "Oveja", emoji: "🐑", color: "from-slate-200 to-slate-400", desc: "Nos da lana calientita." },
  { id: "Goat", eng: "Goat", spa: "Cabra", emoji: "🐐", color: "from-stone-400 to-stone-600", desc: "Una experta escaladora." },
  { id: "Chicken", eng: "Chicken", spa: "Gallina", emoji: "🐔", color: "from-red-400 to-red-600", desc: "Pone huevos para el desayuno." },
  { id: "Duck", eng: "Duck", spa: "Pato", emoji: "🦆", color: "from-emerald-400 to-emerald-600", desc: "Le encanta nadar en el lago." },
  { id: "Turkey", eng: "Turkey", spa: "Pavo", emoji: "🦃", color: "from-red-500 to-red-700", desc: "Un ave grande de granja." },
  { id: "Rabbit", eng: "Rabbit", spa: "Conejo", emoji: "🐰", color: "from-slate-300 to-slate-500", desc: "Salta muy alto y come zanahorias." },
  { id: "Mouse", eng: "Mouse", spa: "Ratón", emoji: "🐭", color: "from-slate-400 to-slate-600", desc: "Un pequeño roedor." },
  { id: "Bird", eng: "Bird", spa: "Pájaro", emoji: "🐦", color: "from-blue-400 to-blue-600", desc: "Canta alegre por las mañanas." },
  { id: "Rooster", eng: "Rooster", spa: "Gallo", emoji: "🐓", color: "from-red-600 to-red-800", desc: "Nos despierta al amanecer." },
  { id: "Donkey", eng: "Donkey", spa: "Burro", emoji: "🐴", color: "from-stone-500 to-stone-700", desc: "Muy fuerte y trabajador." },
  { id: "Goose", eng: "Goose", spa: "Ganso", emoji: "🦢", color: "from-slate-100 to-slate-300", desc: "Un ave blanca que nada." },
  { id: "Bull", eng: "Bull", spa: "Toro", emoji: "🐂", color: "from-stone-700 to-stone-900", desc: "El macho de la vaca." },
  { id: "Fish", eng: "Fish", spa: "Pez", emoji: "🐟", color: "from-cyan-400 to-cyan-600", desc: "Vive bajo el agua." },
  { id: "Turtle", eng: "Turtle", spa: "Tortuga", emoji: "🐢", color: "from-green-500 to-green-700", desc: "Lleva su casa en la espalda." },
  { id: "Hamster", eng: "Hamster", spa: "Hámster", emoji: "🐹", color: "from-amber-300 to-amber-500", desc: "Guarda comida en sus mejillas." },
  { id: "Parrot", eng: "Parrot", spa: "Loro", emoji: "🦜", color: "from-red-500 to-green-500", desc: "¡Puede aprender a hablar!" },
  { id: "Guinea Pig", eng: "Guinea Pig", spa: "Cobaya", emoji: "🐹", color: "from-stone-400 to-stone-600", desc: "Un roedor gordito y tierno." },
  { id: "Alpaca", eng: "Alpaca", spa: "Alpaca", emoji: "🦙", color: "from-stone-300 to-stone-500", desc: "Tiene un pelaje muy suave." },
  { id: "Llama", eng: "Llama", spa: "Llama", emoji: "🦙", color: "from-yellow-600 to-yellow-800", desc: "Prima alta de la alpaca." },
  { id: "Puppy", eng: "Puppy", spa: "Cachorro", emoji: "🐶", color: "from-amber-300 to-amber-500", desc: "Un perrito bebé." },
  { id: "Kitten", eng: "Kitten", spa: "Gatito", emoji: "🐱", color: "from-orange-300 to-orange-500", desc: "Un gato bebé." },
  { id: "Calf", eng: "Calf", spa: "Ternero", emoji: "🐮", color: "from-slate-300 to-slate-500", desc: "Una vaca bebé." },
  { id: "Piglet", eng: "Piglet", spa: "Cerdito", emoji: "🐷", color: "from-pink-300 to-pink-500", desc: "Un cerdo bebé." },
  { id: "Foal", eng: "Foal", spa: "Potrillo", emoji: "🐴", color: "from-amber-500 to-amber-700", desc: "Un caballo bebé." },
  { id: "Chick", eng: "Chick", spa: "Pollito", emoji: "🐥", color: "from-yellow-400 to-yellow-600", desc: "El bebé de la gallina." },
  // Animales de la selva y salvajes
  { id: "Lion", eng: "Lion", spa: "León", emoji: "🦁", color: "from-amber-500 to-orange-600", desc: "El rey de la selva." },
  { id: "Tiger", eng: "Tiger", spa: "Tigre", emoji: "🐯", color: "from-orange-500 to-orange-700", desc: "Un felino grande con rayas." },
  { id: "Elephant", eng: "Elephant", spa: "Elephant", emoji: "🐘", color: "from-slate-400 to-slate-600", desc: "Tiene una trompa muy larga." },
  { id: "Monkey", eng: "Monkey", spa: "Mono", emoji: "🐵", color: "from-amber-700 to-amber-900", desc: "Le encanta comer plátanos." },
  { id: "Gorilla", eng: "Gorilla", spa: "Gorila", emoji: "🦍", color: "from-stone-600 to-stone-800", desc: "Muy grande y fuerte." },
  { id: "Snake", eng: "Snake", spa: "Serpiente", emoji: "🐍", color: "from-emerald-500 to-emerald-700", desc: "Se arrastra por el suelo." },
  { id: "Crocodile", eng: "Crocodile", spa: "Cocodrilo", emoji: "🐊", color: "from-green-600 to-green-800", desc: "Tiene dientes muy grandes." },
  { id: "Zebra", eng: "Zebra", spa: "Cebra", emoji: "🦓", color: "from-slate-700 to-slate-900", desc: "Parece un caballo con rayas blancas y negras." },
  { id: "Giraffe", eng: "Giraffe", spa: "Jirafa", emoji: "🦒", color: "from-yellow-500 to-orange-500", desc: "Tiene el cuello muy largo." },
  { id: "Hippo", eng: "Hippo", spa: "Hipopótamo", emoji: "🦛", color: "from-slate-400 to-indigo-400", desc: "Le gusta estar en el agua todo el día." },
  { id: "Rhino", eng: "Rhino", spa: "Rinoceronte", emoji: "🦏", color: "from-stone-400 to-stone-600", desc: "Tiene un cuerno en la nariz." },
  { id: "Bear", eng: "Bear", spa: "Oso", emoji: "🐻", color: "from-amber-800 to-amber-950", desc: "Le gusta mucho la miel." },
  { id: "Panda", eng: "Panda", spa: "Panda", emoji: "🐼", color: "from-slate-800 to-black", desc: "Un oso blanco y negro que come bambú." },
  { id: "Koala", eng: "Koala", spa: "Koala", emoji: "🐨", color: "from-slate-400 to-slate-500", desc: "Duerme abrazado a los árboles." }
]

const quizDatabase = [
  { emoji: "🐶", sentence: "The ___ is barking.", translation: "El perro está ladrando.", options: ["Cat", "Dog", "Cow", "Pig"], correct: "Dog" },
  { emoji: "🐱", sentence: "My ___ likes to sleep.", translation: "A mi gato le gusta dormir.", options: ["Horse", "Fish", "Cat", "Bird"], correct: "Cat" },
  { emoji: "🐮", sentence: "The ___ gives milk.", translation: "La vaca da leche.", options: ["Dog", "Cow", "Duck", "Rooster"], correct: "Cow" },
  { emoji: "🐷", sentence: "Look at the pink ___.", translation: "Mira el cerdo rosado.", options: ["Pig", "Sheep", "Goat", "Horse"], correct: "Pig" },
  { emoji: "🐴", sentence: "I ride a ___.", translation: "Yo monto un caballo.", options: ["Cow", "Rabbit", "Horse", "Chicken"], correct: "Horse" },
  { emoji: "🐑", sentence: "The ___ has wool.", translation: "La oveja tiene lana.", options: ["Dog", "Sheep", "Fish", "Turtle"], correct: "Sheep" },
  { emoji: "🐔", sentence: "The ___ lays eggs.", translation: "La gallina pone huevos.", options: ["Chicken", "Cow", "Pig", "Donkey"], correct: "Chicken" },
  { emoji: "🦆", sentence: "The ___ is in the water.", translation: "El pato está en el agua.", options: ["Duck", "Goat", "Cat", "Turkey"], correct: "Duck" },
  { emoji: "🐰", sentence: "The ___ eats a carrot.", translation: "El conejo come una zanahoria.", options: ["Bird", "Rabbit", "Mouse", "Hamster"], correct: "Rabbit" },
  { emoji: "🐭", sentence: "A small ___.", translation: "Un pequeño ratón.", options: ["Mouse", "Cow", "Horse", "Pig"], correct: "Mouse" },
  { emoji: "🦁", sentence: "The ___ roars loudly.", translation: "El león ruge fuerte.", options: ["Lion", "Tiger", "Cat", "Monkey"], correct: "Lion" },
  { emoji: "🐘", sentence: "The ___ has a long trunk.", translation: "El elefante tiene una trompa larga.", options: ["Hippo", "Rhino", "Elephant", "Giraffe"], correct: "Elephant" },
  { emoji: "🐵", sentence: "The ___ loves bananas.", translation: "El mono ama los plátanos.", options: ["Monkey", "Gorilla", "Bear", "Dog"], correct: "Monkey" },
  { emoji: "🦒", sentence: "The ___ is very tall.", translation: "La jirafa es muy alta.", options: ["Horse", "Giraffe", "Zebra", "Lion"], correct: "Giraffe" },
  { emoji: "🐻", sentence: "The ___ eats honey.", translation: "El oso come miel.", options: ["Bear", "Panda", "Lion", "Tiger"], correct: "Bear" }
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
