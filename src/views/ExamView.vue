<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-4">
      <router-link to="/level/a1" class="text-slate-500 hover:text-purple-600 font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </router-link>
      <h2 class="font-fredoka text-2xl font-bold text-purple-600 flex items-center gap-2">
        <i class="fa-solid fa-star text-yellow-400"></i> Examen Final
      </h2>
    </div>

    <section v-if="currentTab === 'menu'" class="flex-grow flex flex-col justify-center pb-10 text-center mt-10">
      <div class="text-8xl mb-6 emoji-shadow animate-bounce-subtle">🏆</div>
      <h1 class="text-4xl font-fredoka font-black text-slate-800 mb-4">El Gran Reto de Manuel</h1>
      <p class="text-slate-500 font-medium text-lg max-w-xl mx-auto mb-10">
        ¡Subimos la dificultad! Este examen tiene 20 preguntas secretas. ¡Y cuidado, en algunas de ellas tendrás que escribir la respuesta correcta! ¿Aceptas el reto?
      </p>
      
      <button @click="startExam" class="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto">
        ¡Empezar Examen! <i class="fa-solid fa-play"></i>
      </button>
    </section>

    <!-- Quiz View -->
    <section v-if="currentTab === 'quiz'" class="max-w-2xl mx-auto w-full pt-4">
      <div class="flex justify-between items-end mb-2">
        <div class="font-fredoka text-purple-600 font-bold flex items-center gap-2">
          <i class="fa-solid fa-trophy text-yellow-400"></i> Puntos: {{ score }}
        </div>
        <div class="text-sm font-bold text-slate-500">Pregunta {{ qIndex + 1 }} / {{ quizQuestions.length }}</div>
      </div>
      
      <div class="w-full bg-slate-200 rounded-full h-3 mb-8 shadow-inner overflow-hidden relative">
        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <div v-if="currentQuestion" class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-popIn">
        <div class="bg-purple-50 py-10 flex flex-col items-center justify-center border-b border-purple-100 relative">
          <div class="text-8xl sm:text-9xl mb-4 emoji-shadow">{{ currentQuestion.emoji }}</div>
          <button @click="speakCurrent" class="absolute top-4 right-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-purple-600 shadow-sm hover:bg-purple-600 hover:text-white transition-colors">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="p-6 sm:p-8">
          <p class="text-center text-slate-400 text-sm font-semibold mb-2">Pista: "{{ currentQuestion.translation }}"</p>
          <h3 class="text-center text-2xl sm:text-3xl font-fredoka font-bold text-slate-800 mb-8" v-html="formattedSentence"></h3>
          
          <!-- Escribir respuesta -->
          <div v-if="currentQuestion.isTyping" class="flex flex-col items-center gap-4">
            <input 
              v-model="textAnswer" 
              type="text" 
              :disabled="hasAnswered"
              @keyup.enter="checkTextAnswer"
              placeholder="Escribe en inglés..." 
              class="w-full max-w-sm text-center font-fredoka font-bold text-2xl px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all"
              :class="{
                'bg-success/10 border-success text-success': hasAnswered && isTextAnswerCorrect,
                'bg-danger/10 border-danger text-danger': hasAnswered && !isTextAnswerCorrect
              }"
            >
            <button v-if="!hasAnswered" @click="checkTextAnswer" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30">
              Comprobar
            </button>
            <div v-if="hasAnswered && !isTextAnswerCorrect" class="text-danger font-bold">
              Respuesta correcta: {{ currentQuestion.correct }}
            </div>
          </div>

          <!-- Opciones múltiples -->
          <div v-else class="grid grid-cols-2 gap-4">
            <button v-for="opt in currentOptions" :key="opt" @click="selectOption(opt)" 
              :disabled="hasAnswered"
              :class="getOptionClass(opt)"
              class="quiz-opt-btn border-2 py-4 px-2 rounded-2xl transition-all font-fredoka font-bold text-xl">
              {{ opt }}
            </button>
          </div>

          <div v-if="hasAnswered" class="mt-6 flex justify-end">
            <button @click="nextQuestion" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/30">
              {{ qIndex === quizQuestions.length - 1 ? 'Terminar' : 'Siguiente' }} <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Results View -->
    <section v-if="currentTab === 'results'" class="max-w-xl mx-auto w-full text-center space-y-6 pt-10">
      <div class="relative inline-block">
        <div class="text-9xl mb-4 emoji-shadow animate-bounce">🎓</div>
        <div class="absolute -top-4 -right-4 text-5xl animate-spin-slow">⭐</div>
      </div>
      
      <h2 class="text-4xl sm:text-5xl font-fredoka font-black text-slate-800 mb-2">¡Felicidades Manuel!</h2>
      <p class="text-xl text-slate-600 font-medium">¡Has completado el Gran Reto!</p>
      
      <div class="bg-white border-2 border-purple-100 rounded-3xl p-6 shadow-xl shadow-purple-500/10 my-8">
        <p class="text-slate-500 mb-2 font-bold uppercase tracking-wider text-sm">Tu Puntuación del Examen</p>
        <div class="text-5xl font-fredoka font-black text-purple-600">{{ score }} / {{ quizQuestions.length * 100 }}</div>
        <p class="text-slate-400 mt-2 text-sm">{{ correctAnswers }} respuestas correctas de {{ quizQuestions.length }}</p>
      </div>
      
      <router-link to="/level/a1" class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-lg">
        <i class="fa-solid fa-arrow-left"></i> Volver a los Niveles
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress'

