<template>
  <ul class="todo-list">
    <li v-for="(todo, index) in filteredTodos" :class="{ completed: todo.completed, editing: currentlyEditing === index }">
      <div class="view">
        <input class="toggle" type="checkbox" :checked="todo.completed" @change="updateTodoCompletion(index, $event)">
        <label @dblclick.prevent="editTodo(index, $event)">{{ todo.text }}</label>
        <button class="destroy" @click="removeTodo(index, $event)"></button>
      </div>
      <input class="edit" v-model="editedText" @keyup.enter="updateTodoText(index, $event)" @keyup.esc="cancelEdit" @blur="updateTodoText(index, $event)">
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'todo-list',
    props: ['filter'],
    data() {
      return {
        currentlyEditing: null,
        editedText: ''
      }
    },
    computed: {
      // Filtered list of todos based on completion status
      filteredTodos() {
        if (this.filter === 'active') {
          return this.$store.state.todos.filter(todo => todo.completed === false)
        } else if (this.filter === 'completed') {
          return this.$store.state.todos.filter(todo => todo.completed === true)
        } else {
          return this.$store.state.todos
        }
      }
    },
    methods: {
      // Edit existing todo
      editTodo(index, e) {
        this.currentlyEditing = index
        this.editedText = this.filteredTodos[index].text
      },

      // Remove existing todo
      removeTodo(index, e) {
        this.$store.commit('removeTodo', index)
      },

      // Update existing todo's text
      // Deletes todo if text is empty
      updateTodoText(index, e) {
        // Don't update if we're not currently editing something
        // This prevents a race condition when edit is cancelled
        if (this.currentlyEditing === null) {
          return
        }

        const trimmed = this.editedText.trim()

        if (trimmed === '') {
          this.$store.commit('removeTodo', index)
        } else {
          this.$store.commit('updateTodo', { index, text: trimmed })
        }

        this.currentlyEditing = null
        this.editedText = ''
      },

      // Update existing todo's completion status
      updateTodoCompletion(index, e) {
        this.$store.commit('updateTodo', { index, completed: e.target.checked })
      },

      // Cancel edit
      cancelEdit(e) {
        this.currentlyEditing = null
        this.editedText = ''
      }
    }
  }
</script>

<style></style>
