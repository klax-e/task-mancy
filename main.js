const app = Vue.createApp({
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
  
  },
  mounted() {
    fetch("https://6660aac85425580055b4d06d.mockapi.io/api/tasks")
      .then((res) => res.json())
      .then((res) => (this.tasks = res.reverse()))
      .catch((err) => console.log(err.message));
  },
});
  