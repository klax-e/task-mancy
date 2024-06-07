app.component("task-container", {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  /* html */
  template: `
  <div class="task-container">
    <div v-for="(task,index) in tasks" v-bind:key="index" class="task-card">
    <h3>{{task.title}}</h3>
    <p>
    {{task.description}}
    </p>
    <h4>{{formatDate(task.dueDate)}}</h4>
    <span :style="{backgroundColor : priorityColor(task.priority),}" class="task-priority">{{task.priority}}</span>
      <button class='done-btn'>Done</button>
      <button class='delete-btn' @click="confirmModal = true;selectedItemDelete=task.id"><i class="fa-regular fa-trash-can"></i></button>
      <div class="overlay-confirmation" v-if="confirmModal">
          <div  class="confirm-box">
            <h1>Are you sure you want to remove the task ?</h1>
            <div class="confirm-btns-container">
              <button class="btn" @click="confirmModal = false">Cancel</button>
              <button class="btn remove-btn" @click="deleteTask(selectedItemDelete);">Remove</button>
          </div>
      </div>
    </div>
    </div>
  </div>
      `,
  data() {
    return {
      confirmModal: false,
      selectedItemDelete: null,
    };
  },
  methods: {
    priorityColor(text) {
      return text === "high" ? "#da1e37" : "#0077b6";
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
    deleteTask(id) {
      // console.log(id);
      fetch("https://6660aac85425580055b4d06d.mockapi.io/api/tasks/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("update-data");
          this.confirmModal = false;
        })
        .catch((err) => console.log(err.message));
    },
  },
});