const progressStore = useProgressStore()

const currentTab = ref('menu')
const score = ref(0)
const correctAnswers = ref(0)

const examDatabase = [
  // Animals
  { emoji: "🐶", sentence: "The ___ is barking.", translation: "El perro está ladrando.", options: ["Cat", "Dog", "Cow", "Pig"], correct: "Dog" },
  { emoji: "🐱", sentence: "My ___ likes to sleep.", translation: "A mi gato le gusta dormir.", options: ["Horse", "Fish", "Cat", "Bird"], correct: "Cat" },
  { emoji: "🐮", sentence: "The ___ gives milk.", translation: "La vaca da leche.", options: ["Dog", "Cow", "Duck", "Rooster"], correct: "Cow" },
  { emoji: "🐷", sentence: "Look at the pink ___.", translation: "Mira el cerdo rosado.", options: ["Pig", "Sheep", "Goat", "Horse"], correct: "Pig" },
  { emoji: "🐴", sentence: "I ride a ___.", translation: "Yo monto un caballo.", options: ["Cow", "Rabbit", "Horse", "Chicken"], correct: "Horse" },
  { emoji: "🦁", sentence: "The ___ roars loudly.", translation: "El león ruge fuerte.", options: ["Lion", "Tiger", "Cat", "Monkey"], correct: "Lion" },
  { emoji: "🐘", sentence: "The ___ has a long trunk.", translation: "El elefante tiene una trompa larga.", options: ["Hippo", "Rhino", "Elephant", "Giraffe"], correct: "Elephant" },
  { emoji: "🐵", sentence: "The ___ loves bananas.", translation: "El mono ama los plátanos.", options: ["Monkey", "Gorilla", "Bear", "Dog"], correct: "Monkey" },
  
  // Food & Colors
  { emoji: "🔴", sentence: "The apple is ___.", translation: "La manzana es roja.", options: ["Blue", "Red", "Green", "Yellow"], correct: "Red" },
  { emoji: "🔵", sentence: "The sky is ___.", translation: "El cielo es azul.", options: ["Red", "Pink", "Blue", "Black"], correct: "Blue" },
  { emoji: "🟡", sentence: "The sun is ___.", translation: "El sol es amarillo.", options: ["White", "Orange", "Green", "Yellow"], correct: "Yellow" },
  { emoji: "🟢", sentence: "The grass is ___.", translation: "El pasto es verde.", options: ["Brown", "Green", "Purple", "Blue"], correct: "Green" },
  { emoji: "🍎", sentence: "I eat an ___.", translation: "Yo como una manzana.", options: ["Apple", "Orange", "Pizza", "Water"], correct: "Apple" },
  { emoji: "🍌", sentence: "Monkeys love ___.", translation: "A los monos les encantan los plátanos.", options: ["Apple", "Carrot", "Banana", "Cheese"], correct: "Banana" },
  { emoji: "🍕", sentence: "I want a slice of ___.", translation: "Quiero una rebanada de pizza.", options: ["Pizza", "Water", "Egg", "Rice"], correct: "Pizza" },
  { emoji: "🥛", sentence: "The cow gives ___.", translation: "La vaca da leche.", options: ["Juice", "Water", "Milk", "Cheese"], correct: "Milk" },
  
  // Objects
  { emoji: "🎒", sentence: "I put my books in my ___.", translation: "Pongo mis libros en mi mochila.", options: ["Desk", "Backpack", "Ruler", "Bed"], correct: "Backpack" },
  { emoji: "📖", sentence: "I like to read a ___.", translation: "Me gusta leer un libro.", options: ["Book", "Tree", "TV", "Pencil"], correct: "Book" },
  { emoji: "✏️", sentence: "I write with a ___.", translation: "Yo escribo con un lápiz.", options: ["Pen", "Ruler", "Pencil", "Lamp"], correct: "Pencil" },
  { emoji: "🚗", sentence: "My dad drives a ___.", translation: "Mi papá maneja un auto.", options: ["Car", "Bus", "Bicycle", "Street"], correct: "Car" },
  { emoji: "🛏️", sentence: "I sleep in my ___.", translation: "Duermo en mi cama.", options: ["Sofa", "Bed", "Car", "Desk"], correct: "Bed" },
  { emoji: "📺", sentence: "I watch ___.", translation: "Yo veo televisión.", options: ["Clock", "TV", "Window", "Door"], correct: "TV" },
  
  // Pronouns
  { emoji: "🙋🏽‍♂️", sentence: "___ am a student.", translation: "Yo soy un estudiante.", options: ["He", "I", "You", "We"], correct: "I" },
  { emoji: "👦🏽", sentence: "___ is playing soccer.", translation: "Él está jugando fútbol.", options: ["She", "We", "He", "They"], correct: "He" },
  { emoji: "👨‍👩‍👧‍👦", sentence: "___ are a family.", translation: "Ellos son una familia.", options: ["They", "I", "He", "She"], correct: "They" },
  { emoji: "👧🏽", sentence: "___ is my sister.", translation: "Ella es mi hermana.", options: ["He", "She", "I", "We"], correct: "She" },
  { emoji: "🐶", sentence: "___ is a good dog.", translation: "Él (animal) es un buen perro.", options: ["He", "She", "It", "They"], correct: "It" },
  { emoji: "👫", sentence: "___ are best friends.", translation: "Nosotros somos mejores amigos.", options: ["They", "We", "I", "You"], correct: "We" }
]

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
const textAnswer = ref("")
const isTextAnswerCorrect = ref(false)

