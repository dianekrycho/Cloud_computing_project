<template>
    <div>
      <h1>LOGIN</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="username" />
        <br />
        <br />
        <input v-model="password" placeholder="password" type="password" />
        <br />
        <br />
        <button type="submit">Connect</button>
        <br />
        <br />
      </form>
      <router-link to="/register"><button>No account ? Sign up</button></router-link>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      token: (state) => state.token,
      //role: (state) => state.role,
    }),
  },
  methods: {
    ...mapActions(['setToken', 'setRole']),
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          username: this.username,
          password: this.password,
        });
        this.setToken(response.data.jwt);
        this.setRole(response.data.role)
      } catch (error) {
        console.error(error);
      }
      this.$router.push("/");
    },
    /*
    async getRole(){
      try {
        const response = await axios.post('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.setRole(response.data.role)
      } catch (error) {
        console.error(error);
      }
    }
     */
    
  },

};

</script>