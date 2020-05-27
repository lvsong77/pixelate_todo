<template>
	<div class="todo-cell">
		<div v-if="editing">
			<input class="nes-input" type="text" v-model="text">
			<button class="nes-btn is-success" @click="actionSubmit">提交</button>
			<button class="nes-btn is-error" @click="actionCancel">取消</button>
		</div>
		<div v-else>
			<ul class="nes-list" :class="markClass">
				<li>
					<router-link v-bind:to="`/todo/${this.todo.id}`">{{ this.todo.task }}</router-link>
				</li>
			</ul>
			<div class="func">
				<button class="nes-btn" @click="actionEdit">编辑</button>
				<button class="nes-btn is-error" @click="actionDelete">删除</button>
				<button class="nes-btn" :class="doneClass" @click="actionToggle">{{ this.todo.done ? '取消完成' : '标记完成' }}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import TodoApi from '../api/todo'

  import baseUrl from '../api/baseURL'

	export default {
		name: "TodoItem",
		props: ['todo'],
		data: function() {
			return {
				api: new TodoApi(baseUrl),
				editing: false,
				id: this.todo.id,
				text: this.todo.task,
				hasDone: false,
			}
		},
		computed: {
			markClass() {
				return this.todo.done ? 'is-disc' : 'is-circle'
			},
			doneClass() {
				return this.todo.done ? 'is-warning' : 'is-success'
			}
		},
		methods: {
			actionSubmit: function() {
				let todoId = String(this.todo.id)
				let data = {
						task: this.text,
				}
				this.updateTodo(todoId, data)
			},
			actionCancel: function() {
				this.editing = false
			},
			actionEdit: function() {
				this.editing = !this.editing
			},
			actionDelete: function() {
				let id = this.todo.id
				let todoId = String(id)
				this.api.delete(todoId).then(() => {
					this.$emit('onListDelete', id)
				})
			},
			actionToggle: function() {
				let todoId = String(this.id)
				let data = {
					done: !this.todo.done
				}
				this.updateTodo(todoId, data)
			},
			updateTodo: function(todoId, data) {
				this.api.update(todoId, data).then(r => {
					this.editing = false
					this.$emit('onListUpdate', r)
				})
			},
		},
	}
</script>

<style scoped>
	.todo-cell {
		width: 100%;
		padding: 5px;
		margin: 10px 0;
	}

	.todo-cell a {
		font-weight: bold;
	}

	.nes-btn {
		padding: 0px 10px;
		font-size: 0.5rem;
		margin-right: 10px;
	}
</style>