const currentQuestion = computed(() => quizQuestions.value[qIndex.value])
const currentOptions = computed(() => currentQuestion.value ? [...currentQuestion.value.options].sort(() => Math.random() - 0.5) : [])
const progressPercent = computed(() => (qIndex.value / quizQuestions.value.length) * 100)

const formattedSentence = computed(() => {
  if (!currentQuestion.value) return ''
  
  if (currentQuestion.value.isTyping) {
    if (!hasAnswered.value) return currentQuestion.value.sentence
    if (isTextAnswerCorrect.value) {
      return currentQuestion.value.sentence.replace('___', `<span class="text-success underline">${currentQuestion.value.correct}</span>`)
    } else {
      return currentQuestion.value.sentence.replace('___', `<span class="text-danger line-through">${textAnswer.value || '?'}</span> <span class="text-success underline">${currentQuestion.value.correct}</span>`)
    }
  } else {
    if (!hasAnswered.value) return currentQuestion.value.sentence
    if (selectedOption.value === currentQuestion.value.correct) {
      return currentQuestion.value.sentence.replace('___', `<span class="text-success underline">${currentQuestion.value.correct}</span>`)
    } else {
      return currentQuestion.value.sentence.replace('___', `<span class="text-danger line-through">${selectedOption.value}</span> <span class="text-success underline">${currentQuestion.value.correct}</span>`)
    }
  }
})

const startExam = () => {
  // Shuffle all questions
  const shuffledDb = [...examDatabase].sort(() => Math.random() - 0.5)
  // Take 20
  const selected = shuffledDb.slice(0, 20)
  
  // Pick 5 to be typing questions
  const indices = Array.from({length: 20}, (_, i) => i)
  indices.sort(() => Math.random() - 0.5)
  const typingIndices = indices.slice(0, 5)
  
  quizQuestions.value = selected.map((q, i) => {
    return {
      ...q,
      isTyping: typingIndices.includes(i)
    }
  })
  
  qIndex.value = 0
  score.value = 0
  correctAnswers.value = 0
  hasAnswered.value = false
  selectedOption.value = null
  textAnswer.value = ""
  currentTab.value = 'quiz'
}

const checkTextAnswer = () => {
  if (hasAnswered.value || !textAnswer.value.trim()) return
  hasAnswered.value = true
  
  const userText = textAnswer.value.trim().toLowerCase()
  const correctText = currentQuestion.value.correct.toLowerCase()
  
  if (userText === correctText) {
    isTextAnswerCorrect.value = true
    score.value += 100
    correctAnswers.value++
    progressStore.addScore(100)
    progressStore.updateStreak(progressStore.streak + 1)
    if(window.confetti) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#9333ea', '#4f46e5', '#fcd34d'] })
  } else {
    isTextAnswerCorrect.value = false
    progressStore.resetStreak()
  }
}

const selectOption = (opt) => {
  if (hasAnswered.value) return
  hasAnswered.value = true
  selectedOption.value = opt
  
  if (opt === currentQuestion.value.correct) {
    score.value += 100
    correctAnswers.value++
    progressStore.addScore(100)
    progressStore.updateStreak(progressStore.streak + 1)
    if(window.confetti) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#9333ea', '#4f46e5', '#fcd34d'] })
  } else {
    progressStore.resetStreak()
  }
}

const getOptionClass = (opt) => {
  if (!hasAnswered.value) return 'bg-white border-slate-200 text-slate-700 hover:border-purple-500 hover:bg-purple-50/50'
  
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
    textAnswer.value = ""
    isTextAnswerCorrect.value = false
  } else {
    currentTab.value = 'results'
    if(window.confetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }
}
</script>
