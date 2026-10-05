<template>
  <div class="fixed bottom-4 left-4 z-50 flex items-end gap-3 pointer-events-none">
    <!-- Burbuja de diálogo -->
    <Transition name="bounce">
      <div v-if="showMessage" class="bg-white border-2 border-green-500 rounded-2xl rounded-bl-none px-4 py-3 shadow-xl max-w-[200px] pointer-events-auto origin-bottom-left">
        <p class="font-fredoka text-sm font-bold text-slate-700 leading-tight">
          {{ currentMessage }}
        </p>
      </div>
    </Transition>

    <!-- Cayman la Tortuga -->
    <div class="relative cursor-pointer pointer-events-auto group" @click="pokeCayman">
      <div class="text-6xl drop-shadow-xl transition-transform duration-300 transform group-hover:scale-110 group-active:scale-95" :class="{ 'animate-bounce-subtle': isHappy }">
        🐢
      </div>
      <!-- Sombrerito si hay racha -->
      <div v-if="progressStore.streak >= 3" class="absolute -top-3 -right-1 text-2xl animate-bounce">
        👑
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProgressStore } from '../stores/progress'

const progressStore = useProgressStore()

const showMessage = ref(false)
const currentMessage = ref('')
const isHappy = ref(false)
let hideTimeout = null

const sayMessage = (msg, duration = 4000) => {
  currentMessage.value = msg
  showMessage.value = true
  isHappy.value = true
  
  if (hideTimeout) clearTimeout(hideTimeout)
  
  hideTimeout = setTimeout(() => {
    showMessage.value = false
    isHappy.value = false
  }, duration)
}

const pokeCayman = () => {
  const pokes = [
    "¡Hola Manuel! Soy Cayman 🐢",
    "¡Vamos a aprender inglés juntos!",
    "¡Sigue así, lo estás haciendo genial!",
    "¿Listo para jugar un rato?",
    "Me encanta acompañarte."
  ]
  sayMessage(pokes[Math.floor(Math.random() * pokes.length)])
}

// Reaccionar a cambios en el puntaje
watch(() => progressStore.score, (newScore, oldScore) => {
  if (newScore > oldScore) {
    if (progressStore.streak >= 5) {
      sayMessage("¡Increíble Manuel! ¡Tienes racha de 5! 🔥🐢")
    } else if (progressStore.streak >= 3) {
      sayMessage("¡Wow! ¡Estás imparable! 👑")
    } else {
      const congrats = [
        "¡Muy bien hecho!",
        "¡Excelente, ganaste puntos!",
        "¡Así se hace, Manuel!",
        "¡Qué inteligente eres!"
      ]
      sayMessage(congrats[Math.floor(Math.random() * congrats.length)])
    }
  }
})

// Reaccionar cuando se pierde la racha (respuesta incorrecta)
watch(() => progressStore.streak, (newStreak, oldStreak) => {
  if (newStreak === 0 && oldStreak > 0) {
    sayMessage("¡Casi! Inténtalo de nuevo, tú puedes. 💪")
  }
})

// Saludo inicial
onMounted(() => {
  setTimeout(() => {
    sayMessage("¡Hola Manuel! Soy tu amigo Cayman. ¡A jugar! 🐢")
  }, 3000)
})
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite;
}
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
</style>
