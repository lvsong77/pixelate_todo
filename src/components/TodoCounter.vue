<template>
  <div class="todo-counter">
    <p>统计：</p>
    <div class="todo-table nes-table-responsive">
      <table class="nes-table is-bordered is-centered">
        <thead>
          <tr class="todo-row">
            <th class="cell">总计</th>
            <th class="cell">完成</th>
            <th class="cell">未完成</th>
          </tr>
        </thead>
        <tbody>
          <tr class="todo-row">
            <td class="cell">{{ total }}</td>
            <td class="cell">{{ doneTotal }}</td>
            <td class="cell">{{ ongoingTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>进度条：</p>
    <progress class="nes-progress is-pattern" :value="doneTotal" :max="total"></progress>
  </div>
</template>

<script>
  export default {
    name: "TodoCounter",
    props: ['todos'],
    computed: {
      total: function() {
        return this.todos.length
      },
      doneTotal: function() {
        return this.todos.filter(e => e.done).length
      },
      ongoingTotal: function() {
        return this.todos.filter(e => !e.done).length
      }
    }
  }
</script>

<style scoped>
  .todo-counter {
    width: 90vw;
  }
  .todo-table {
    display: table;
    width: 100%;
  }

  .todo-table table {
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }

  .todo-row {
    display: table-row;
  }

  .todo-row:not(:first-child) {
    margin-top: -1px;
  }

  .cell {
    display: table-cell;
    text-align: center;
  }

  progress {
    width: 100%;
    margin: 0;
  }
</style>