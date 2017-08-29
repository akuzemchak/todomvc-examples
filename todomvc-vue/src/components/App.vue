<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus v-model="newTodo" @keyup.enter="addTodo">
      </header>
      <section class="main" v-if="todos.length > 0">
        <input id="toggle-all" class="toggle-all" type="checkbox" :checked="allCompleted" @change="toggleAll">
        <label for="toggle-all">Mark all as complete</label>
        <router-view></router-view>
      </section>
      <footer class="footer" v-if="todos.length > 0">
        <span class="todo-count"><strong>{{ remainingTodos.length }}</strong> item{{ remainingTodos.length === 1 ? '' : 's' }} left</span>
        <ul class="filters">
          <li>
            <router-link to="/" exact>All</router-link>
          </li>
          <li>
            <router-link to="/active">Active</router-link>
          </li>
          <li>
            <router-link to="/completed">Completed</router-link>
          </li>
        </ul>
        <button class="clear-completed" v-if="completedTodos.length > 0" @click="clearCompleted">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="https://kuzemchak.net/">Aaron Kuzemchak</a></p>
      <p>Part of <a href="http://todomvc.com/">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        newTodo: ''
      }
    },
    computed: {
      // All todos
      todos() {
        return this.$store.state.todos
      },

      // Todos that are not completed
      remainingTodos() {
        return this.$store.getters.remainingTodos
      },

      // Todos that are completed
      completedTodos() {
        return this.$store.getters.completedTodos
      },

      // Whether all todos are completed
      allCompleted() {
        return this.$store.state.todos.length > 0 && this.$store.getters.remainingTodos.length === 0
      }
    },
    methods: {
      // Add new todo
      addTodo(e) {
        this.$store.commit('addTodo', this.newTodo)
        this.newTodo = ''
      },

      // Toggle all todos to the same completion status
      toggleAll(e) {
        this.$store.dispatch('toggleTodos')
      },

      // Clear completed todos
      clearCompleted(e) {
        this.$store.commit('clearCompleted')
      }
    }
  }
</script>

<style></style>
