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
      
      <h2 class="font-fredoka text-2xl font-bold text-slate-800">Comida y Colores</h2>
    </div>

    <!-- Menú Principal del Tema -->
    <section v-if="currentTab === 'menu'" class="flex-grow flex flex-col justify-center pb-10">
      <div class="text-center space-y-3 mb-6">
        <p class="text-slate-600 text-lg max-w-xl mx-auto">
          ¡Qué rico! Vamos a aprender los colores y tus comidas favoritas. ¿Qué hacemos primero?
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        <button @click="currentTab = 'study'" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-rose-500 p-6 text-left transition-all hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-images"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">1. Conocer Comidas y Colores</h3>
          <p class="text-slate-500 font-medium">Mira tarjetas de frutas, verduras, platos deliciosos y los colores más importantes.</p>
        </button>

        <button @click="startQuiz" class="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-primary p-6 text-left transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-gamepad"></i>
          </div>
          <h3 class="font-fredoka text-2xl font-bold text-slate-800 mb-2">2. Jugar el Quiz Visual</h3>
          <p class="text-slate-500 font-medium">¡Pon a prueba tu memoria! Identifica el color o la comida correcta.</p>
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
        <div v-for="p in foodColorsData" :key="p.id" class="perspective w-full h-72 cursor-pointer group flashcard" :class="{'flipped': flippedCards[p.id]}" @click="flipCard(p.id)">
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

const foodColorsData = [
  // Colores
  { id: "Red", eng: "Red", spa: "Rojo", emoji: "🔴", color: "from-red-500 to-red-700", desc: "El color del amor y las manzanas." },
  { id: "Blue", eng: "Blue", spa: "Azul", emoji: "🔵", color: "from-blue-500 to-blue-700", desc: "El color del cielo y el mar." },
  { id: "Yellow", eng: "Yellow", spa: "Amarillo", emoji: "🟡", color: "from-yellow-400 to-yellow-600", desc: "El color del sol." },
  { id: "Green", eng: "Green", spa: "Verde", emoji: "🟢", color: "from-green-500 to-green-700", desc: "El color del pasto y los árboles." },
  { id: "OrangeColor", eng: "Orange", spa: "Naranja", emoji: "🟠", color: "from-orange-400 to-orange-600", desc: "El color de las zanahorias." },
  { id: "Purple", eng: "Purple", spa: "Morado", emoji: "🟣", color: "from-purple-500 to-purple-700", desc: "El color de las uvas." },
  { id: "Pink", eng: "Pink", spa: "Rosa", emoji: "🌸", color: "from-pink-400 to-pink-600", desc: "El color de los cerditos." },
  { id: "Black", eng: "Black", spa: "Negro", emoji: "⚫", color: "from-slate-800 to-black", desc: "El color de la noche oscura." },
  { id: "White", eng: "White", spa: "Blanco", emoji: "⚪", color: "from-slate-200 to-slate-400", desc: "El color de las nubes y la nieve." },
  { id: "Brown", eng: "Brown", spa: "Café / Marrón", emoji: "🟤", color: "from-amber-800 to-amber-950", desc: "El color del chocolate." },
  
  // Frutas y Verduras
  { id: "Apple", eng: "Apple", spa: "Manzana", emoji: "🍎", color: "from-red-500 to-red-700", desc: "Una fruta dulce y roja." },
  { id: "Banana", eng: "Banana", spa: "Plátano", emoji: "🍌", color: "from-yellow-400 to-yellow-600", desc: "La fruta favorita de los monos." },
  { id: "OrangeFruit", eng: "Orange", spa: "Naranja (Fruta)", emoji: "🍊", color: "from-orange-400 to-orange-600", desc: "Llena de vitamina C." },
  { id: "Grapes", eng: "Grapes", spa: "Uvas", emoji: "🍇", color: "from-purple-500 to-purple-700", desc: "Pequeñas, dulces y moradas." },
  { id: "Strawberry", eng: "Strawberry", spa: "Fresa", emoji: "🍓", color: "from-red-400 to-red-600", desc: "Roja y con semillitas por fuera." },
  { id: "Watermelon", eng: "Watermelon", spa: "Sandía", emoji: "🍉", color: "from-green-500 to-red-500", desc: "Verde por fuera, roja por dentro." },
  { id: "Carrot", eng: "Carrot", spa: "Zanahoria", emoji: "🥕", color: "from-orange-500 to-orange-700", desc: "Lo que más comen los conejos." },
  { id: "Tomato", eng: "Tomato", spa: "Tomate", emoji: "🍅", color: "from-red-500 to-red-700", desc: "Rojo y jugoso, perfecto en ensaladas." },
  { id: "Broccoli", eng: "Broccoli", spa: "Brócoli", emoji: "🥦", color: "from-green-600 to-green-800", desc: "Parece un arbolito verde." },
  { id: "Potato", eng: "Potato", spa: "Papa", emoji: "🥔", color: "from-amber-600 to-amber-800", desc: "¡Se pueden hacer papas fritas!" },
  
  // Platos y Bebidas
  { id: "Pizza", eng: "Pizza", spa: "Pizza", emoji: "🍕", color: "from-amber-500 to-red-500", desc: "Redonda, con queso y deliciosa." },
  { id: "Hamburger", eng: "Hamburger", spa: "Hamburguesa", emoji: "🍔", color: "from-amber-600 to-amber-800", desc: "Carne, pan y lechuga." },
  { id: "HotDog", eng: "Hot Dog", spa: "Perro Caliente", emoji: "🌭", color: "from-red-500 to-orange-500", desc: "Salchicha en un pan." },
  { id: "Taco", eng: "Taco", spa: "Taco", emoji: "🌮", color: "from-yellow-500 to-orange-500", desc: "¡Comida muy rica y crujiente!" },
  { id: "Rice", eng: "Rice", spa: "Arroz", emoji: "🍚", color: "from-slate-200 to-slate-400", desc: "Granos blancos muy ricos." },
  { id: "Bread", eng: "Bread", spa: "Pan", emoji: "🍞", color: "from-amber-200 to-amber-400", desc: "Para hacer sándwiches." },
  { id: "Egg", eng: "Egg", spa: "Huevo", emoji: "🥚", color: "from-yellow-100 to-yellow-300", desc: "Rico para desayunar." },
  { id: "Cheese", eng: "Cheese", spa: "Queso", emoji: "🧀", color: "from-yellow-300 to-yellow-500", desc: "El favorito de los ratones." },
  { id: "Milk", eng: "Milk", spa: "Leche", emoji: "🥛", color: "from-slate-100 to-slate-300", desc: "Viene de la vaca y es muy sana." },
  { id: "Water", eng: "Water", spa: "Water", emoji: "💧", color: "from-cyan-300 to-blue-500", desc: "Agua fresca para hidratarse." },
  { id: "Juice", eng: "Juice", spa: "Jugo", emoji: "🧃", color: "from-orange-400 to-orange-600", desc: "Jugo de frutas para beber." },
  { id: "IceCream", eng: "Ice Cream", spa: "Helado", emoji: "🍦", color: "from-pink-300 to-pink-500", desc: "Un postre muy frío y dulce." },
  { id: "Cake", eng: "Cake", spa: "Pastel", emoji: "🎂", color: "from-pink-400 to-red-400", desc: "¡Para los cumpleaños!" },
  { id: "Chocolate", eng: "Chocolate", spa: "Chocolate", emoji: "🍫", color: "from-amber-800 to-stone-800", desc: "Muy dulce y color marrón." }
]

