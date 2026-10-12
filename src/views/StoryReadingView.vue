<template>
  <div class="space-y-6">
    <!-- Header interno y selección de pestañas -->
    <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
      <router-link to="/level/a1" class="text-slate-500 hover:text-primary font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <i class="fa-solid fa-arrow-left"></i> Niveles
      </router-link>

      <div class="flex items-center gap-2">
        <button 
          @click="currentTab = 'story'" 
          :class="currentTab === 'story' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:text-indigo-600'"
          class="font-fredoka font-bold px-4 py-2 rounded-xl border border-slate-200 transition-all flex items-center gap-2 text-sm sm:text-base">
          <i class="fa-solid fa-book-open"></i> Historia
        </button>
        <button 
          @click="currentTab = 'quiz'" 
          :class="currentTab === 'quiz' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:text-indigo-600'"
          class="font-fredoka font-bold px-4 py-2 rounded-xl border border-slate-200 transition-all flex items-center gap-2 text-sm sm:text-base">
          <i class="fa-solid fa-gamepad"></i> Cuestionario (5)
        </button>
      </div>
    </div>

    <!-- VISTA 1: LA HISTORIA -->
    <section v-if="currentTab === 'story'" class="max-w-4xl mx-auto space-y-6 animate-popIn">
      <!-- Portada de la historia -->
      <div 
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br text-white p-6 sm:p-10 shadow-xl shadow-indigo-500/10"
        :class="story.gradient">
        <div class="absolute -right-8 -bottom-8 text-9xl opacity-20 pointer-events-none select-none">
          {{ story.emoji }}
        </div>
        
        <div class="max-w-xl relative z-10">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase">
              {{ story.badge }}
            </span>
            <span v-if="story.pronounFocus" class="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              <i class="fa-solid fa-bullseye text-yellow-300"></i> Pronombres: {{ story.pronounFocus.join(', ') }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-fredoka font-black mb-3">
            {{ story.title }} {{ story.emoji }}
          </h1>
          <p class="text-white/90 font-medium text-base sm:text-lg mb-6 leading-relaxed">
            {{ story.subtitle }}
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <button 
              @click="toggleReadFullStory"
              class="bg-white text-slate-800 hover:bg-slate-50 px-5 py-3 rounded-2xl font-bold font-fredoka flex items-center gap-2 shadow-lg transition-transform active:scale-95">
              <i class="fa-solid" :class="isPlayingFullStory ? 'fa-stop text-red-500' : 'fa-circle-play text-indigo-600'"></i>
              {{ isPlayingFullStory ? 'Detener Voz' : 'Escuchar Historia Completa' }}
            </button>

            <button 
              @click="showTranslations = !showTranslations"
              class="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-3 rounded-2xl font-bold font-fredoka flex items-center gap-2 transition-colors">
              <i class="fa-solid fa-language"></i>
              {{ showTranslations ? 'Ocultar Español' : 'Ver Traducción' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tarjetas de los Párrafos con Audio individual -->
      <div class="space-y-4">
        <div 
          v-for="(para, idx) in story.storyParagraphs" 
          :key="idx"
          class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 items-start">
          
          <div class="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-4xl shrink-0 emoji-shadow">
            {{ para.emoji }}
          </div>

          <div class="flex-grow space-y-2 w-full">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Parte {{ idx + 1 }}</span>
              <button 
                @click="speakText(para.en)" 
                class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 flex items-center justify-center transition-colors text-sm shadow-sm"
                title="Escuchar">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>

            <p class="text-xl sm:text-2xl font-fredoka font-semibold text-slate-800 leading-snug">
              {{ para.en }}
            </p>

            <transition name="fade">
              <p v-if="showTranslations" class="text-base text-slate-500 font-medium italic pt-1 border-t border-slate-100">
                {{ para.es }}
              </p>
            </transition>
          </div>
        </div>
      </div>

      <!-- Vocabulario y Pronombres Destacados -->
      <div class="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/60 rounded-3xl p-6 shadow-sm">
        <h3 class="font-fredoka font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
          <span>🌟</span> Palabras y pronombres para recordar:
        </h3>
        <div class="flex flex-wrap gap-2.5">
          <span 
            v-for="word in story.vocabWords" 
            :key="word.en"
            @click="speakText(word.en)"
            class="cursor-pointer bg-white border border-amber-200 hover:border-amber-400 px-3.5 py-1.5 rounded-xl text-slate-700 font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-1.5">
            <span>{{ word.emoji }}</span>
            <span class="text-amber-900">{{ word.en }}</span>
            <span class="text-slate-400 font-normal text-xs">({{ word.es }})</span>
            <i class="fa-solid fa-volume-high text-xs text-amber-500 opacity-60"></i>
          </span>
        </div>
      </div>

      <!-- Botón para ir al Cuestionario -->
      <div class="text-center pt-4 pb-10">
        <button 
          @click="startQuizTab"
          class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-fredoka font-bold text-xl px-10 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-3">
          ¡Listo! Resolver el Cuestionario (5 Preguntas) <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </section>

    <!-- VISTA 2: EL CUESTIONARIO -->
    <section v-if="currentTab === 'quiz'" class="max-w-2xl mx-auto w-full pt-2">
      <!-- Barra y puntaje -->
      <div class="flex justify-between items-end mb-2">
        <div class="font-fredoka text-indigo-600 font-bold flex items-center gap-2">
          <i class="fa-solid fa-trophy text-yellow-400"></i> Puntos: {{ quizScore }}
        </div>
        <div class="text-sm font-bold text-slate-500">Pregunta {{ qIndex + 1 }} / {{ story.quizQuestions.length }}</div>
      </div>
      
      <div class="w-full bg-slate-200 rounded-full h-3 mb-8 shadow-inner overflow-hidden relative">
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <!-- Tarjeta de pregunta activa -->
      <div v-if="!isQuizFinished && currentQuestion" class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-popIn">
        <div class="bg-indigo-50/60 py-8 flex flex-col items-center justify-center border-b border-indigo-100 relative">
          <div class="text-8xl mb-2 emoji-shadow">{{ currentQuestion.emoji }}</div>
          <button @click="speakText(currentQuestion.question)" class="absolute top-4 right-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white transition-colors">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>

        <div class="p-6 sm:p-8">
          <p class="text-center text-slate-400 text-sm font-semibold mb-2">
            Pista: "{{ currentQuestion.translation }}"
          </p>
          <h3 class="text-center text-2xl sm:text-3xl font-fredoka font-bold text-slate-800 mb-8">
            {{ currentQuestion.question }}
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              v-for="opt in currentOptions" 
              :key="opt" 
              @click="selectOption(opt)" 
              :disabled="hasAnswered"
              :class="getOptionClass(opt)"
              class="quiz-opt-btn border-2 py-4 px-3 rounded-2xl transition-all font-fredoka font-bold text-lg sm:text-xl text-center">
              {{ opt }}
            </button>
          </div>

          <div v-if="hasAnswered" class="mt-6 flex justify-end">
            <button 
              @click="nextQuestion" 
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-600/30">
              {{ qIndex === story.quizQuestions.length - 1 ? 'Terminar' : 'Siguiente' }} <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Pantalla de Resultados -->
      <div v-if="isQuizFinished" class="max-w-xl mx-auto w-full text-center space-y-6 pt-6 animate-popIn">
        <div class="relative inline-block">
          <div class="text-9xl mb-4 emoji-shadow animate-bounce">{{ story.emoji }}</div>
          <div class="absolute -top-3 -right-3 text-5xl">⭐</div>
        </div>
        
        <h2 class="text-4xl sm:text-5xl font-fredoka font-black text-slate-800 mb-2">
          ¡Increíble Manuel!
        </h2>
        <p class="text-xl text-slate-600 font-medium">
          ¡Completaste el cuestionario de "{{ story.title }}"!
        </p>
        
        <div class="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-xl shadow-indigo-500/10 my-6">
          <p class="text-slate-500 mb-2 font-bold uppercase tracking-wider text-sm">Tu Puntuación</p>
          <div class="text-5xl font-fredoka font-black text-indigo-600">{{ quizScore }} / {{ story.quizQuestions.length * 100 }}</div>
          <p class="text-slate-400 mt-2 text-sm">{{ correctCount }} de {{ story.quizQuestions.length }} preguntas correctas</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <button 
            @click="restartQuiz" 
            class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-base font-fredoka">
            <i class="fa-solid fa-rotate-right"></i> Reintentar Cuestionario
          </button>
          <button 
            @click="currentTab = 'story'" 
            class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-7 py-3.5 rounded-2xl font-bold transition-all shadow-sm active:scale-95 text-base font-fredoka">
            <i class="fa-solid fa-book-open"></i> Volver a Leer
          </button>
          <router-link 
            to="/level/a1" 
            class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-base font-fredoka">
            <i class="fa-solid fa-house"></i> Volver a Niveles
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../stores/progress'
import { stories } from '../data/stories'

const route = useRoute()
const progressStore = useProgressStore()

const storyId = computed(() => route.params.storyId || 'toby-dinosaur')
const story = computed(() => stories[storyId.value] || stories['toby-dinosaur'])

const currentTab = ref('story')
const showTranslations = ref(false)
const isPlayingFullStory = ref(false)

// Text to Speech
const speakText = (text) => {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.85
  window.speechSynthesis.speak(utterance)
}

const toggleReadFullStory = () => {
  if (!('speechSynthesis' in window)) return

  if (isPlayingFullStory.value) {
    window.speechSynthesis.cancel()
    isPlayingFullStory.value = false
    return
  }

  window.speechSynthesis.cancel()
  const fullText = story.value.storyParagraphs.map(p => p.en).join('. ')
  const utterance = new SpeechSynthesisUtterance(fullText)
  utterance.lang = 'en-US'
  utterance.rate = 0.85
  
  isPlayingFullStory.value = true
  utterance.onend = () => {
    isPlayingFullStory.value = false
  }
  utterance.onerror = () => {
    isPlayingFullStory.value = false
  }
  
  window.speechSynthesis.speak(utterance)
}

// Detener voz si cambia de ruta o pestaña
onUnmounted(() => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})

// Cuestionario
const qIndex = ref(0)
const quizScore = ref(0)
const correctCount = ref(0)
const hasAnswered = ref(false)
const selectedOption = ref(null)
const isQuizFinished = ref(false)

const currentQuestion = computed(() => story.value.quizQuestions[qIndex.value])
const currentOptions = computed(() => currentQuestion.value ? [...currentQuestion.value.options].sort(() => Math.random() - 0.5) : [])
const progressPercent = computed(() => (qIndex.value / story.value.quizQuestions.length) * 100)

const startQuizTab = () => {
  currentTab.value = 'quiz'
  restartQuiz()
}

const restartQuiz = () => {
  qIndex.value = 0
  quizScore.value = 0
  correctCount.value = 0
  hasAnswered.value = false
  selectedOption.value = null
  isQuizFinished.value = false
}

// Reiniciar si cambia la historia
watch(storyId, () => {
  currentTab.value = 'story'
  restartQuiz()
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})

const selectOption = (opt) => {
  if (hasAnswered.value) return
  hasAnswered.value = true
  selectedOption.value = opt

  if (opt === currentQuestion.value.correct) {
    quizScore.value += 100
    correctCount.value++
    progressStore.addScore(100)
    progressStore.updateStreak(progressStore.streak + 1)
    if (window.confetti) {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.8 }, colors: ['#6366f1', '#10b981', '#f59e0b'] })
    }
  } else {
    progressStore.resetStreak()
  }
}

const getOptionClass = (opt) => {
  if (!hasAnswered.value) {
    return 'bg-white border-slate-200 text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50'
  }
  if (opt === currentQuestion.value.correct) {
    return 'bg-success/20 border-success text-success'
  }
  if (opt === selectedOption.value) {
    return 'bg-danger/10 border-danger text-danger'
  }
  return 'bg-white border-slate-200 text-slate-400 opacity-50'
}

const nextQuestion = () => {
  if (qIndex.value < story.value.quizQuestions.length - 1) {
    qIndex.value++
    hasAnswered.value = false
    selectedOption.value = null
  } else {
    isQuizFinished.value = true
    if (window.confetti) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) { return clearInterval(interval) }
        const particleCount = 50 * (timeLeft / duration)
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
      }, 250)
    }
  }
}
</script>

<style scoped>
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-popIn {
  animation: popIn 0.3s ease-out;
}
</style>
