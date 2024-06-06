app.component("task-container", {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  /* html */
  template: `<div class="task-container">
        <div v-for="(task,index) in tasks" v-bind:key="index" class="task-card">
          <span :style="{backgroundColor : priorityColor(task.priority),}" class="task-priority">{{task.priority}}</span>
          <h3>{{task.title}}</h3>
          <p>
            {{task.description}}
          </p>
          <h4>{{formatDate(task.dueDate)}}</h4>
          <button class='done-btn'>Done</button>
          <button class='delete-btn' @click="deleteTask(task.id)"><i class="fa-regular fa-trash-can"></i></button>
          </div>
      </div>
      `,
  methods: {
    priorityColor(text){
      if(text === "high"){
        return "#da1e37"
      }
      return "#8ecae6"

    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
    deleteTask(id) {
      fetch("https://6660aac85425580055b4d06d.mockapi.io/api/tasks/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("update-data");
        })
        .catch((err) => console.log(err.message));
    },
  },
});