const quizDatabase = [
  // Quiz Colors
  { emoji: "🔴", sentence: "The apple is ___.", translation: "La manzana es roja.", options: ["Blue", "Red", "Green", "Yellow"], correct: "Red" },
  { emoji: "🔵", sentence: "The sky is ___.", translation: "El cielo es azul.", options: ["Red", "Pink", "Blue", "Black"], correct: "Blue" },
  { emoji: "🟡", sentence: "The sun is ___.", translation: "El sol es amarillo.", options: ["White", "Orange", "Green", "Yellow"], correct: "Yellow" },
  { emoji: "🟢", sentence: "The grass is ___.", translation: "El pasto es verde.", options: ["Brown", "Green", "Purple", "Blue"], correct: "Green" },
  { emoji: "⚫", sentence: "The night is ___.", translation: "La noche es negra.", options: ["White", "Black", "Pink", "Yellow"], correct: "Black" },
  
  // Quiz Food
  { emoji: "🍎", sentence: "I eat an ___.", translation: "Yo como una manzana.", options: ["Apple", "Orange", "Pizza", "Water"], correct: "Apple" },
  { emoji: "🍌", sentence: "Monkeys love ___.", translation: "A los monos les encantan los plátanos.", options: ["Apple", "Carrot", "Banana", "Cheese"], correct: "Banana" },
  { emoji: "🥕", sentence: "Rabbits eat ___.", translation: "Los conejos comen zanahorias.", options: ["Bread", "Carrot", "Milk", "Cake"], correct: "Carrot" },
  { emoji: "🍕", sentence: "I want a slice of ___.", translation: "Quiero una rebanada de pizza.", options: ["Pizza", "Water", "Egg", "Rice"], correct: "Pizza" },
  { emoji: "🍔", sentence: "This is a big ___.", translation: "Esta es una hamburguesa grande.", options: ["Taco", "Ice Cream", "Hamburger", "Milk"], correct: "Hamburger" },
  { emoji: "🥛", sentence: "The cow gives ___.", translation: "La vaca da leche.", options: ["Juice", "Water", "Milk", "Cheese"], correct: "Milk" },
  { emoji: "🍦", sentence: "I like chocolate ___.", translation: "Me gusta el helado de chocolate.", options: ["Ice Cream", "Bread", "Potato", "Tomato"], correct: "Ice Cream" },
  { emoji: "🧀", sentence: "Mice eat ___.", translation: "Los ratones comen queso.", options: ["Grapes", "Strawberry", "Cheese", "Watermelon"], correct: "Cheese" },
  { emoji: "🎂", sentence: "Happy birthday! Here is your ___.", translation: "¡Feliz cumpleaños! Aquí está tu pastel.", options: ["Cake", "Hot Dog", "Rice", "Broccoli"], correct: "Cake" },
  { emoji: "💧", sentence: "I drink ___.", translation: "Yo bebo agua.", options: ["Water", "Egg", "Pizza", "Taco"], correct: "Water" }
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
