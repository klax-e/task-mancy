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
          <p>
            {{task.description}}
          </p>
          <h4>{{formatDate(task.dueDate)}}</h4>
        </div>
      </div>
      `,
  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
  },
  
});
