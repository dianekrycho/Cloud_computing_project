<template>
    <div>
      <h1>INSCRIPTION</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="username" />
        <br />
        <br />
        <input v-model="password" placeholder="password" type="password" />
        <br />
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
<script>
import axios from 'axios';
export default {
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          password: this.password,
        });
      } catch (error) {
        console.error(error);
      }
      this.$router.push("/login");
    },
    
  },

};

</script>