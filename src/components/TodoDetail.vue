<template>
  <div>
    <pre v-for="(v, k) in todo" v-bind:key="k">
      ({{ k }}): ({{ v }})
    </pre>
  </div>
</template>

<script>
  import TodoApi from '../api/todo'

  import baseUrl from '../api/baseURL'

  export default {
    name: "TodoDetail",
    data: function() {
      return {
        api: new TodoApi(baseUrl),
        todo: null,
      }
    },
    created() {
      let todoId = this.$route.params.id
      this.api.detail(todoId).then(r => {
        this.todo = r
      })
    }
  }
</script>

<style scoped>

</style>