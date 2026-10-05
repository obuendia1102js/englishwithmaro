import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    score: parseInt(localStorage.getItem('maro_score') || '0'),
    streak: parseInt(localStorage.getItem('maro_streak') || '0'),
    completedTopics: JSON.parse(localStorage.getItem('maro_completed_topics') || '[]'),
    errorCount: 0 // Volatile state to trigger error sounds
  }),
  actions: {
    addScore(points) {
      this.score += points
      this.saveState()
    },
    updateStreak(newStreak) {
      this.streak = newStreak
      this.saveState()
    },
    resetStreak() {
      this.streak = 0
      this.errorCount++
      this.saveState()
    },
    completeTopic(topicId) {
      if (!this.completedTopics.includes(topicId)) {
        this.completedTopics.push(topicId)
        this.saveState()
      }
    },
    saveState() {
      localStorage.setItem('maro_score', this.score.toString())
      localStorage.setItem('maro_streak', this.streak.toString())
      localStorage.setItem('maro_completed_topics', JSON.stringify(this.completedTopics))
    }
  }
})
