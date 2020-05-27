<template>
  <div>
    <h3 class="title nes-text is-primary">TODO LIST</h3>
    <form class="addNewTodo">
      <div class="newTodo">
        <label for="new-todo">
          输入事项：
        </label>
        <input class="nes-input" id="new-todo" v-model="text">
      </div>
      <button class="nes-btn is-primary" @click="actionAdd">
        添加第 {{ todoLength() }} 个 todo
      </button>
    </form>
    <TodoList v-bind:todos="todos"
              @onDelete="propsDelete"
              @onUpdate="propsUpdate"
    ></TodoList>
    <TodoCounter v-bind:todos="todos"></TodoCounter>
  </div>
</template>

<script>
  import TodoApi from '../api/todo'
  import TodoList from './TodoList'
  import TodoCounter from './TodoCounter'

  import baseUrl from '../api/baseURL'

  export default {
    name: "todo",
    components: {
      TodoList,
      TodoCounter,
    },
    data: function() {
      return {
        text: '',
        todos: [],
        api: new TodoApi(baseUrl),
      }
    },
    methods: {
      todoLength: function() {
        return this.todos.length + 1
      },
      actionAdd: function(e) {
        e.preventDefault()
        if (this.text.length === 0) {
          return
        }
        let task = this.text
        let data = {
          task,
        }
        this.api.add(data).then(r => {
          this.text = ''
          this.todos.push(r)
        })
      },
      propsDelete: function(todoId) {
        let index = this.todos.findIndex(e => e.id === todoId)
        this.todos.splice(index, 1)
      },
      propsUpdate: function(todo) {
        let t = this.todos.find(e => e.id === todo.id)
        t.task = todo.task
        t.done = todo.done
      },
    },
    created: function() {
      this.api.all().then(r => this.todos = r)
    },
  }
</script>

<style scoped>
  .title {
    width: 100%;
    text-align: center;
  }
  .addNewTodo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .newTodo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .newTodo label {
    white-space: nowrap;
  }
  .addNewTodo button {
    font-size: 0.5rem;
    margin: 15px;
    margin-right: 0;
    padding: 0 10px;
  }
  ul,
  li {
    list-style: none;
  }
</style>