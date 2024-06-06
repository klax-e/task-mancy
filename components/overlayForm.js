app.component("overlay-form", {
  props: {
    formOpen: {
      type: Boolean,
    },
  },
  template:
    /* html */
    `<div class="overlay-form">
    <form @submit.prevent="submitForm" class="task-add-form" action="post">
      <div class="form-head">
        <h1>Add new Task</h1>
        <button class="add-task-btn close-btn" @click="closeForm">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="form-input">
        <input type="text" placeholder="Title of the task" name="title" @input="onChange" />
      </div>
      <div class="form-input">
        <textarea
        id="task-description"
        class="form-input-text-area"
        placeholder="Add description"
        name="desc"
          @input="onChange"
        ></textarea>
      </div>
      <button class="add-task-submit-btn">Add Task</button>
    </form>
  </div>`,

  data() {
    return {
      formData: {
        title: "",
        description: "",
        date: new Date(),
      },
    };
  },
  methods: {
    onChange(e) {
      const val = e.target.name;
      if (val === "title") {
        this.formData.title = e.target.value;
      } else {
        this.formData.description = e.target.value;
      }
    },
    closeForm() {
      this.$emit("close-the-form");
    },
    submitForm() {
      fetch("https://6660aac85425580055b4d06d.mockapi.io/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: this.formData.title,
          description: this.formData.description,
          status: "completed",
          dueDate: this.formData.date,
          priority: "medium",
          createdAt: "",
          updatedAt: "",
          assignedTo: "Klaxe",
          tags: ["test", "test"],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(res=>res.json()).then(()=>{
        this.$emit('update-data')
        this.$emit("close-the-form");
      });
      
    },
  },
});
