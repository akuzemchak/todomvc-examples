import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [
      { text: 'One', completed: false },
      { text: 'Two', completed: true }
    ]
  },
  getters: {
    // Get todos that are not completed
    remainingTodos(state, getters) {
      return state.todos.filter(todo => todo.completed === false)
    },

    // Get todos that are completed
    completedTodos(state, getters) {
      return state.todos.filter(todo => todo.completed === true)
    }
  },
  mutations: {
    // Add new todo
    addTodo(state, text) {
      const trimmed = text.trim()

      if (trimmed === '') {
        return
      }

      state.todos.push({ text: trimmed, completed: false })
    },

    // Remove existing todo
    removeTodo(state, index) {
      state.todos.splice(index, 1)
    },

    // Update existing todo
    updateTodo(state, payload) {
      const todo = state.todos[payload.index]

      if ('text' in payload) {
        todo.text = payload.text
      }

      if ('completed' in payload) {
        todo.completed = payload.completed
      }
    },

    // Toggle all todos to be same completion status
    toggleTodos(state, completed) {
      state.todos.forEach(todo => {
        todo.completed = completed
      })
    },

    // Clear completed todos
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => todo.completed === false)
    }
  },
  actions: {
    // Determine the completion state to change todos to
    toggleTodos(context) {
      const remaining = context.getters.remainingTodos
      context.commit('toggleTodos', remaining.length > 0)
    }
  }
})

export default store
