app.component("overlay-form", {
  props: {
    formOpen: {
      type: Boolean,
    },
    tasks: {
      type: Array,
    },
  },
  template:
    /* html */
    `<div class="overlay-form">
    <form @submit.prevent="submitForm" class="task-add-form" method="post">
      <div class="form-head">
        <h1>Add new Task</h1>
        <button type="button" class="add-task-btn close-btn" @click.prevent="closeForm">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="form-input">
        <input type="text" placeholder="Title of the task" :value="formData.title" name="title" @input="onChange" required/>
      </div>
      <div class="form-input">
        <textarea
        id="task-description"
        class="form-input-text-area"
        placeholder="Add description"
        name="desc"
          @input="onChange"
          required
          :value="formData.description"
        ></textarea>
      </div>
      <div class="form-input">
        <select name="priority" id="priority-input" class="form-priority-input" :value="formData.priority" @input="onChange">
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="highest">Highest</option>
        </select>
        <select name="status" id="status-input" class="form-status-input" :value="formData.status" @input="onChange">
          <option value="not-started">Not Started</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div class="form-input">
      <input list="assignTo" name="assignTo" id="assign-to" placeholder="Assign to" :value="formData.assignTo" @input="onChange">
            <datalist id="assignTo">
              <option v-for="task in tasks" :value="task.assignedTo" ></option>
            </datalist>
      </div>
      <button type='submit'  class="add-task-submit-btn">Add Task</button>
    </form>
  </div>`,

  data() {
    return {
      completeDate: new Date(),
      formData: {
        title: "",
        description: "",
        priority: "medium",
        status: "not-started",
        assignTo: "",
      },
    };
  },
  methods: {
    onChange(e) {
      const name = e.target.name;
      const val = e.target.value;
      switch (name) {
        case "title":
          this.formData.title = val;
          break;
        case "desc":
          this.formData.description = val;
          break;
        case "priority":
          this.formData.priority = val;
          break;
        case "status":
          this.formData.status = val;
          break;
        case "assignTo":
          this.formData.assignTo = val;
          break;
      }
    },
    closeForm() {
      this.formData = {
        title: "",
        description: "",
        priority: "medium",
        status: "not-started",
        assignTo: "",
      };
      this.$emit("close-the-form");
    },
    submitForm() {
      // console.log(this.formData);
      fetch("https://6660aac85425580055b4d06d.mockapi.io/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: this.formData.title,
          description: this.formData.description,
          status: this.formData.status,
          dueDate: this.completeDate,
          priority: this.formData.priority,
          createdAt: this.completeDate,
          updatedAt: this.completeDate,
          assignedTo: this.formData.assignTo,
          tags: ["test", "test"],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(() => {
          this.$emit("update-data");
          this.$emit("close-the-form");
        });
      this.formData = {
        title: "",
        description: "",
        priority: "medium",
        status: "not-started",
        assignTo: "",
      };
    },
  },
});
